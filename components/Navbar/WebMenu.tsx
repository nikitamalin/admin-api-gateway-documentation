import Link from "next/link";
import Image from "next/image";
import React, { ReactNode } from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Spinner } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { useProfileContext } from "../Context/ProfileContext";
import { useDriverContext } from "../Context/DriverContext";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
interface Props {
  children?: ReactNode;
}

export default function WebMenu() {
  const { data: session, status } = useSession();
  let onToggle = useProfileContext().onToggle;
  let linkStyles =
    "px-[27px] hover:bg-white hover:text-black cursor-pointer font-arial font-normal transition hover:ease-in hover:transition-200 ";

  return (
    <div className=" flex-col w-full font-helvetica bg-black hidden brk:flex">
      <nav className="flex text-lg mr-[5.8%]">
        <a
          href="https://www.cariqfabfour.com/"
          className="absolute mt-[13px] left-[-35px] ml-[calc((100%-980px)/2)] outline-none"
        >
          <Image
            src="/fab4_nav.png"
            width="241"
            height="181"
            alt="CarIQ"
          ></Image>
        </a>

        <div className="flex text-[#eaeaea] border border-1 border-orange leading-[68px] mt-[38px] mb-[29px] font-thin text-[16px] ml-auto z-[1500]">
          <a
            href="https://www.cariqfabfour.com/standings"
            className={linkStyles}
          >
            Standings
          </a>
          <Link href="/" className={`bg-white text-black ${linkStyles}`}>
            Vote
          </Link>
          <a href="https://www.cariqfabfour.com/drivers" className={linkStyles}>
            Drivers
          </a>
          <a href="https://www.cariqfabfour.com/news" className={linkStyles}>
            News
          </a>
          <a href="https://www.cariqfabfour.com/about" className={linkStyles}>
            About
          </a>
          <a
            href="https://www.cariqfabfour.com/lead-collection"
            className={linkStyles}
          >
            Car IQ Pay
          </a>
        </div>
      </nav>
    </div>
  );
}
