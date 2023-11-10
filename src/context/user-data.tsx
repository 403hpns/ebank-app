"use client";

import {
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
} from "react";

type UserDataContext = {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
};

type UserData = {
  id: number;
  username: string;
};

export const UserDataContext = createContext<UserDataContext | null>(null);

type UserDataProviderProps = {
  children: ReactNode;
};

const UserDataProvider = ({ children }: UserDataProviderProps) => {
  const [userData, setUserData] = useState<UserData>({
    id: 1,
    username: "403hpns",
  });

  const context = {
    userData,
    setUserData,
  };

  return (
    <UserDataContext.Provider value={context}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
