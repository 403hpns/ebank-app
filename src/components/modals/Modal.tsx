import ReactDOM from "react-dom";
import Button from "../ui/Button";

import { ReactNode } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
type ModalProps = {
  isModalOpen: boolean;
  title?: string;
  body: ReactNode;
  onClose: () => void;
};

const Modal = ({ isModalOpen, title, body, onClose }: ModalProps) =>
  isModalOpen
    ? ReactDOM.createPortal(
        <>
          <div className="absolute inset-0 w-full h-screen flex flex-col justify-center items-center backdrop-blur-md z-50">
            <div className="w-[300px] p-6 rounded bg-primary">
              <div className="flex justify-end">
                {title && <h5 className="text-center">{title}</h5>}
                <AiFillCloseCircle
                  onClick={onClose}
                  className="text-xl cursor-pointer text-black"
                />
              </div>

              {body}
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default Modal;
