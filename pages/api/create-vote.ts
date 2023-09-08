import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/client";
import { z, ZodError } from "zod";

import { isValidToken } from "@/utils/auth";
import { isWeekendPST, dstOffset, getCaliforniaTime } from "@/utils/validation";

const schema = z.object({
  driver: z.string(),
  phoneNumber: z.string(),
  idToken: z.string()
});

async function createVote(
  res: NextApiResponse,
  ip: string,
  phoneNumber: string,
  driver: string,
  isValid = true,
  error = ""
) {
  try {
    let result = await prisma.voteLog.create({
      data: {
        phone_number: phoneNumber,
        driver_vote: driver,
        ip: ip,
        is_valid: isValid,
        error: error
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
    const driver = event.driver;
    const phoneNumber = "+" + event.phoneNumber.substring(1);

    /* 
    Validation check:
      - Selected a driver
      - It's the weekend
      - Validate jwt (user's signed in)
      - is a User -> (has signed in, not a bot)
      - Is user's profile complete? 
      - Hasn't voted today
      - ip address not used today (only 1 vote/day per ip address)
      - ip adderss not a proxy


      maybe
      - phone verification api
      - email not in blacklisted email list 
      - fake emails get sent an alreadyVoted message w/ status 200
    */

    if (!driver) {
      res.status(400).json({ message: "Please select a driver" });
      return;
    }

    if (!isWeekendPST()) {
      res.status(400).json({
        message: "Voting is only allowed during the weekend California Time"
      });
      return;
    }

    var ip =
      (req.headers["x-forwarded-for"] as string)?.split(",").shift() ||
      req.socket?.remoteAddress ||
      "";

    let isTmrwVoting = false;
    let dayOfWeek = getCaliforniaTime().getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      isTmrwVoting = true;
    }
    let alreadyVoted = "You have already voted today.";

    let message =
      "Vote counted, check back in tomorrow to view results and we'll see you next weekend!";
    if (isTmrwVoting) {
      message = "Vote counted, we'll see you again tomorrow!";
      alreadyVoted =
        "You have already voted today. Please check back in tomorrow.";
    }

    if (!isValidToken(event.idToken, phoneNumber)) {
      createVote(res, ip, phoneNumber, driver, false, "token not valid");
      res.status(200).json({ message: alreadyVoted });
      return;
    }

    let user = await prisma.userInfo.findUnique({
      where: {
        phone_number: phoneNumber
      },
      select: {
        profile_complete: true
      }
    });

    if (!user) {
      createVote(res, ip, phoneNumber, driver, false, "not a logged in user");
      res.status(200).json({
        message: alreadyVoted
      });
      return;
    }

    if (!user.profile_complete) {
      res.status(400).json({ message: "Please complete your profile" });
      return;
    }

    const time = new Date();
    time.setHours(0, 0, 0, 0);
    ip = "172.56.208.193";
    new Date(time.getTime() - dstOffset() * 60 * 60 * 1000);
    let votedToday = await prisma.voteLog.findMany({
      where: {
        OR: [
          {
            phone_number: phoneNumber,
            created_at: {
              gte: time
            }
          },
          {
            created_at: {
              gte: time
            },
            ip: ip
          }
        ]
      }
    });

    if (votedToday.length !== 0) {
      let isValid = true;

      votedToday.forEach((record) => {
        if (record.phone_number === phoneNumber) {
          isValid = true;
          return;
        }
        if (record.ip === ip) {
          isValid = false;
        }
      });

      if (!isValid) {
        createVote(
          res,
          ip,
          phoneNumber,
          driver,
          false,
          "ip address voted today"
        );
      }
      res.status(200).json({
        message: alreadyVoted
      });
      return;
    }

    createVote(res, ip, phoneNumber, driver);

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
