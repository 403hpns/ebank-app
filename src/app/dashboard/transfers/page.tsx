"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Transaction from "<app>/components/Transaction";

const Page = () => {
  const { data: session } = useSession();
  const [pickedBankAccount, setPickedBankAccount] = useState("");

  const { data: userBankAccounts } = useQuery({
    queryKey: ["get_usr_accounts"],
    queryFn: async () => {
      const res = await axios.get("/api/account", {
        params: {
          userId: session?.user.id,
        },
      });

      return res.data;
    },

    refetchOnMount: true,
  });

  const { data: getTransactions } = useQuery({
    queryKey: ["get_transactions", pickedBankAccount],
    refetchOnMount: true,
    queryFn: async () => {
      console.log(pickedBankAccount);
      const res = await axios.get("/api/transfers", {
        params: {
          account: pickedBankAccount,
        },
      });

      return res.data;
    },
  });

  console.log(getTransactions);

  if (!session?.user) {
    return null;
  }

  return (
    <div className="m-6 flex w-full flex-col items-center gap-6">
      <div className="w-full border-b text-center font-semibold">Transfers</div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-w-full items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <p>Pick bank account:</p>
            <select
              onChange={(ev) => setPickedBankAccount(ev.target.value)}
              className="rounded border p-1"
            >
              {Array.isArray(userBankAccounts) &&
                userBankAccounts.map((acc: any, idx: number) => {
                  return (
                    <option className="gradient-bg" key={idx}>
                      {acc.accountNumber}
                    </option>
                  );
                })}
            </select>
          </div>

          <Link href="/dashboard/transfers/new" className="rounded border p-1">
            Make new transfer
          </Link>
        </div>

        <div>
          {Array.isArray(getTransactions) &&
            getTransactions.map((trans, idx) => (
              <Transaction
                key={idx}
                amount={trans.amount}
                date={new Date(trans.createdAt).toDateString()}
                title={trans.title}
                type={0}
              />
            ))}

          {!getTransactions ||
            (Array.isArray(getTransactions) && !getTransactions.length && (
              <p className="text-center">No transactions</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
