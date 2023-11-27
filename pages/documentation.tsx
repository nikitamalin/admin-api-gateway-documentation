import { useEffect } from "react";
import { useIframeContext } from "@/components/Context/iframe";
/*
export async function getStaticProps() &#123;
  const path = require("path");
  const fs = require("fs");
  const filePath = path.join(process.cwd(), "/public/index.html");
  const file = fs.readFileSync(filePath, "utf-8");
  return &#123; props: &#123; file: file &#125; &#125;;
&#125;*/

export default function Doc() {
  let url = useIframeContext().url;

  return <iframe src={url} className="h-[100svh] w-full"></iframe>;
}
