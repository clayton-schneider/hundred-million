// Must be a react file so button can be used in other react files
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  to?: string;
  type?: "submit" | "reset" | "button";
  className?: string;
}
const PrimaryBtn = ({ children, to, className, type = "button" }: Props) => (
  <a
    type={type}
    href={to}
    className={
      className +
      " bg-black inline-block px-16 py-3 rounded-full font-bebas text-2xl text-white cursor-pointer"
    }
  >
    {children}
  </a>
);

export default PrimaryBtn;
