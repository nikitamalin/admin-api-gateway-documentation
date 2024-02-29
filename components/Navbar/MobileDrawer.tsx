import {
  Drawer,
  DrawerContent,
  Divider,
  DrawerBody,
  Spinner
} from "@chakra-ui/react";

import Link from "next/link";

import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

interface MobileDrawerProps {
  setIsNavOpen: (prev: boolean) => void;
  isNavOpen: boolean;
}
const linkStyles =
  "outline-none text-center leading-[59px] font-normal font-arial ";

export default function MobileDrawer({
  setIsNavOpen,
  isNavOpen
}: MobileDrawerProps) {
  const router = useRouter();

  let isHome;

  if (router.asPath === "/") {
    isHome = true;
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
          <Link
            href="/"
            className={`${isHome && "text-orange"} ${linkStyles}`}
            onClick={() => setIsNavOpen(false)}
          >
            Home
          </Link>

          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
            className={`${linkStyles}`}
          >
            Sign Out
          </button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
