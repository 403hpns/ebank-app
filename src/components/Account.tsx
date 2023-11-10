import Link from "next/link";

interface AccountProps {
  name: string;
  accountNumber: string;
  balance: number;
}

const Account: React.FC<AccountProps> = ({ name, accountNumber, balance }) => {
  return (
    <Link
      href={`/dashboard/accounts/${accountNumber}`}
      className="mx-2 flex w-full cursor-pointer items-center justify-center rounded-lg border-b p-2.5 hover:bg-gray-100"
    >
      <div className="w-[20%]">{name}</div>
      <div className=" flex-1 text-center">{accountNumber}</div>
      <div
        className={`${
          balance.toString().startsWith("-") ? "text-red-500" : "text-green-500"
        }
        w-[20%]  text-end font-semibold
        `}
      >
        ${balance}
      </div>
    </Link>
  );
};

export default Account;
