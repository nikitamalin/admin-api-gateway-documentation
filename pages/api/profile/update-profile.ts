import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/client";
import { z, ZodError } from "zod";
import { isValidToken } from "@/utils/auth";
const schema = z.object({
  email: z.string().email(),
  name: z.string(),
  phoneNumber: z.string(),
  gender: z.string(),
  age: z.string(),
  idToken: z.string()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const event = schema.parse(JSON.parse(req.body));
    const email = event.email;
    const name = event.name;
    const phoneNumber = "+" + event.phoneNumber.substring(1);
    const gender = event.gender;
    const age = event.age;
    /*
    Validation:
        - email is unique
    */

    if (!isValidToken(event.idToken, phoneNumber)) {
      res.status(200).json({ message: "Success" });
      return;
    }

    let isEmailInDB = await prisma.userInfo.findMany({
      where: {
        NOT: {
          phone_number: phoneNumber
        },
        email: email
      }
    });

    if (isEmailInDB.length > 0) {
      res
        .status(400)
        .json({ message: "Email already in use. Please try another." });
      return;
    }

    await prisma.userInfo.update({
      where: {
        phone_number: phoneNumber
      },
      data: {
        email: email,
        name: name,
        gender: gender,
        age: age,
        profile_complete: true
      }
    });

    res.status(200).json({ message: "Success" });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: "Invalid email." });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  return;
}
