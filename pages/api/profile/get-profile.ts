import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/client";
import { z, ZodError } from "zod";
import { isValidToken } from "@/utils/auth";
const schema = z.object({
  phoneNumber: z.string(),
  idToken: z.string()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const event = schema.parse(req.query);
    const phoneNumber = "+" + event.phoneNumber.substring(1);

    if (!isValidToken(event.idToken, phoneNumber)) {
      res.status(200).json({ message: "Success" });
      return;
    }

    const result = await prisma.userInfo.findMany({
      where: {
        phone_number: phoneNumber
      },
      select: {
        name: true,
        email: true,
        gender: true,
        age: true,
        profile_complete: true
      }
    });

    res.status(200).json(result[0]);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: "Invalid request" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  return;
}
