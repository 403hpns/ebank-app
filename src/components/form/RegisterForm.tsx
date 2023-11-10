"use client";

import Button from "../ui/Button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "<app>/lib/db";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { RegisterFormSchema, registerSchema } from "<app>/lib/schemas";

const RegisterForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: RegisterFormSchema) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: formData.login,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        toast.error(`${response.statusText}`);
        return null;
      }

      toast.success("Successfully registered");

      await signIn("credentials", {
        login: formData.login,
        password: formData.password,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[300px] flex-col gap-4 rounded-lg bg-primary p-6"
    >
      <input
        {...register("login")}
        type="text"
        placeholder="Login"
        className={`rounded p-2 outline-none ${
          errors.login ? "border-2 border-red-500" : "border-none"
        }`}
      />
      {errors.login && <p className="text-red-500">{errors.login.message}</p>}
      <input
        {...register("email")}
        type="email"
        placeholder="E-mail"
        className={`rounded p-2 outline-none  ${
          errors.email ? "border border-red-500" : "border-none"
        }`}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className={`rounded p-2 outline-none  ${
          errors.password ? "border border-red-500" : "border-none"
        }`}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm password"
        className={`rounded p-2 outline-none  ${
          errors.confirmPassword ? "border border-red-500" : "border-none"
        }`}
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword.message}</p>
      )}

      <Link href="/login" className="hover:underline">
        I already have an account
      </Link>

      <Button type="submit">Next</Button>
      <Link href="/login">
        <Button className="w-full" type="button" variant="unstyled">
          Back
        </Button>
      </Link>
    </form>
  );
};

export default RegisterForm;
