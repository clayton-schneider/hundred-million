interface Props {
  isOpen: boolean;
  clicked: () => void;
  color: string;
}
const Hamburger = ({ isOpen, clicked, color }: Props) => {
  return (
    <button
      aria-label="mobile menu"
      onClick={clicked}
      className="relative z-50 cursor-pointer lg:hidden"
    >
      <span
        className={
          "mx-auto my-1 block h-1 w-7 transition-all duration-300 " +
          `bg-${color} ` +
          (isOpen ? "translate-y-2 rotate-45 " : "")
        }
      ></span>
      <span
        className={
          "mx-auto my-1 block h-1 w-7 transition-all duration-300 " +
          `bg-${color} ` +
          (isOpen ? "opacity-0 " : "")
        }
      ></span>
      <span
        className={
          "mx-auto my-1 block h-1 w-7 transition-all duration-300 " +
          `bg-${color} ` +
          (isOpen ? "-translate-y-2 -rotate-45 " : "")
        }
      ></span>
    </button>
  );
};

export default Hamburger;
