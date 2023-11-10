"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn, useSession } from "next-auth/react";

import Button from "../ui/Button";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import Link from "next/link";
import { LoginFormSchema, loginFormSchema } from "<app>/lib/schemas";

const LoginForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormSchema) => {
    const res = await signIn("credentials", {
      login: data.login,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Incorrent login or password");
    } else {
      toast.success("Successfully logged in");
      router.push("/dashboard");
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
        autoComplete="off"
        name="login"
        placeholder="Login"
        className="rounded p-2 outline-none"
      />
      {errors.login && (
        <p className="break-all text-red-500">{errors.login.message}</p>
      )}
      <input
        {...register("password")}
        type="password"
        name="password"
        placeholder="Password"
        className="rounded p-2 outline-none"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <Link href="/register" className="hover:underline">
        Create new account
      </Link>

      <Button isLoading={isSubmitting}>Login</Button>
      <Link href="/">
        <Button className="w-full" type="button" variant="unstyled">
          Back
        </Button>
      </Link>
    </form>
  );
};

export default LoginForm;
