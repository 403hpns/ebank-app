"use client";

import { ReactNode } from "react";

import AuthSessionProvider from "../context/SessionAuthProvider";
import QueryClientProvider from "./QueryClientProvider";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return <QueryClientProvider>{children}</QueryClientProvider>;
};

export default Providers;
