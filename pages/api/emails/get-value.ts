import { isValidToken } from "@/utils/auth";
import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";

const schema = z.object({
  email: z.string().email()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = schema.parse(req.query);

  const isInSet = await kv.sismember("emailWhiteList", email);
  let isAllowed = false;
  if (isInSet === 1) {
    isAllowed = true;
  }
  return res.status(200).json({ isAllowed: isAllowed });
}
