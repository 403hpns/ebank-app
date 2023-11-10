"use client";

import { useState } from "react";

import CardForm from "<app>/components/form/CardForm";
import Breadcrumb from "<app>/components/Breadcrumb";
import Card from "<app>/components/Card";

const Page = () => {
  const [cardDetails, setCardDetails] = useState<{
    name: string;
    color: "black" | "blue" | "purple";
  }>({
    name: "",
    color: "black",
  });
  return (
    <div className="mx-6 flex h-full w-full flex-col justify-center">
      <Breadcrumb title="Create new card" />

      <div className="flex h-full w-full items-center justify-center gap-12 ">
        <CardForm cardDetails={cardDetails} setCardDetails={setCardDetails} />
        <Card
          cardName={cardDetails.name}
          cardColor={cardDetails.color}
          cardCCV="XXX"
          cardNumber="XXX XXX XXX XXX"
          expiresDate="XX-XX-XXXX"
        />
      </div>
    </div>
  );
};

export default Page;
