import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef } from "react";
import { merge } from "<app>/lib/utils";

const inputVariants = cva("", {
  variants: {
    variant: {
      default: "",
    },
  },
});

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  placeholder?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, placeholder, disabled, ...props }, ref) => {
    return (
      <input
        className={merge(inputVariants({ className, variant }))}
        ref={ref}
        {...props}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
