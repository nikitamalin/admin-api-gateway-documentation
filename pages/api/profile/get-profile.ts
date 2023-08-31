import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/client";
import { z, ZodError } from "zod";

const schema = z.object({
  email: z.string().email()
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
    const email = schema.parse(req.query).email;
    const result = await prisma.user.findMany({
      where: {
        email: email
      },
      select: {
        full_name: true,
        phone_number: true,
        gender: true,
        age: true,
        city: true
      }
    });
    res.status(200).json(result[0]);
  } catch (err) {
    console.log(err);
    if (err instanceof ZodError) {
      res.status(400).json({ message: "Invalid request" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  return;
}
