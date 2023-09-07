import type { NextApiRequest, NextApiResponse } from "next";

import geoip from "geoip-lite";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  try {
    var ip =
      (req.headers["x-forwarded-for"] as string)?.split(",").shift() ||
      req.socket?.remoteAddress ||
      "";
    const isEU = (ip: any) => {
      ip = "3.253.189.1";
      const geo = geoip.lookup(ip);
      return geo && geo.eu === "1";
    };
    if (isEU(ip)) {
      res.status(200).json({ isEU: true });
    } else {
      res.status(200).json({ isEU: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
  return;
}
