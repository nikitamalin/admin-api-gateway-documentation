import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/client";
import { z, ZodError } from "zod";

import { isValidToken } from "@/utils/auth";
import {
  isEmailValid,
  isWeekendPST,
  dstOffset,
  getCaliforniaTime
} from "@/utils/validation";

const schema = z.object({
  email: z.string().email(),
  driver: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  gender: z.string(),
  age: z.string(),
  idToken: z.string()
});

async function createVote(
  res: NextApiResponse,
  email: string,
  driver: string,
  isValid = false
) {
  try {
    let result = await prisma.voteLog.create({
      data: {
        email: email,
        driver_vote: driver,
        is_valid: isValid
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  try {
    const event = schema.parse(JSON.parse(req.body));
    const email = event.email;
    const driver = event.driver;
    const name = event.name;
    const phoneNumber = event.phoneNumber;
    const gender = event.gender;
    const age = event.age;
    /* 
    Validation check:
      - Selected a driver
      - It's the weekend
      - Validate jwt
      - is a User -> has to sign in
      - Is user's profile complete?
      - Hasn't voted today
      - email not in blacklisted email list 

      maybe
      - phone verification api
    */

    if (!driver) {
      res.status(403).json({ message: "Please select a driver" });
      return;
    }

    if (!isWeekendPST() && false) {
      res.status(403).json({
        message: "Voting is only allowed during the weekend California Time"
      });
      return;
    }

    let isTmrwVoting = false;
    let dayOfWeek = getCaliforniaTime().getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      isTmrwVoting = true;
    }
    let message =
      "Vote went in, check back in tomorrow to view results and we'll see you next weekend!";
    if (isTmrwVoting) {
      message = "Vote went in, we'll see you again tomorrow!";
    }

    if (!isValidToken(event.idToken, email)) {
      createVote(res, email, driver);
      res.status(200).json({ message: message });
      return;
    }

    let user = await prisma.userInfo.findUnique({
      where: {
        email: email
      },
      select: {
        profile_complete: true
      }
    });

    if (!user) {
      createVote(res, email, driver);
      res.status(200).json({
        message: message
      });
      return;
    }

    if (!user.profile_complete) {
      res.status(403).json({ message: "Please complete your profile" });
      return;
    }

    const time = new Date();
    time.setHours(0, 0, 0, 0);
    new Date(time.getTime() - dstOffset() * 60 * 60 * 1000);
    let votedToday = await prisma.voteLog.findMany({
      where: {
        email: email,
        created_at: {
          gte: time
        }
      }
    });

    if (votedToday.length !== 0) {
      if (isTmrwVoting) {
        res.status(403).json({
          message:
            "You have already voted today. Please check back in tomorrow."
        });
        return;
      }
      res.status(403).json({
        message: "You have already voted today."
      });
      return;
    }

    if (!isEmailValid(email)) {
      createVote(res, email, driver);
      res.status(200).json({ message: message });
      return;
    }

    createVote(res, email, driver, true);

    res.status(200).json({ message: message });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: "Invalid request" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  return;
}
