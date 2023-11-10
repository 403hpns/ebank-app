"use client";

import Button from "<app>/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-2">
      <h2 className="w-2/3 break-words text-center">
        We can&apos;t find an account with given number or you don&apos;t have
        permissions to do it.
      </h2>
      <Link href="/dashboard/accounts">
        <Button variant="unstyled">Return</Button>
      </Link>
    </div>
  );
}
