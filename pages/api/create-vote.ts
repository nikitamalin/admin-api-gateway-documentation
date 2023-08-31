import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/client";
import { z, ZodError } from "zod";

const schema = z.object({
  email: z.string().email(),
  driver: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  gender: z.string(),
  age: z.string(),
  city: z.string()
});

function isWeekendPST() {
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const pstOffset = -8 * 60;

  const pstTime = new Date(utcTime + pstOffset * 60000);
  const dayOfWeek = pstTime.getDay();

  return dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;
}

async function createVote(
  res: NextApiResponse,
  email: string,
  driver: string,
  isValid = true
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
    const city = event.city;

    /* 
    Quick check:
      - It's the weekend
      - is a User(ensure not created by a query outside of this app)
      - Phone number is valid (possibly check unique in future)
      - Hasn't voted today
    */

    if (!isWeekendPST) {
      res.status(403).json({
        message: "Voting is only allowed during the weekend PST Time"
      });
      return;
    }
    let isUser = await prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        id: true
      }
    });

    if (!isUser) {
      // have to be signed in to vote -> falsely leading them to success
      createVote(res, email, driver, false);
      res.status(403).json({
        message: "Success"
      });
      return;
    }
    const today = new Date();
    let votedToday = await prisma.voteLog.findMany({
      where: {
        OR: [
          {
            email: email,
            created_at: {
              gte: today
            }
          },
          {
            phone_number: phoneNumber,
            created_at: {
              gte: today
            }
          }
        ]
      }
    });
    console.log("v: ", votedToday);
    if (votedToday.length !== 0) {
      res.status(403).json({
        message: "You have already voted today."
      });
      return;
    }

    await prisma.standings.update({
      where: {
        driver: driver
      },
      data: {
        fan_votes: {
          increment: 1
        }
      }
    });
    createVote(res, email, driver, false);
    console.log("UPDATED");

    // perform some real validation before real vote
    let isValid = true;
    if (email.endsWith("onlyfans.com") || email.includes("onlyfans")) {
      isValid = false;
    }

    if (emailInList(email)) {
      isValid = false;
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: "Invalid request" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  return;
}

function emailInList(email: string) {
  let emailList = ["bigballs@aol.com"];

  if (email in emailList) {
    return true;
  }
  return false;
}
