"use client";

import {
  FormEvent,
  LegacyRef,
  MutableRefObject,
  RefObject,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { MdOutlineAttachMoney } from "react-icons/md";
import { useSession } from "next-auth/react";
import { BsArrowRight } from "react-icons/bs";

import Button from "<app>/components/ui/Button";
import Tile from "<app>/components/Tile";
import Loader from "<app>/components/Loader";

const pickedBankAccountSchema = z.object({
  id: z.number(),
  accountNumber: z.string(),
  accountName: z.string(),
  balance: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  ownerId: z.number(),
});

type PickedBankAccount = z.infer<typeof pickedBankAccountSchema>;

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [targetBankAccount, setTargetBankAccount] = useState("");
  const [pickedBankAccount, setPickedBankAccount] =
    useState<PickedBankAccount | null>(null);

  const { isLoading, isError, data } = useQuery({
    refetchOnMount: true,
    queryKey: ["bank_accounts_transfers"],
    queryFn: async () => {
      const res = await axios.get(`/api/account`, {
        params: {
          userId: +session!.user.id,
          getAll: false,
        },
      });

      // Set initial value
      setPickedBankAccount(res.data[0]);
      console.log(res.data);
      console.log(res.data[0]);

      return res.data;
    },
  });

  const { mutate: mutation, isLoading: isDataLoading } = useMutation({
    mutationFn: async (target: HTMLFormElement) => {
      const controller = new AbortController();

      const formData = new FormData(target);
      const title = formData.get("title") as string;
      const amount = formData.get("amount");
      const senderAccount = formData.get("sender") as string;
      const targetAccount = formData.get("target") as string;

      const newAmount = amount?.toString().replace(/[^0-9]/g, "");

      if (!targetAccount || senderAccount === targetAccount) {
        throw new AxiosError("Invalid target account number!");
      }

      return await axios.post(
        "/api/transfers",
        {
          title,
          amount: newAmount,
          senderAccount,
          targetAccount,
          senderUserId: session?.user.id,
        },
        {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },

    onSuccess: () => {
      toast.success("Transfer complete!");
      router.refresh();
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  if (!session?.user || isLoading) {
    return <Loader />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation(event.currentTarget);
  };

  return (
    <div className="mx-6 flex w-full flex-col items-center justify-center gap-6">
      <div className="flex w-full items-center border-b py-4 font-semibold">
        <Button
          variant="unstyled"
          className="mr-auto flex items-center gap-2 rounded border p-2"
        >
          <BsArrowRight className="rotate-180" /> Back
        </Button>
        <p className="mr-auto">Make new transfer</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-6 flex w-full flex-col gap-6">
        <div className="flex items-center gap-2">
          <Tile icon={<MdOutlineAttachMoney />} title="Account balance">
            {pickedBankAccount?.balance || "error"}
          </Tile>
          <Tile icon={<MdOutlineAttachMoney />} title="Last transfer">
            {pickedBankAccount?.balance || "error"}
          </Tile>
        </div>
        <div className="flex flex-col items-center">
          <span className="flex w-full flex-col gap-2">
            <div>
              <p>From bank account:</p>
              <select
                onChange={(ev) => {
                  if (Array.isArray(data)) {
                    const picked = data.find(
                      (acc: any) =>
                        acc.accountNumber === String(ev.target.value),
                    );

                    setPickedBankAccount(picked);
                  }
                }}
                name="sender"
                className="w-full rounded border p-1"
              >
                {Array.isArray(data) &&
                  data.map((bankAcc, idx) => (
                    <option
                      key={idx}
                      value={bankAcc.accountNumber}
                      className="gradient-bg"
                    >
                      {bankAcc.accountNumber}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <p>Target account number:</p>
              <input
                name="target"
                type="text"
                value={targetBankAccount}
                onChange={(ev) => setTargetBankAccount(ev.target.value)}
                placeholder="0000 0000 0000 0000"
                className="min-w-full rounded border p-2 outline-none"
                autoComplete="off"
              />
              <BankAccountsSearchResult
                input={targetBankAccount}
                handlePickedAccount={setTargetBankAccount}
              />
            </div>

            <div>
              <p>Title:</p>
              <input
                name="title"
                type="text"
                placeholder="Thanks for drugs"
                className="min-w-full rounded border p-2 outline-none"
              />
            </div>

            <div>
              <p>Amount:</p>
              <input
                name="amount"
                type="number"
                placeholder="$2137"
                className="w-full rounded border p-2 outline-none"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
          </span>
          <Button
            disabled={isDataLoading}
            variant="unstyled"
            className="my-2 disabled:cursor-not-allowed disabled:bg-red-500"
          >
            Send money
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;

const BankAccountsSearchResult = ({
  input,
  handlePickedAccount,
}: {
  input: string;
  handlePickedAccount: (x: string) => void;
}) => {
  const [accounts, setAccounts] = useState<any[]>();
  const { data: session } = useSession();

  // First, we have to fetch all bank accounts
  const { data: bankAccounts, isLoading } = useQuery({
    queryKey: ["bank_accounts"],
    queryFn: async () => {
      const res = await axios.get("/api/account", {
        params: {
          getAll: true,
        },
      });

      setAccounts(res.data);
      return res.data;
    },
  });

  if (!session?.user) {
    return <Loader />;
  }

  if (!input) {
    return null;
  }

  return (
    <div>
      <ul className="flex max-h-[100px] flex-col overflow-y-auto">
        {Array.isArray(accounts) &&
          accounts
            .filter((account: any, index: number) =>
              account.accountNumber.includes(input),
            )
            .map((acc: any, idx: number) => {
              if (acc.accountNumber === input) return null;
              return (
                <p
                  onClick={() => {
                    handlePickedAccount(acc.accountNumber);
                  }}
                  className="cursor-pointer border border-inherit p-2 odd:bg-neutral-100 hover:font-bold"
                  key={idx}
                >
                  {acc.accountNumber} ({acc.accountName})
                </p>
              );
            })}
        {Array.isArray(accounts) &&
          accounts.filter((account: any, index: number) =>
            account.accountNumber.includes(input),
          ).length <= 0 && (
            <p className="break-words text-center text-red-500">
              Sorry, we can&apos;t find an account with given number.
            </p>
          )}
      </ul>
    </div>
  );
};
