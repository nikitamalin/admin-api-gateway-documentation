import type { NextApiRequest, NextApiResponse } from "next";

import geoip from "fast-geoip";
import { IP2Proxy } from "ip2proxy-nodejs";
// import path from "path";

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
    const isEU = async (ip: any) => {
      const geo = await geoip.lookup(ip);
      return geo && geo.eu === "1";
    };
    if (await isEU(ip)) {
      res.status(200).json({ isEU: true });
    } else {
      res.status(200).json({ isEU: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
  return;
}
