import Loader from "<app>/components/Loader";
import Tile from "<app>/components/Tile";
import Button from "<app>/components/ui/Button";
import { authOptions } from "<app>/lib/auth";
import { db } from "<app>/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineNumbers } from "react-icons/md";

type PageProps = {
  params: { id: string };
};

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const data = await getServerSession(authOptions);

  if (!data?.user) {
    return <Loader />;
  }

  const bankAccountDetails = await db.bankAccount.findUnique({
    where: {
      accountNumber: id,
      ownerId: +data?.user.id,
    },

    include: {
      cards: true,
    },
  });

  if (!bankAccountDetails) {
    return notFound();
  }

  console.log(bankAccountDetails);

  return (
    <div className="mx-6 flex w-full flex-col">
      <div className="flex flex-col border-b py-2  leading-none">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/accounts" className="mr-auto">
            <Button
              variant="unstyled"
              className="my-2 flex items-center gap-2 rounded border"
            >
              <BsArrowRight className="rotate-180" /> Back
            </Button>
          </Link>
          <div className="mr-auto flex items-center gap-2">
            <p>Account details for</p>
            <div className="flex">
              <MdOutlineNumbers className="text-lg font-black" />
              <p className="cursor-pointer hover:font-semibold">{id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Tile title="Name">{bankAccountDetails.accountName}</Tile>
        <Tile title="Account ID">{bankAccountDetails.accountNumber}</Tile>
        <Tile title="Balance">${bankAccountDetails.balance}</Tile>
        <Tile title="Cards">{bankAccountDetails.cards?.length}</Tile>
      </div>
    </div>
  );
};

export default page;
