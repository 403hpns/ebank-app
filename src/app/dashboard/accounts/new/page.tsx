"use client";

import Tile from "<app>/components/Tile";
import Button from "<app>/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineAccountBalance, MdOutlineNumbers } from "react-icons/md";

import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AccountSchema, accountSchema } from "<app>/lib/schemas";

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
  });

  const { mutate: createBankAccount, isLoading } = useMutation({
    mutationFn: async (newBankAccount: AccountSchema) => {
      const controller = new AbortController();

      return axios.post(
        "/api/account",
        { userId: Number(session?.user.id), ...newBankAccount },
        {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data + "");
    },
    onSuccess: () => {
      reset();

      toast.success("Your new account has been created!");
      router.push("/dashboard/accounts");
      router.refresh();
    },
  });

  const onSubmit = async (data: AccountSchema) => {
    createBankAccount(data);
  };

  return (
    <div className="mx-6 flex w-full flex-col gap-6 py-6">
      <div className="flex w-full items-center border-b py-4 font-semibold">
        <Link href="/dashboard/accounts" className="mr-auto">
          <Button
            variant="unstyled"
            className="flex items-center gap-2 rounded border p-2"
          >
            <BsArrowRight className="rotate-180" /> Back
          </Button>
        </Link>

        <p className="mr-auto">Open new account</p>
      </div>

      <div className="flex gap-12">
        <div className="flex flex-1 flex-col gap-4">
          <Tile
            className="w-full"
            icon={<MdOutlineAccountBalance />}
            title="Do you need more accounts?"
          >
            With e-Bank you can easily open as many accounts as you want for
            totally free. All you have to do is fill out the short form below.
          </Tile>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <input
              {...register("accountName")}
              type="text"
              placeholder={"Account name"}
              className={`rounded border p-2 outline-none ${
                errors?.accountName ? " border-red-500" : "border-inherit"
              }`}
            />
            {errors.accountName && (
              <p className="text-red-500">{errors.accountName.message}</p>
            )}

            <Button
              className="disabled:bg-red-500"
              disabled={isLoading}
              type="submit"
              variant="unstyled"
            >
              Open new account
            </Button>
          </form>
        </div>

        <span className="h-full w-px bg-[#e5e7eb]" />

        <div className="relative flex flex-1 flex-col items-center justify-center">
          <p className="font-semibold">
            Get a free $1000 for opening a new account!
          </p>

          <div className="flex w-full flex-col">
            <Tile icon={<MdOutlineNumbers />} className="w-full" title="Step I">
              Open a new account.
            </Tile>
            <Tile
              icon={<MdOutlineNumbers />}
              className="w-full"
              title="Step II"
            >
              You will receive a transfer from us for the amount of $1000! Money
              will immediately appear in your account.
            </Tile>
            <Tile
              icon={<MdOutlineNumbers />}
              className="w-full"
              title="Step III"
            >
              Check your balance! Free $1000 is already with you!
            </Tile>
          </div>
          {/* <Image src="/savings.svg" alt="" fill /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
