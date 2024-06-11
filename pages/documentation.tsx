import React, { useEffect, useState } from "react";
import { useIframeContext } from "@/components/Context/iframe";
import useSWR from "swr";
import LoadingSpinner from "@/components/Auth/LoadingSpinner";
import { useSession } from "next-auth/react";
import mixpanel from "mixpanel-browser";
export default function Doc() {
  let url = useIframeContext().url;

  const [loading, setLoading] = useState(true);
  const handleLoad = () => {
    setLoading(false);
  };

  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      if (session && session.user && session.user.email) {
        setEmail(session.user.email);
      }
    };

    fetchSession();
  }, [session]);

  useEffect(() => {
    if (email) {
      mixpanel.init("e8d932180ae57787b3c2fd743194abdb");
      mixpanel.track("Page View", {
        pageName: "Documentation",
        email: email
      });
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      mixpanel.init("e8d932180ae57787b3c2fd743194abdb");
      mixpanel.track("Documentation Url", {
        email: email,
        url: url
      });
    }
  }, [email, url]);

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
