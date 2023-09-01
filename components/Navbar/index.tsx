import Link from "next/link";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Spinner } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { useProfileContext } from "../Context/ProfileContext";
import { useDriverContext } from "../Context/DriverContext";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Props {
  children?: ReactNode;
}

export default function Navbar({ children }: Props) {
  const { data: session, status } = useSession();
  let onToggle = useProfileContext().onToggle;
  let isDriversLoading = useDriverContext().isDriversLoading;

  if (status === "loading" || isDriversLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col w-full justify-center font-helvetica font-normal items-center bg-white ">
        <div className="flex flex-col w-[95vw] footerXM:w-[90vw] footerSM:w-[85vw] sm:w-[80vw] xxl:w-[1100px] ">
          <nav className="flex text-lg justify-center items-center ml-4 footerXM:ml-0">
            <Link href="/" className="my-5 mr-auto">
              <Image
                src="/cariq.png"
                width="126"
                height="32"
                alt="CarIQ"
              ></Image>
            </Link>
            {status === "authenticated" && (
              <div>
                <button
                  className="flex items-center mr-4 footerXM:mr-0"
                  onClick={() => {
                    onToggle();
                  }}
                >
                  <CgProfile size="32" className="text-orange" />
                </button>
              </div>
            )}
          </nav>
        </div>
        <hr className="h-[1px] opacity-50 bg-[#C2C2C2] w-full border-0 rounded"></hr>
      </div>
      {children}
    </div>
  );
}
