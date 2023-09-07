import {
  Drawer,
  DrawerContent,
  Divider,
  DrawerBody,
  Text
} from "@chakra-ui/react";

import Link from "next/link";

import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

interface MobileDrawerProps {
  setIsNavOpen: (prev: boolean) => void;
  isNavOpen: boolean;
}
let linkStyles =
  "outline-none text-center leading-[59px] font-normal font-arial ";

export default function MobileDrawer({
  setIsNavOpen,
  isNavOpen
}: MobileDrawerProps) {
  const router = useRouter();
  let isAdmin = false;
  let isVerified = true;
  let isHome = false;
  let isAbout = false;
  let isDashboard = false;
  let isCareerGuide = false;
  let isMyCommunity = false;
  let isProfile = false;
  let isJobs = false;
  let isSignUp = false;
  let isChat = false;
  let isFeed = false;
  let isAdminPage = false;
  const isUserProfile = false;
  let isVerification = false;
  if (router.pathname == "/") {
    isHome = true;
  }
  if (router.pathname == "/about") {
    isAbout = true;
  }
  if (router.pathname == "/dashboard") {
    isDashboard = true;
  }
  if (router.pathname == "/career-guides") {
    isCareerGuide = true;
  }
  if (router.pathname == "/mycommunity") {
    isMyCommunity = true;
  }
  if (router.pathname == "/user/profile") {
    isProfile = true;
  }
  if (router.pathname == "/jobs") {
    isJobs = true;
  }
  if (router.pathname == "/signup") {
    isSignUp = true;
  }
  if (router.pathname == "/chat") {
    isChat = true;
  }
  if (router.pathname == "/discussion") {
    isFeed = true;
  }
  if (router.pathname == "/admin") {
    isAdminPage = true;
  }
  if (router.pathname == "/verification") {
    isVerification = true;
  }

  return (
    <Drawer
      isOpen={isNavOpen}
      placement="right"
      size="full"
      onClose={() => setIsNavOpen(!isNavOpen)}
    >
      <DrawerContent
        mt="0px"
        className="text-2xl z-10 bg-[#f7f7f7]"
        bg="#f7f7f7"
      >
        <DrawerBody p={0} className="flex flex-col mt-[95px] gap-10">
          <a
            href="https://www.cariqfabfour.com/standings"
            className={linkStyles}
          >
            Standings
          </a>
          <Link href="/" className={`text-[#d33303] ${linkStyles}`}>
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
