"use client";

import React, { ReactNode } from "react";
import Tile from "./Tile";
import { AiOutlineCar, AiOutlineHeart } from "react-icons/ai";
import Button from "./ui/Button";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type InsurenceContentProps = {
  userInsurance: any;
  handleNewInsurence: (type: "life" | "car") => void;
};

const InsurenceContent = ({
  userInsurance,
  handleNewInsurence,
}: InsurenceContentProps) => {
  console.log(userInsurance);

  const router = useRouter();
  return (
    <>
      <div className="flex gap-8">
        <div className="flex flex-col items-center gap-4">
          <Tile
            className="h-full w-auto"
            title="Life Insurance"
            icon={<AiOutlineHeart />}
          >
            Secure your future and the ones you cherish with our life insurance.
            Our policy offers peace of mind, providing financial support for
            your loved ones in times of unpredictability. Whether you&apos;re
            thinking about your children&apos;s education, paying off a
            mortgage, or ensuring comfort for your family after you&apos;re
            gone, our life insurance is your assurance for a better tomorrow..
          </Tile>
          <Button
            disabled={userInsurance?.lifeInsurance}
            className="w-full disabled:cursor-not-allowed disabled:bg-gray-100"
            variant="unstyled"
            onClick={() => {
              handleNewInsurence("life");
              toast.success("You have insured yourself!");
              router.refresh();
            }}
          >
            <BsArrowRight className="mr-1" /> Pick this insurance
          </Button>
        </div>
        <div className="flex h-full flex-col items-center gap-4">
          <Tile
            className="h-full w-auto"
            title="Car Insurance"
            icon={<AiOutlineCar />}
          >
            Road safety is paramount, and our car insurance ensures
            comprehensive protection. We provide tailored solutions that adapt
            to your needs. Our policy not only shields you from unexpected
            situations but also instills confidence in every journey. With our
            car insurance, focus on enjoying the ride while we take care of the
            rest.
          </Tile>
          <Button
            disabled={userInsurance?.carInsurance}
            className="w-full disabled:cursor-not-allowed disabled:bg-gray-100"
            variant="unstyled"
            onClick={() => {
              handleNewInsurence("car");
              toast.success("You have insured yourself!");
              router.refresh();
            }}
          >
            <BsArrowRight className="mr-1" /> Pick this insurance
          </Button>
        </div>
      </div>
    </>
  );
};

export default InsurenceContent;
