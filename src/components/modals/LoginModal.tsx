"use client";

import { useState } from "react";

import LoginForm from "<app>/components/form/LoginForm";
import RegisterForm from "<app>/components/form/RegisterForm";

enum LoginPages {
  Login,
  Register,
}

type LoginModalProps = {};

const LoginModal = () => {
  const [currentPage, setCurrentPage] = useState<LoginPages>(LoginPages.Login);

  return (
    <div className="flex flex-col gap-6">
      <ul className="flex justify-center items-center gap-4">
        <li
          className="cursor-pointer transition hover:font-semibold"
          onClick={() => setCurrentPage(LoginPages.Login)}
        >
          Login
        </li>
        <li
          className="cursor-pointer transition hover:font-semibold"
          onClick={() => setCurrentPage(LoginPages.Register)}
        >
          Register
        </li>
      </ul>
      {currentPage === LoginPages.Login ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default LoginModal;
