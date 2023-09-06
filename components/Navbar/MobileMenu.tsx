import { Metrophobic } from "next/font/google";
import HamburgerMenu from "./HamburgerMenu";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
export default function MobileMenu() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="brk:hidden ">
      <HamburgerMenu isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <MobileDrawer isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
    </div>
  );
}
