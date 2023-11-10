import { merge } from "<app>/lib/utils";
import { ReactNode, HTMLAttributes } from "react";

interface TileProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
}

const Tile: React.FC<TileProps> = ({
  title,
  icon,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={merge(
        "flex w-max flex-col justify-center gap-2 rounded-lg p-8 shadow-md hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      <h2
        className={`${
          children && "border-b"
        }, text-md flex flex-row items-center gap-1 font-semibold tracking-wide`}
      >
        {icon}
        {title}
      </h2>
      {children && children}
    </div>
  );
};

export default Tile;
