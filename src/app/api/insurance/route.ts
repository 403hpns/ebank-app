import { db } from "<app>/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const login = searchParams.get("login");

  console.log(login);

  if (!login) {
    return NextResponse.json("Required data is not provided", { status: 404 });
  }

  const insurance = await db.insurance.findUnique({
    where: {
      ownerLogin: login,
    },
  });

  if (!insurance) {
    return NextResponse.json("Insurance not found", { status: 404 });
  }

  return NextResponse.json(insurance);
}

export async function PATCH(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const login = searchParams.get("login");

  console.log(login);

  if (!login) {
    return NextResponse.json("Required data is not provided", { status: 404 });
  }

  const body = await req.json();

  const updatedInsurance = await db.insurance.update({
    where: {
      ownerLogin: login,
    },
    data: {
      ...body,
    },
  });

  if (!updatedInsurance) {
    return NextResponse.json("An error has occurred while updating insurance", {
      status: 400,
    });
  }

  return NextResponse.json(updatedInsurance);
}
