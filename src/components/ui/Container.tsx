import { HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { merge } from "<app>/lib/utils";

const containerVariants = cva("flex flex-col align-center", {
  variants: {
    variant: { default: "" },
    size: { default: "" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

interface ContainerProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  children: React.ReactNode;
  center?: boolean;
}

const Container: React.FC<ContainerProps> = forwardRef<
  HTMLElement,
  ContainerProps
>(({ className, variant, children, center, ...props }, ref) => {
  return (
    <section
      className={merge(
        containerVariants({ className, variant }),
        `${center && "m-auto"} mx-4`,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </section>
  );
});

Container.displayName = "Container";
export default Container;
