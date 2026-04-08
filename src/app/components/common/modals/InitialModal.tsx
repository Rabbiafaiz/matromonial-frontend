import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "../allImages/AllImages";
import Image from "next/image";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const GlobalModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          ></motion.div>

          {/* Modal content */}
          <motion.div
            className="relative bg-white rounded-2xl p-6 max-w-md w-full z-10 shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-between border-b border-gray pb-3">
              {/* Modal Header */}
              <h2 className="text-lg font-bold text-center text-gray-800">
                {title}
              </h2>
              {/* Close button */}
              <button
                onClick={onClose}
                className=" top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4 text-gray-600">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlobalModal;
