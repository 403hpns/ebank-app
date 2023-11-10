type CardProps = {
  cardName: string;
  cardNumber: string;
  cardCCV: string;
  expiresDate: string;
  cardColor: "black" | "blue" | "purple";
  className?: string;
  isBlocked?: boolean;
};

export const Card = ({
  cardName,
  cardNumber,
  cardCCV,
  expiresDate,
  cardColor,
  className,
  isBlocked,
}: CardProps) => {
  const getCardColor = () => {
    switch (cardColor) {
      case "purple":
        return "purple-card-gradient";
      case "blue":
        return "blue-card-gradient";
      case "black":
        return "black-card-gradient";
      default:
        break;
    }
  };

  return (
    <div
      className={`${getCardColor()} relative flex h-max w-max min-w-[400px] select-none flex-col justify-center gap-6 rounded-lg px-12 py-4 tracking-wide text-white shadow-2xl  ${className} `}
    >
      <p className="font-semibold uppercase">
        {cardName ? cardName : "e-Bank Card"}
      </p>
      <span className="flex flex-col">
        <p>Card number</p>
        <p className="font-semibold">{cardNumber}</p>
      </span>
      <div className="flex items-center gap-8">
        <span className="flex flex-col">
          <p>Expiry date</p>
          <p className="font-semibold">{expiresDate}</p>
        </span>
        <span className="flex flex-col">
          <p>CCV</p>
          <p className="font-semibold">{cardCCV}</p>
        </span>
      </div>
      <p className="self-end text-2xl font-black">e-Bank</p>
      {isBlocked && (
        <span className="absolute -bottom-4 left-4 rounded-lg bg-red-500 p-2">
          Card is blocked
        </span>
      )}
    </div>
  );
};

export default Card;
