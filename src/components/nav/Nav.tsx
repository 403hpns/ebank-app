"use client";

import { BiSupport, BiUser } from "react-icons/bi";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex flex-row items-center justify-between p-12 text-lg">
      <div className="text-4xl font-semibold text-[#0cbc8b]">
        <p className="stroke">e-Bank</p>
      </div>
      <div className="align-center flex flex-row gap-12">
        <NavItem href="#" title="Accounts" />
        <NavItem href="#" title="Cards" />
        <NavItem href="#" title="Loans" />
        <NavItem href="#" title="Insurance" />

        <div className="mx-6 flex gap-8">
          <NavItem
            href={session?.user ? "/dashboard" : "/login"}
            title={session?.user ? "My account" : "Login"}
            isButton
            icon={<BiUser />}
          />
          <NavItem
            href="#"
            title="Support 24/7"
            isButton
            icon={<BiSupport />}
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
