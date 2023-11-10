import { db } from "<app>/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.searchParams);
  const accountParam = searchParams.get("account");

  if (!accountParam) {
    return NextResponse.json(
      "An error occurend while getting user with this ID. Please try again.",
    );
  }

  const borrowerData = await db.loans.findUnique({
    where: {
      targetBankAccountNumber: accountParam,
    },
  });

  if (!borrowerData) {
    return NextResponse.json("Coś poszło nie tak.", { status: 400 });
  }

  return NextResponse.json(borrowerData, { status: 200 });
}

//
//
//
//
//
//
export async function POST(req: NextRequest) {
  const { bankAccount, loanAmount, borrowerId } = await req.json();

  const newLoan = await db.loans.create({
    data: {
      amount: loanAmount,
      borrowerId: +borrowerId,
      targetBankAccountNumber: bankAccount,
    },
  });

  if (!newLoan) {
    return NextResponse.json(
      "An error occured while creating new loan. Please try again.",
    );
  }

  const updatedBalance = await db.bankAccount.update({
    where: {
      accountNumber: bankAccount,
    },
    data: {
      balance: {
        increment: loanAmount,
      },
    },
  });

  if (!updatedBalance) {
    return NextResponse.json(
      "An error occured while creating new loan. Please try again.",
    );
  }

  return NextResponse.json(newLoan);
}
