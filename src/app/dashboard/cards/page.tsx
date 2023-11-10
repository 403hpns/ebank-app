"use client";

import { useEffect, useState } from "react";
import Tile from "<app>/components/Tile";
import Button from "<app>/components/ui/Button";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import { BiBlock, BiEditAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { MdCreditCard } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { toast } from "react-hot-toast";
import Carousel from "<app>/components/carousel/Carousel";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Breadcrumb from "<app>/components/Breadcrumb";
import Loader from "<app>/components/Loader";

const Cards = () => {
  const { data: session } = useSession();

  const [pickedBankAccount, setPickedBankAccount] = useState("");

  const { refetch: refetchCardsData, data: cardsData } = useQuery({
    queryKey: ["usr_cards", pickedBankAccount],
    queryFn: async () => {
      const response = await axios.get("/api/cards", {
        params: { account: pickedBankAccount, userId: session?.user.id },
      });

      return response.data;
    },
  });

  const { data: userBankAccounts, isLoading: isUserBankAccountsLoading } =
    useQuery({
      refetchOnMount: true,
      queryKey: ["usr_bank_accounts"],
      queryFn: async () => {
        const response = await axios.get("/api/account", {
          params: {
            userId: session?.user.id,
          },
        });

        setPickedBankAccount(response.data[0].accountNumber);

        return response.data;
      },
    });

  if (!session?.user) {
    return <Loader />;
  }

  return (
    /* main container */
    <div className="grow-1 m-8 flex flex-1 flex-col">
      <Breadcrumb title="Your cards" />
      <div className="flex gap-2">
        <Link href="/dashboard/cards/new" className="h-full">
          <div className="flex h-full cursor-pointer items-center justify-center gap-2 rounded-lg p-6 shadow-md hover:bg-gray-100">
            <AiOutlinePlusCircle size={40} />
            <div className="flex flex-col">
              <h3 className="font-semibold">Need more cards?</h3>
              <h4>Open new card</h4>
            </div>
          </div>
        </Link>

        <Tile title="Total cards" icon={<MdCreditCard size={19} />}>
          {Array.isArray(cardsData) ? cardsData.length : "0"}
        </Tile>
        <Tile title="Pick bank account" icon={<MdCreditCard size={19} />}>
          <select onChange={(ev) => setPickedBankAccount(ev.target.value)}>
            {isUserBankAccountsLoading && <p>Loading...</p>}
            {Array.isArray(userBankAccounts) &&
              userBankAccounts.map((bankAccount, idx) => (
                <option key={idx}>{bankAccount.accountNumber}</option>
              ))}
          </select>
        </Tile>
      </div>

      <div className="mt-12 flex h-full w-full flex-col items-center justify-center rounded p-2">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-center justify-center gap-12">
            {isUserBankAccountsLoading && <Loader />}
            {!isUserBankAccountsLoading && cardsData && (
              <Carousel refetchCardsData={refetchCardsData} data={cardsData} />
            )}
            {!isUserBankAccountsLoading && !cardsData && (
              <p>
                No cards to preview. Create your first card on this account{" "}
                <a
                  href="/dashboard/cards/new"
                  className="font-semibold hover:underline"
                >
                  here!
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;

