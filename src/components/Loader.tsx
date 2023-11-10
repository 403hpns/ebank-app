"use client";

import { FaSpinner } from "react-icons/fa";
import { CgSpinnerTwo } from "react-icons/cg";
import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="m-auto flex items-center justify-center self-center">
      <ImSpinner2 className="animate-spin text-4xl" />
    </div>
  );
};

export default Loader;
