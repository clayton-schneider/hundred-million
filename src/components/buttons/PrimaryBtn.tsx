// Must be a react file so button can be used in other react files
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  to?: string;
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
  // Customize to theme
  color?: "primary" | "black";
}
const PrimaryBtn = ({
  children,
  to,
  className,
  onClick,
  type = "button",
  color = "black",
}: Props) => (
  <a
    onClick={onClick}
    type={type}
    href={to}
    className={
      className +
      ` bg-${color}` +
      " inline-block px-16 py-3 rounded-full font-bebas text-2xl text-white cursor-pointer"
    }
  >
    {children}
  </a>
);

export default PrimaryBtn;
