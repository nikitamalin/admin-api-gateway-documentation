import { NextApiRequest, NextApiResponse } from "next";
import { stat } from "fs/promises";
import { createReadStream, existsSync } from "fs";
import path from "path";
import { getSession } from "next-auth/react";

export default async function getFile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const someFilePath = path.resolve("./private/CarIQAPI.json");
    if (!existsSync(someFilePath)) return res.status(404);

    const file = createReadStream(path.resolve("./private/CarIQAPI.json"));

    const stats = await stat(someFilePath);
    res.setHeader("Content-Length", stats.size);
    res.setHeader("Content-type", "text/html");
    file.pipe(res);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
  return;
}
