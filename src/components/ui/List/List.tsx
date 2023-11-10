import React, { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { ListItemProps } from "./ListItem";
import { merge } from "<app>/lib/utils";

const listVariants = cva("flex flex-col justify-center my-6", {
  variants: { variant: { default: "" } },
});

interface ListProps extends VariantProps<typeof listVariants> {
  children: React.ReactNode | React.ReactNode[];
}

const List: React.FC<ListProps> = forwardRef<HTMLUListElement, ListProps>(
  ({ children, variant, ...props }, ref) => {
    return (
      <ul ref={ref} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement<ListItemProps>(child)) {
            return React.cloneElement(child, {
              key: child.key,
              className: `${merge(listVariants({ variant }))}`,
            });
          }
        })}
      </ul>
    );
  },
);

List.displayName = "List";
export default List;
