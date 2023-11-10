import Link from "next/link";
import { db } from "<app>/lib/db";
import { authOptions } from "<app>/lib/auth";
import { getServerSession } from "next-auth";

import {
  MdOutlineAttachMoney,
  MdOutlineAccountBalance,
  MdCreditCard,
} from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { VscHistory } from "react-icons/vsc";

import { PaymentType } from "<app>/components/Transaction";

import Transaction from "<app>/components/Transaction";
import Tile from "<app>/components/Tile";
import Button from "<app>/components/ui/Button";
import Loader from "<app>/components/Loader";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <Loader />;
  }

  const transferDetails = await db.transfers.findMany({
    where: {
      OR: [
        { senderUserId: +session.user.id },
        { targetUserId: +session.user.id },
      ],
    },
  });

  const data = await db.user.findUnique({
    where: {
      id: +session?.user.id,
    },

    select: {
      bankAccounts: true,
      cards: true,
      loans: true,
    },
  });

  return (
    <div className="flex flex-col gap-4 p-2">
      {/* Heading */}
      <div className="border-b">
        <h2 className="text-md my-1 text-center font-semibold">Dashboard</h2>
      </div>

      <div className="flex flex-wrap gap-12 2xl:gap-2">
        <div className="flex h-max flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <Tile
              title="Total balance"
              icon={<MdOutlineAttachMoney size={19} />}
            >
              $
              {data?.bankAccounts &&
                data?.bankAccounts?.reduce(
                  (acc: any, obj: any) => acc + obj.balance! || 0,
                  0,
                )}
            </Tile>
            <Tile title="Total loans value" className="">
              $
              {(data?.loans &&
                data?.loans?.reduce(
                  (acc: any, obj: any) => acc + obj.amount,
                  0,
                )) ||
                0}
            </Tile>
            <Tile
              title="Total accounts"
              icon={<MdOutlineAccountBalance size={19} />}
              className=""
            >
              <p>{data?.bankAccounts?.length || 0}</p>
            </Tile>
            <Tile
              title="Total cards"
              icon={<MdCreditCard size={19} />}
              className=""
            >
              <p>{data?.cards?.length || 0}</p>
            </Tile>
          </div>

          <div className="flex flex-1 flex-wrap items-center  gap-2">
            <Button href="dashboard/transfers/new" variant="unstyled">
              <BiTransfer /> Make new transfer
            </Button>
            <Button href="dashboard/transfers" variant="unstyled">
              <VscHistory /> Transfers history
            </Button>
          </div>
        </div>
        <div className="flex min-h-full flex-1 flex-col items-center gap-8">
          <h2 className="font-semibold">Last transfers</h2>
          <div className="flex max-h-[200px] min-w-full flex-col items-center gap-2 overflow-y-auto ">
            {Array.isArray(transferDetails) && transferDetails.length ? (
              <>
                {transferDetails.map((transaction: any) => {
                  return (
                    <Transaction
                      key={transaction.id}
                      type={PaymentType.card}
                      amount={transaction.amount}
                      date="21.06.2023"
                      title={transaction.title}
                    />
                  );
                })}
              </>
            ) : (
              <p>No transactions</p>
            )}
          </div>
          {Array.isArray(transferDetails) && transferDetails.length ? (
            <>
              <Link href="/dashboard/transfers">
                <Button variant="unstyled">
                  <VscHistory />
                  See all transactions
                </Button>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default page;
