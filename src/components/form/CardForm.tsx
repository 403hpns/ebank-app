"use client";

import { NewCardSchema, newCardSchema } from "<app>/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../ui/Button";
import { toast } from "react-hot-toast";

const CardForm = ({
  cardDetails,
  setCardDetails,
}: {
  cardDetails: any;
  setCardDetails: Dispatch<
    SetStateAction<{ name: string; color: "black" | "blue" | "purple" }>
  >;
}) => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCardSchema>({
    resolver: zodResolver(newCardSchema),
  });

  const { data: fetchBankAccounts, refetch: refetchBankAccounts } = useQuery({
    refetchOnMount: true,
    queryKey: ["fetc_bank_accounts"],
    queryFn: async () => {
      const response = await axios.get("/api/account", {
        params: { userId: session?.user.id },
      });

      return response.data;
    },
  });

  const { mutate: createCard } = useMutation({
    mutationFn: async (data: NewCardSchema) => {
      const response = await axios.post(
        "/api/cards",
        {
          ...data,
          userId: session?.user.id,
          cardColor: cardDetails.color,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    },

    onSuccess: () => {
      toast.success("Card created successfully.");
    },
    onError: () => {
      toast.error(
        "An error occurred while creating the card. Please try again. >>",
      );
    },
  });

  const onSubmit = async (formData: NewCardSchema) => {
    createCard(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label htmlFor="bankAccount">Bank account</label>
      <select
        {...register("bankAccount")}
        defaultValue={
          Array.isArray(fetchBankAccounts)
            ? fetchBankAccounts[0]
            : fetchBankAccounts?.accountNumber
        }
        className="rounded border border-inherit p-2 outline-none"
      >
        {Array.isArray(fetchBankAccounts) &&
          fetchBankAccounts.map((account, idx) => (
            <option key={idx}>{account.accountNumber}</option>
          ))}
      </select>
      <label htmlFor="name">Card name</label>
      <input
        {...register("name")}
        maxLength={20}
        onChange={(ev) =>
          setCardDetails({ ...cardDetails, name: ev.target.value ?? "Error" })
        }
        className="rounded border border-inherit p-2 outline-none"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <label htmlFor="color">Card color</label>
      <div className="flex gap-2">
        <ColorBox
          color="black"
          onColorClick={(newColor) =>
            setCardDetails({ ...cardDetails, color: newColor })
          }
        />
        <ColorBox
          color="blue"
          onColorClick={(newColor) =>
            setCardDetails({ ...cardDetails, color: newColor })
          }
        />
        <ColorBox
          color="purple"
          onColorClick={(newColor) =>
            setCardDetails({ ...cardDetails, color: newColor })
          }
        />
      </div>
      <Button type="submit" variant="unstyled" className="my-2 w-full">
        Send
      </Button>
    </form>
  );
};

export default CardForm;

const ColorBox = ({
  color,
  onColorClick,
}: {
  color: string;
  onColorClick: (newColor: string) => void;
}) => {
  const pickedColor = () => {
    switch (color) {
      case "black":
        return "bg-black";
      case "blue":
        return "bg-blue-500";
      case "purple":
        return "bg-purple-500";

      default:
        break;
    }
  };

  return (
    <div
      onClick={() => onColorClick(color)}
      className={`${pickedColor()} h-6 w-6 cursor-pointer rounded`}
    />
  );
};
