import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { db } from "<app>/lib/db";

export async function POST(req: NextRequest): Promise<any> {
  const body = await req.json();
  const { userId, accountName } = body;

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      bankAccounts: true,
    },
  });

  if (!user) {
    return null;
  }

  if (user.bankAccounts.length === 7) {
    return new Response("Sorry, but you can only have 7 accounts!", {
      status: 405,
    });
    // return new NextResponse("Sorry, but you can only have 7 accounts!", {
    //   status: 405,
    // });
  }

  const newAccountNumber = await generateAccountNumber(26, userId);

  const newAccount = await db.bankAccount.create({
    data: {
      ownerId: userId,
      accountNumber: newAccountNumber,
      accountName: accountName,
    },
  });

  // dorobić że się tworzy loan z false

  return new Response("OK");
}

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const userId = searchParams.get("userId")!;
  const getAll = searchParams.get("getAll"); // Only if we want to retrieve all accounts

  if (getAll === "true") {
    const allBankAccounts = await db.bankAccount.findMany();
    return NextResponse.json(allBankAccounts);
  }

  const bankAccounts = await db.bankAccount
    .findMany({
      where: {
        ownerId: +userId,
      },
    })
    .finally(() => db.$disconnect);

  if (!bankAccounts) {
    return NextResponse.json("Ni mo");
  }

  return NextResponse.json(bankAccounts);
}

async function generateAccountNumber(length: number, userId: number) {
  const buffer = randomBytes(Math.ceil(length / 2));
  const randomNumberString = buffer.toString("hex").slice(0, length);

  return randomNumberString + userId;
}
