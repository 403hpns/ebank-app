"use client";

import Button from "<app>/components/ui/Button";
import List from "<app>/components/ui/List/List";
import ListItem from "<app>/components/ui/List/ListItem";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineHome } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { MdCreditCard, MdOutlineAccountBalance } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { VscHistory } from "react-icons/vsc";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <nav>
      <div className="flex h-full flex-col items-center">
        <div className="flex items-center gap-6">
          <div className="rounded-full border px-6 py-4">
            {`${session?.user?.login}`.at(0)}
          </div>
          <h3 className="font-semibold">{session?.user.login}</h3>
        </div>
        <List>
          <div>
            <ListItem
              label="Dashboard"
              href="/dashboard"
              icon={<AiOutlineHome />}
            />
            <div className="my-2 border-b" />
            <ListItem
              label="My Accounts"
              href="/dashboard/accounts"
              icon={<MdOutlineAccountBalance />}
            />
            <ListItem
              label="My Cards"
              href="/dashboard/cards"
              icon={<MdCreditCard />}
            />
            <ListItem
              label="Transfers"
              href="/dashboard/transfers"
              icon={<VscHistory />}
            />
            <ListItem
              label="Loans"
              href="/dashboard/loans"
              icon={<FaRegMoneyBillAlt />}
            />
            <ListItem
              label="Insurance"
              href="/dashboard/insurance"
              icon={<BsShieldCheck />}
            />
          </div>

          <div>
            <div className="my-2 border-b" />
            <ListItem
              label="Settings"
              href="/dashboard/settings"
              icon={<FiSettings />}
            />
            <ListItem
              label="Log out"
              href="/"
              onClick={() => signOut()}
              icon={<CiLogout />}
              className="hover:bg-red-500 hover:text-white"
            />
          </div>
        </List>
      </div>
    </nav>
  );
};

export default Sidebar;
