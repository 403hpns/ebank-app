"use client";

import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from "@tanstack/react-query";

type QueryClientProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
};

export default QueryClientProvider;
