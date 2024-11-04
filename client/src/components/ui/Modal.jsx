import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import "../../css/modal.css";

const Modal = ({ isOpen, onClose, modalTitle, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='flex modal  fs-200 ' aria-label='modal'>
      <div className='modal-content'>
        <div className='modal-title flex'>
          <h1>{modalTitle}</h1>
          <span className='close' onClick={onClose}>
            <MdClose size={25} />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
