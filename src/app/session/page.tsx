"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div>
      {session && <button onClick={() => signOut()}>Log out</button>}
      {!session && <button onClick={() => signIn()}>Login</button>}
      <p>Server session status: {status}</p>
      Server session result:
      {session?.user.login ? session.user.login : "Not logged"}
      <br />
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};

export default Page;
