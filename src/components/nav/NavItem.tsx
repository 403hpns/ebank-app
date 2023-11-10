"use client";

import Link from "next/link";

interface NavItemProps {
  href: string;
  title: string;
  isButton?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  title,
  isButton = false,
  onClick,
  icon,
}) => {
  return (
    <Link
      className={`p-2.5 flex flex-row items-center justify-center gap-2  relative transition ${
        isButton ? "rounded-xl bg-white hover:bg-[#d7e1ec]" : ""
      }`}
      href={href}
      onClick={onClick}
    >
      {icon}
      {title}
    </Link>
  );
};

export default NavItem;
