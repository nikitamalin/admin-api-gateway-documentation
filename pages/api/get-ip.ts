import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userIpAddress = req.headers["x-forwarded-for"];
  console.log(req.socket.remoteAddress);
  res.status(200).json({ ipAddress: userIpAddress });
}
