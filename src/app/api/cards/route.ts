import { db } from "<app>/lib/db";
import { fetcher } from "<app>/lib/fetcher";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

enum CardTypes {
  BLACK = "BLACK",
  BLUE = "BLUE",
  PURPLE = "PURPLE",
}

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.searchParams);
  const accountParam = searchParams.get("account");
  const idParam = searchParams.get("userId");

  if (!accountParam || !idParam) {
    return NextResponse.json(
      "There was a problem retrieving your account information. Try again.",
      { status: 404 },
    );
  }

  const cards = await db.cards.findMany({
    where: {
      accountId: accountParam,
      userId: +idParam,
    },
    include: {
      user: {
        include: {
          bankAccounts: true,
        },
      },
    },
  });

  if (!cards || !cards.length) {
    return NextResponse.json(
      "There was a problem retrieving your account information. Try again.",
      { status: 404 },
    );
  }

  return NextResponse.json(cards);
}

async function getUserCards() {
  return await fetcher("/api/products", {
    method: "GET",
    schema: cardsSchema,
  });
}

const cardsSchema = z.object({
  cardName: z.string(),
});

type CardsSchema = z.infer<typeof cardsSchema>;

export async function PATCH(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { active, id } = body;

  const findCard = await db.cards.findFirst({
    where: {
      id,
    },
  });

  if (!findCard) {
    return NextResponse.json("Jebał cię pies.");
  }

  const updatedCard = await db.cards.update({
    where: {
      id,
    },
    data: {
      active: !active,
    },
  });

  if (!updatedCard) return NextResponse.json("Jebał cię pies.");

  return NextResponse.json("Jebał cię kot.");
}

export async function DELETE(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.searchParams);
  const number = searchParams.get("number");

  if (!number) {
    return NextResponse.json(
      "An error occurred while searching for card with this numer.",
    );
  }

  const deleteCard = await db.cards.delete({
    where: {
      number: number,
    },
  });

  if (!deleteCard) {
    return NextResponse.json("An error occurred while deleting the card.");
  }

  return NextResponse.json("Card deleted.");
}

export async function POST(req: NextRequest) {
  const { name, bankAccount, userId, cardColor } = await req.json();

  const accountExists = await db.bankAccount.findUnique({
    where: {
      accountNumber: bankAccount,
    },
  });

  if (!accountExists) {
    return NextResponse.json("An error occured while creating card.", {
      status: 400,
    });
  }

  let generatedCardNumber = Math.floor(Math.random() * 10_000_000) + "";
  let generatedCcv = Math.floor(Math.random() * 1000);
  let generatedPin = String(Math.floor(Math.random() * 9000) + 1000);
  let pickedColor =
    cardColor === "black"
      ? CardTypes.BLACK
      : cardColor === "blue"
      ? CardTypes.BLUE
      : CardTypes.PURPLE;

  const newCard = await db.cards.create({
    data: {
      accountId: bankAccount,
      userId: +userId,
      name,
      number: generatedCardNumber,
      ccv: generatedCcv,
      pin: generatedPin,
      color: pickedColor,
      expireDate: new Date(2077, 6, 23),
    },
  });

  if (!newCard) {
    return NextResponse.json("An error occured while creating card.", {
      status: 400,
    });
  }

  return NextResponse.json(newCard);
}
