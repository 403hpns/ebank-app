"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BsArrowRight } from "react-icons/bs";
import InsurenceContent from "<app>/components/InsurenceContent";
import Button from "<app>/components/ui/Button";
import { useState } from "react";
import Loader from "<app>/components/Loader";

const Page = () => {
  const { data: session } = useSession();
  const [insuranceData, setInsuranceData] = useState({});

  const { data, isLoading } = useQuery({
    refetchOnMount: true,
    queryKey: ["get_insurances"],
    queryFn: async () => {
      const res = await axios.get("/api/insurance", {
        params: {
          login: session?.user.login,
        },
      });

      setInsuranceData(res.data);
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.patch("/api/insurance", data, {
        params: {
          login: session?.user.login,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    },
  });

  const handleNewInsurance = async (type: "life" | "car") => {
    const data =
      type === "life" ? { lifeInsurance: true } : { carInsurance: true };

    setInsuranceData({
      ...insuranceData,
      ...data,
    });

    mutate({ ...insuranceData, ...data });
  };

  if (!session?.user) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full min-w-full flex-col">
      <div className="flex w-full items-center border-b py-4 font-semibold">
        <Link href="/dashboard" className="mr-auto">
          <Button
            variant="unstyled"
            className="flex items-center gap-2 rounded border p-2"
          >
            <BsArrowRight className="rotate-180" /> Back
          </Button>
        </Link>

        <p className="mr-auto">Start a new car or life insurance in e-Bank!</p>
      </div>

      <InsurenceContent
        userInsurance={insuranceData}
        handleNewInsurence={handleNewInsurance}
      />
    </div>
  );
};

export default Page;
