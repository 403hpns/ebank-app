import { MdCreditCard } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";

export enum PaymentType {
  card,
  cash,
}

interface TransactionProps {
  date: string;
  type: PaymentType;
  amount: number;
  title: string;
}

const Transaction: React.FC<TransactionProps> = ({
  date,
  type,
  amount,
  title,
}) => {
  return (
    <div className="p-4 flex w-full justify-between rounded-lg border-b cursor-pointer hover:bg-gray-100 ">
      <div className="flex items-center gap-2">
        {type === PaymentType.card ? <MdCreditCard /> : <FaRegMoneyBillAlt />}
        {date}
      </div>
      <div>{title}</div>
      <div
        className={`font-semibold ${
          amount.toString().startsWith("-") ? "text-red-500" : "text-green-600"
        }`}
      >
        ${amount}
      </div>
    </div>
  );
};

export default Transaction;
