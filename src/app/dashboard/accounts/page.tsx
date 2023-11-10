import Account from "<app>/components/Account";
import Tile from "<app>/components/Tile";
import { db } from "<app>/lib/db";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineAccountBalance } from "react-icons/md";
import { getServerSession } from "next-auth";
import Loader from "<app>/components/Loader";
import { authOptions } from "<app>/lib/auth";

const Accounts = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  const data = await db.bankAccount
    .findMany({
      where: {
        ownerId: +session?.user.id,
      },
    })
    .finally(() => db.$disconnect());

  if (!session.user) {
    return <Loader />;
  }

  return (
    <div className="flex h-full flex-1 flex-col gap-10">
      <div className="flex gap-2">
        <Link href="/dashboard/accounts/new" className="h-full">
          <div className="flex h-full cursor-pointer items-center justify-center gap-2 rounded-lg p-6 shadow-md hover:bg-gray-100">
            <AiOutlinePlusCircle size={40} />
            <div className="flex flex-col">
              <h3 className="font-semibold">Need more accounts?</h3>
              <h4>Open new account</h4>
            </div>
          </div>
        </Link>
        <Tile
          title="Total accounts"
          icon={<MdOutlineAccountBalance size={19} />}
          className="h-full"
        >
          <p>{data?.length}</p>
        </Tile>
      </div>
      <div className="flex flex-col gap-2">
        <div className="border-b text-center font-semibold">
          List of your all bank accounts
        </div>
        <div className="flex max-h-[300px] flex-col items-center gap-2 overflow-x-hidden overflow-y-scroll bg-red-500">
          {Array.isArray(data) && data?.length ? (
            <>
              {data?.map((acc: any) => (
                <Account
                  key={acc.id}
                  name={acc.accountName}
                  accountNumber={acc.accountNumber}
                  balance={acc.balance || 0}
                />
              ))}
            </>
          ) : (
            <p>You don&apos;t have any bank account</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
