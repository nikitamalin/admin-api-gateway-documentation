import React from "react";
import { Spinner } from "@chakra-ui/react";
import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-[100svh] ">
      <div className="relative flex items-center">
        <Spinner
          thickness="4px"
          speed=".8s"
          emptyColor="gray.200"
          color="#30c0d4"
          width={{ base: "100px", footerSM: "140px", md: "200px" }}
          height={{ base: "100px", footerSM: "140px", md: "200px" }}
        />
        <div
          className="absolute
			w-[46px] h-[46px] ml-[27px]
			footerSM:w-[66px] footerSM:h-[66px] footerSM:ml-[37px]
			md:w-[90px] md:h-[90px] md:ml-[55px]"
        >
          <Image src="/cariq-pay.jpg" alt="Logo" fill />
        </div>
      </div>
    </div>
  );
}
