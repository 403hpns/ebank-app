import { AiOutlineClose } from "react-icons/ai";
import Button from "./ui/Button";
import { BiBlock } from "react-icons/bi";

export const CardToolbar = ({
  isBlocked,
  isClosed,
  onCloseButtonClick,
  onBlockButtonClick,
  className,
}: {
  isBlocked?: boolean;
  isClosed?: boolean;
  onCloseButtonClick?: () => void;
  onBlockButtonClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`my-6 flex select-none items-center justify-center gap-2 ${className}`}
    >
      <Button
        variant="unstyled"
        onClick={onBlockButtonClick}
        className={`${
          isBlocked ? "bg-red-500 text-white" : ""
        } hover:bg-red-600 hover:text-white`}
      >
        <BiBlock /> {isBlocked ? "Unblock" : "Block"}
      </Button>

      <Button
        onClick={onCloseButtonClick}
        variant="unstyled"
        className="  hover:bg-red-500"
      >
        <AiOutlineClose /> Close card
      </Button>
    </div>
  );
};

export default CardToolbar;
