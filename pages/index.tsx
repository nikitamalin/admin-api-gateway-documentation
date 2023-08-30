import Image from "next/image";
import { Inter, Noto_Sans_Gunjala_Gondi } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import useSwr from "swr";
import { useState, useEffect } from "react";

import { Menu, MenuList, Switch, useToast, Spinner } from "@chakra-ui/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [isSignInLoading, setIsSignInLoading] = useState(false);

  const standingsURL = `/api/get-standings`;

  const { data: standings } = useSwr(standingsURL, async () => {
    const res = await fetch(standingsURL);
    return res.json();
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        Sign in to Vote!
        <div className="relative items-center mx-auto my-auto">
          <button
            onClick={() => {
              setIsSignInLoading(true);
              signIn("auth0", { callbackUrl: "/" }, { prompt: "login" }).then(
                () => {
                  setIsSignInLoading(false);
                }
              );
            }}
            className={`py-2 px-3 bg-blue rounded-lg hover:bg-blueHover cursor-pointer text-white
                ${isSignInLoading ? "opacity-0 pointer-events-none" : ""}`}
          >
            Sign In
          </button>
          {isSignInLoading && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-blue opacity-50 rounded-lg shadow-md py-2 px-3
                   cursor-not-allowed"
            >
              <Spinner size="md" color="white" />
            </div>
          )}
        </div>
      </main>
    );
  }

  console.log(standings);

  if (status === "authenticated") {
    return (
      <div>
        {standings && (
          <>
            {standings.map((standing: any, index: number) => {
              return (
                <div key={index}>
                  <Image
                    src={standing.image}
                    width="65"
                    height="65"
                    alt={standing.name}
                  ></Image>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}
