import Image from "next/image";

import Container from "../components/ui/Container";
import Nav from "<app>/components/nav/Nav";
import Button from "<app>/components/ui/Button";

// import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Nav />

      <div>
        <header
          className="
        mx-auto
        my-24
      flex
      flex-row
      justify-center
      gap-24"
        >
          <div className="flex max-w-[500px] flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-semibold uppercase text-[#0cbc8b]">
                Choose the best e-banking on the planet!
              </h1>
              <h2 className="text-xl">
                Don&apos;t lose your money,{" "}
                <span className="font-semibold">expand them</span>. Don&apos;t
                waste your time, <span className="font-semibold">gain it</span>.
                Join to the <span className="font-semibold">fastest</span> and{" "}
                <span className="font-semibold">the highest secured</span> bank
                ever. Choose e-Bank!
              </h2>
            </div>

            <div>
              <div className="flex flex-row items-center justify-center gap-4">
                <div className="rounded-xl border border-[#53cfad] bg-[#0cbc8b]/100 px-4 py-2 text-white">
                  1
                </div>
                <p>
                  Create your own account without going outside. You can do it
                  from your home!
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="rounded-xl border border-[#53cfad] bg-[#0cbc8b]/100 px-4 py-2 text-white">
                2
              </div>
              <p>
                Wait for verification from our side. It takes only a few
                minutes.
              </p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="rounded-xl border border-[#53cfad] bg-[#0cbc8b]/100 px-4 py-2 text-white">
                3
              </div>
              <p>
                Well done! You can use e-Bank now! Create a virtual card via
                Dashboard or order the credit card straight to your home.
              </p>
            </div>

            <Link href="/register">
              <Button className="w-full">I want to open an account!</Button>
            </Link>
          </div>

          <Image src="/header.svg" alt="" width={800} height={800} />
        </header>
      </div>
      <div>In-progress </div>
    </Container>
  );
}
