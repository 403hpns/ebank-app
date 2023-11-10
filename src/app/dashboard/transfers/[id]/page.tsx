import Loader from "<app>/components/Loader";
import { authOptions } from "<app>/lib/auth";
import { db } from "<app>/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
};

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <Loader />;
  }

  const transferDetails = await db.transfers.findFirst({
    where: {
      id: 1,
      senderUserId: +session?.user.id,
      targetUserId: +session?.user.id,
    },
  });

  if (!transferDetails) {
    return notFound();
  }

  return <div>{id}</div>;
};

export default page;
