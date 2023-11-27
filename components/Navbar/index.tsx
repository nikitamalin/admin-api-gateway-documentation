import Link from "next/link";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Spinner } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { useProfileContext } from "../Context/ProfileContext";
import { useDriverContext } from "../Context/DriverContext";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import WebMenu from "./WebMenu";

interface Props {
  children?: ReactNode;
}

export default function Navbar({ children }: Props) {
  return (
    <div className="flex flex-col relative">
      <WebMenu />
      {children}
    </div>
  );
}
