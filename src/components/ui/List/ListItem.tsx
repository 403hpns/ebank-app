import { merge } from "<app>/lib/utils";
import Link from "next/link";
import { LiHTMLAttributes, forwardRef } from "react";

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = forwardRef<
  HTMLLIElement,
  ListItemProps
>(({ className, label, href, icon, ...props }, ref) => {
  return (
    <Link href={href}>
      <li
        ref={ref}
        {...props}
        className={merge(
          "py-2 px-6 flex items-center gap-2 rounded-lg hover:bg-neutral-200/50 hover:font-semibold",
          className
        )}
      >
        {icon && icon}
        {label}
      </li>
    </Link>
  );
});

ListItem.displayName = "ListItem";
export default ListItem;
