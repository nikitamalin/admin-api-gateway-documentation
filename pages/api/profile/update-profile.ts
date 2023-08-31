import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/client";
import { z, ZodError } from "zod";
import { phone } from "phone";

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
    const phoneNumber = event.phoneNumber;
    const gender = event.gender;
    const age = event.age;
    /*
    Validation:
        - Phone validation
        - Phone is unique
    */

    const isPhoneValid = phone(phoneNumber);
    if (!isPhoneValid.isValid) {
      res.status(403).json({ message: "Phone Number format is invalid" });
      return;
    }
    const result = await prisma.userInfo.findMany({
      where: {
        phone_number: phoneNumber,
        NOT: {
          email: email
        }
      }
    });

    if (result.length > 0) {
      res.status(403).json({ message: "Phone Number is already in use" });
      return;
    }

    await prisma.userInfo.update({
      where: {
        email: email
      },
      data: {
        name: name,
        phone_number: phoneNumber,
        gender: gender,
        age: age,
        profile_complete: true
      }
    });

    res.status(200).json({ message: "Success" });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: "Invalid request" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  return;
}
