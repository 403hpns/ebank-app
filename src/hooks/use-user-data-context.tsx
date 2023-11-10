"use client";

import { useContext } from "react";
import { UserDataContext } from "<app>/context/user-data";

const useUserDataContext = () => {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error(
      "useUserDataContext must be used within a UserDataContext!",
    );
  }

  return context;
};

export default useUserDataContext;
