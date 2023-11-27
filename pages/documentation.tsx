import React, { useEffect, useState } from "react";
import { useIframeContext } from "@/components/Context/iframe";
import useSWR from "swr";
import LoadingSpinner from "@/components/Auth/LoadingSpinner";
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
  /*
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Code to run when the component is mounted
    setMounted(true);
    // Cleanup function (optional)
    return () => {
      // Code to run when the component is unmounted
    };
  }, []); // The empty dependency array means this effect will run once on mount and clean up on unmount

  if (!mounted) {
    return <LoadingSpinner />;
  }*/

  const [loading, setLoading] = useState(true);
  const handleLoad = () => {
    setLoading(false);
  };
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-[50] ">
          <LoadingSpinner />;
        </div>
      )}
      <iframe
        src={url}
        className="h-[100vh] w-full z-[1500]"
        onLoad={handleLoad}
      />
    </div>
  );
}
