import Link from "next/link";
import Image from "next/image";
import React, { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import LoadingSpinner from "../Auth/LoadingSpinner";
import MobileMenu from "./MobileMenu";

import { isValidToken } from "@/utils/auth";
interface Props {
  children?: ReactNode;
}

export default function Navbar({ children }: Props) {
  const { data: session, status } = useSession();
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isSignOutLoading, setIsSignOutLoading] = useState(false);

  const [email, setEmail] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      if (session && session.user && session.user.email) {
        setEmail(session.user.email);
      }
      if (session && session.idToken) {
        setIdToken(session.idToken);
      }
    };

    fetchSession();
  }, [session]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  let isSetup = false;
  let isDocumentation = false;

  if (router.asPath === "/setup") {
    isSetup = true;
  }

  if (router.asPath === "/documentation") {
    isDocumentation = true;
  }

  if (email && idToken) {
    if (!isValidToken(email, idToken)) {
      signOut({ callbackUrl: "/" });
    }
  }

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col w-full justify-center font-helvetica font-normal items-center bg-white ">
        <div className="flex flex-col w-[95vw] footerXM:w-[90vw] footerSM:w-[85vw] sm:w-[80vw] xxl:w-[1280px] ">
          <nav className="flex text-lg justify-center items-center">
            <Link href="/" className="my-5 mr-auto ml-4 footerXM:ml-0">
              <Image
                src="/cariq.png"
                width="126"
                height="32"
                alt="CarIQ"
              ></Image>
            </Link>
            {status === "authenticated" && (
              <>
                <div className="hidden ml:flex gap-5 ">
                  <Link
                    href="/setup"
                    className={`link ${isSetup && "selected-link"}`}
                  >
                    Setup
                  </Link>
                  <Link
                    href="/documentation"
                    className={`link ${isDocumentation && "selected-link"}`}
                  >
                    Documentation
                  </Link>
                </div>

                <MobileMenu />
              </>
            )}
          </nav>
        </div>
        <hr className="h-[1px] opacity-50 bg-[#C2C2C2] w-full border-0 rounded"></hr>
      </div>
    </div>
  );
}
