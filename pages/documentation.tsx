import React, { useEffect, useState } from "react";
import { useIframeContext } from "@/components/Context/iframe";
import useSWR from "swr";
import LoadingSpinner from "@/components/Auth/LoadingSpinner";

export default function Doc() {
  let url = useIframeContext().url;

  const [loading, setLoading] = useState(true);
  const handleLoad = () => {
    setLoading(false);
  };
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center h-[100vh] w-full bg-white z-[100]">
          <LoadingSpinner />
        </div>
      )}
      <iframe
        src={url}
        className={`h-[100vh] w-full ${loading ? "z-[-1]" : ""} `}
        onLoad={handleLoad}
      />
    </div>
  );
}
