import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Spinner } from "@chakra-ui/react";

export default function Unauthenticated() {
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  return (
    <div className="mx-auto mt-16 mb-8 text-center flex flex-col items-center justify-center gap-5">
      <span className="font-medium text-xl">
        Sign in to access the Car IQ API Documentation
      </span>
      <div className="relative items-center">
        <button
          onClick={() => {
            setIsSignInLoading(true);
            signIn("google", { callbackUrl: "/" }, { prompt: "login" }).then(
              () => {
                setIsSignInLoading(false);
              }
            );
          }}
          className={`py-2 px-3 bg-orange rounded-lg hover:bg-orangeHover cursor-pointer
         ${isSignInLoading ? "opacity-0 pointer-events-none" : ""}`}
        >
          Sign In
        </button>
        {isSignInLoading && (
          <button
            className="py-2 px-3 absolute inset-0 flex items-center justify-center bg-orange opacity-50 rounded-lg shadow-md
            cursor-not-allowed"
          >
            <Spinner size="md" color="white" />
          </button>
        )}
      </div>
    </div>
  );
}
