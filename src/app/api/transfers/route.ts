import { NextRequest, NextResponse } from "next/server";
import { db } from "<app>/lib/db";

export async function GET(req: NextRequest) {
  const queryParams = new URLSearchParams(req.nextUrl.search);
  const userAccount = queryParams.get("account");

  if (!userAccount) {
    return NextResponse.json(
      "An error occurred while retrieving account data.",
      { status: 400 },
    );
  }

  const userTransactions = await db.transfers.findMany({
    where: {
      OR: [
        {
          senderAccount: userAccount,
        },
        {
          targetAccount: userAccount,
        },
      ],
    },
  });

  return NextResponse.json(userTransactions);
}

export async function POST(request: NextRequest, res: NextResponse) {
  const body = await request.json();

  const { title, amount, senderAccount, targetAccount, senderUserId } = body;

  if (senderAccount === targetAccount) {
    return NextResponse.json("You can't transfer money to yourself.", {
      status: 402,
    });
  }

  const senderBankAccount = await db.bankAccount.findUnique({
    where: {
      accountNumber: senderAccount,
    },
    select: {
      balance: true,
      ownerId: true,
    },
  });

  const targetBankAccount = await db.bankAccount.findUnique({
    where: {
      accountNumber: targetAccount,
    },
    select: {
      balance: true,
      ownerId: true,
    },
  });

  const targetUserId = targetBankAccount?.ownerId;

  if (!targetUserId) {
    return NextResponse.json(
      "An error occured while fetching target user data.",
      {
        status: 402,
      },
    );
  }

  if (!targetBankAccount) {
    return NextResponse.json("Given account does not exist.", {
      status: 401,
    });
  }

  if (!senderBankAccount || senderBankAccount.balance < +amount) {
    return NextResponse.json("You dan't have money for make this transfer!", {
      status: 402,
    });
  }

  const newTransfer = await db.transfers.create({
    data: {
      type: "INCOMING",
      title,
      amount: +amount,
      senderAccount: senderAccount,
      targetAccount: targetAccount,
      senderUserId: +senderUserId,
      targetUserId: +targetUserId,
    },
  });

  await db.bankAccount.update({
    where: {
      accountNumber: senderAccount,
    },
    data: {
      balance: senderBankAccount.balance - Number(amount),
    },
  });

  await db.bankAccount.update({
    where: {
      accountNumber: targetAccount,
    },
    data: {
      balance: targetBankAccount!.balance + Number(amount),
    },
  });

  return NextResponse.json("Transfer completed");
}
