import { NextRequest, NextResponse } from "next/server";
import { db } from "<app>/lib/db";
import { verifyJwt } from "<app>/lib/jwt";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const accessToken = req.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    return new NextResponse(
      JSON.stringify({
        error: "Unauthorized access!",
      }),
      { status: 401 },
    );
  }

  const userId: number = +params.id;

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  // Get user data from database
  const bankAccounts = await db.bankAccount.findMany({
    where: { ownerId: userId },
  });
  const creditCards = await db.cards.findMany({
    where: {},
  });
  const userLoans = await db.loans.findMany({
    where: { borrowerId: userId },
  });
  const userTransactions = await db.transfers.findMany({
    where: { senderUserId: +userId },
  });

  return NextResponse.json({
    bankAccounts,
    creditCards,
    userLoans,
    userTransactions,
  });
}
