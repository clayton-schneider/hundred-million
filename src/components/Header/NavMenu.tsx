import { useState } from "react";
import Hamburger from "./Hamburger";
import PrimaryBtn from "@components/buttons/PrimaryBtn";

interface Props {
  links: {
    link: string;
    linkText: string;
    sublinks?: {
      link: string;
      linkText: string;
    }[];
  }[];
}

const NavMenu = ({ links }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <ul
        className={
          "absolute top-[144px] z-50 flex w-full flex-col items-start gap-6 text-text-light bg-black font-bebas py-5 px-8 text-2xl transition-all duration-300 lg:static lg:w-auto lg:flex-row lg:items-center lg:bg-transparent lg:py-0 lg:px-0 " +
          (isOpen ? "left-0 z-40" : "-left-full")
        }
      >
        {links.map((link, idx) => (
          <li
            key={idx}
            className="border-b border-b-white w-full lg:border-none lg:w-auto"
          >
            <a href={link.link}>{link.linkText}</a>
          </li>
        ))}
        <PrimaryBtn
          to="/join-us"
          className="!block !bg-primary w-full text-center lg:w-auto"
        >
          Join Us
        </PrimaryBtn>
      </ul>
      <Hamburger clicked={handleClick} isOpen={isOpen} color="white" />
    </div>
  );
};
export default NavMenu;
