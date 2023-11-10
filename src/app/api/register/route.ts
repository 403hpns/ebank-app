import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { db } from "<app>/lib/db";
import { RegisterFormSchema, registerSchema } from "<app>/lib/schemas";

export async function POST(request: NextRequest) {
  const { login, email, password, confirmPassword }: RegisterFormSchema =
    await request.json();

  if (!login || !email || !password) {
    return new NextResponse("Missing credentials", { status: 400 });
  }

  const user = await db.user.findUnique({
    where: {
      login: login,
    },
  });

  if (user) {
    return new NextResponse("User already exists", {
      status: 400,
      statusText: "User with given name or e-mail already exists",
    });
  }

  const findByEmail = await db.user.findUnique({
    where: { email: email },
  });

  if (findByEmail) {
    return new NextResponse("User already exists", {
      status: 400,
      statusText: "User with given name or e-mail already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      login,
      email,
      password: hashedPassword,
    },
  });

  // Add new disabled insurence to every user
  const newInsurence = await db.insurance.create({
    data: {
      ownerLogin: login,
      carInsurance: false,
      lifeInsurance: false,
    },
  });

  const { password: userPassword, ...restData } = newUser;

  return NextResponse.json(restData);
}
