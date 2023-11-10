"use client";

import Loader from "<app>/components/Loader";
import Tile from "<app>/components/Tile";
import Button from "<app>/components/ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const Page = () => {
  const { data: session } = useSession();
  const [loanData, setLoanData] = useState({
    bankAccount: "",
    loanAmount: 100000,
    borrowerId: -1,
  });

  const { data: fetchBankAccounts, isLoading: isBankDataLoading } = useQuery({
    queryKey: ["fetch_bank_accounts_loans"],
    refetchOnMount: true,
    queryFn: async () => {
      const res = await axios.get("/api/account", {
        params: {
          userId: session?.user.id,
        },
      });

      return res.data;
    },
  });

  const { data: getLoans, isLoading } = useQuery({
    refetchOnMount: true,
    queryKey: ["get_usr_loans", loanData],
    queryFn: async () => {
      const response = await axios.get("/api/loans", {
        params: { account: loanData.bankAccount },
      });

      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        "/api/loans",
        { ...loanData, borrowerId: session?.user.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return res.data;
    },

    onSuccess: () => {
      toast.success("Sucessfully created a loan.");
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const userHasLoan = getLoans != null ? 1 : 0;

  if (!session?.user.id) {
    return null;
  }

  if (isLoading || isBankDataLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full items-center border-b py-4 font-semibold">
        <Link href="/dashboard" className="mr-auto">
          <Button
            variant="unstyled"
            className="flex items-center gap-2 rounded border p-2"
          >
            <BsArrowRight className="rotate-180" /> Back
          </Button>
        </Link>

        <p className="mr-auto">Do you need more money? Take a loan!</p>
      </div>

      <div className="flex h-full w-full items-center justify-center gap-12">
        <Tile
          title="Take a loan without any interest!  You don't even have to pay
          it back!"
          className="w-[55%]"
        >
          Looking for a loan without the burden of interest? You&apos;re in the
          right place. Our special interest-free loan is designed with you in
          mind. No hidden costs, just straightforward financial support. Get the
          funds you need without worrying about extra charges. Apply today and
          experience financial freedom.
        </Tile>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span>Pick your bank account</span>
            <select
              onChange={(ev) =>
                setLoanData({ ...loanData, bankAccount: ev.target.value })
              }
              className="rounded border p-1"
            >
              {Array.isArray(fetchBankAccounts) &&
                fetchBankAccounts.map((acc, idx) => (
                  <option className="gradient-bg" key={idx}>
                    {acc.accountNumber}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span>Pick loan amount</span>
            <select className="rounded border p-1">
              <option className="gradient-bg">$100 000</option>
            </select>
          </div>

          <Button
            onClick={() => mutate()}
            disabled={!!userHasLoan}
            className="disabled:cursor-not-allowed disabled:bg-red-500"
            variant="unstyled"
          >
            Take loan ({userHasLoan}/1)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
