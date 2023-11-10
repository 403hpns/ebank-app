"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { merge } from "<app>/lib/utils";
import { useRouter } from "next/navigation";

const buttonVariants = cva("flex flex-row justify-center items-center gap-2", {
  variants: {
    variant: {
      default:
        " p-4 rounded-lg hover:font-semibold text-white bg-[#0cbc8b] relative transition border-pulse",
      unstyled: "p-4 rounded-lg shadow-md hover:bg-neutral-100 transition",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  href?: string;
}

const Button: React.FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    { onClick, href, className, variant, size, isLoading, children, ...props },
    ref,
  ) => {
    const router = useRouter();

    return (
      <button
        className={merge(buttonVariants({ className, variant, size }))}
        ref={ref}
        {...props}
        onClick={href ? () => router.push(href) : onClick}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
