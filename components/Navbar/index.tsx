import Link from "next/link";
import Image from "next/image";
import React, { ReactNode, useState } from "react";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Spinner } from "@chakra-ui/react";
interface Props {
  children?: ReactNode;
}

export default function Navbar({ children }: Props) {
  const { data: session, status } = useSession();
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  if (status === "loading") {
    return;
  }
  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col w-full justify-center font-helvetica font-normal items-center bg-white ">
        <div className="flex flex-col w-[95vw] footerXM:w-[90vw] footerSM:w-[85vw] sm:w-[80vw] xxl:w-[1280px] ">
          <nav className="flex text-lg justify-center items-center">
            <Link href="/" className="my-5 mr-auto">
              <Image
                src="/cariq.png"
                width="100"
                height="32"
                alt="CarIQ"
              ></Image>
            </Link>
          </nav>
        </div>
        <hr className="h-[1px] opacity-50 bg-[#C2C2C2] w-full border-0 rounded"></hr>
      </div>
      {children}
    </div>
  );
}
