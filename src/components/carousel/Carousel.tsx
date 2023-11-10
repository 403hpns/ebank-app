"use client";

import React, { Fragment, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";

import Card from "../Card";
import CardToolbar from "../CardToolbar";

function Carousel({
  data,
  refetchCardsData,
}: {
  data: any;
  refetchCardsData: any;
}) {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => setSlide(slide === data.length - 1 ? 0 : slide + 1);
  const prevSlide = () => setSlide(slide === 0 ? data.length - 1 : slide - 1);

  const { mutate: handleCloseButtonClick } = useMutation({
    mutationKey: ["delete_card"],
    mutationFn: async () => {
      const res = await axios.delete("/api/cards", {
        params: {
          number: data[slide].number,
        },
      });

      return res.data;
    },

    onSuccess: () => {
      toast.success("Successfully updated");
      // setSlide((prev) => (prev === 0 ? 0 : prev - 1));
      refetchCardsData();
    },

    onError: () => {
      toast.error("There was an error updating the card. Please try again!");
    },
  });

  const { mutate: handleBlockButtonClick } = useMutation({
    mutationKey: ["update_card_block_state"],
    mutationFn: async () => {
      const response = await axios.patch("/api/cards", data[slide], {
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    },

    onSuccess: () => {
      toast.success("Successfully updated");
      // setSlide((prev) => prev - 1);
      refetchCardsData();
    },

    onError: () => {
      toast.error(
        "There was an error updating the card. Please try again! block",
      );
    },
  });

  return (
    <div>
      {Array.isArray(data) &&
        data.map((card, idx) => {
          return (
            <Fragment key={idx}>
              <div className="flex items-center gap-12">
                <BsArrowRight
                  onClick={() => nextSlide()}
                  className={`${
                    slide === idx ? "" : "hidden"
                  } rotate-180 cursor-pointer text-4xl transition hover:scale-125`}
                />
                <Card
                  cardName={card.name}
                  cardCCV={card.ccv}
                  cardColor={card.color.toLowerCase()}
                  cardNumber={card.number}
                  expiresDate={card.expireDate}
                  isBlocked={!card.active}
                  className={`${slide === idx ? "" : "hidden"}`}
                />
                <BsArrowRight
                  onClick={() => prevSlide()}
                  className={`${
                    slide === idx ? "" : "hidden"
                  } cursor-pointer text-4xl transition hover:scale-125`}
                />
              </div>

              <CardToolbar
                className={`${slide === idx ? "" : "hidden"}`}
                onBlockButtonClick={handleBlockButtonClick}
                onCloseButtonClick={handleCloseButtonClick}
                isBlocked={!card.active}
              />
            </Fragment>
          );
        })}
    </div>
  );
}

export default Carousel;
