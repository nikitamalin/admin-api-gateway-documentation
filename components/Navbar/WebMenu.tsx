import Link from "next/link";
import Image from "next/image";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function WebMenu() {
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
        {/*status === "authenticated" && (
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
            )*/}
        <div className="flex text-[#eaeaea] border border-1 border-orange leading-[68px] mt-[38px] mb-[29px] font-thin text-[16px] ml-auto ">
          <a href="https://www.cariqfabfour.com/" className={linkStyles}>
            Standings
          </a>
          <Link href="/" className={`bg-white text-black ${linkStyles}`}>
            Vote
          </Link>
          <a href="https://www.cariqfabfour.com/" className={linkStyles}>
            Drivers
          </a>
          <a href="https://www.cariqfabfour.com/" className={linkStyles}>
            News
          </a>
          <a href="https://www.cariqfabfour.com/" className={linkStyles}>
            About
          </a>
          <a href="https://www.cariqfabfour.com/" className={linkStyles}>
            Car IQ Pay
          </a>
        </div>
      </nav>
    </div>
  );
}
