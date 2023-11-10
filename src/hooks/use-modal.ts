"use client";

import { useState, useEffect } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    isModalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isModalOpen]);

  const toggle = () => setIsModalOpen((prev) => !prev);

  return {
    isModalOpen,
    toggle,
  };
};

export default useModal;
