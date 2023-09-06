interface HamburgerMenuProps {
  setIsNavOpen: (prev: boolean) => void;
  isNavOpen: boolean;
}

export default function HamburgerMenu({
  setIsNavOpen,
  isNavOpen
}: HamburgerMenuProps) {
  return (
    <div
      onClick={() => setIsNavOpen(!isNavOpen)}
      className={`nav-icon4 ml-auto mt-[50px] mr-[20px] z-[1500]  ${
        isNavOpen ? "navOpen" : ""
      }`}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
