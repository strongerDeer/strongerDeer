import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="modal">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 50,
            rotateX: -15,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            transition: {
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.4,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: -30,
            rotateX: 15,
            transition: {
              duration: 0.3,
            },
          }}
          className="container"
        >
          {children}
          <button className="btn-close" type="button" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </motion.div>

        {/* dim */}
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(5px)",
            transition: { duration: 0.3 },
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
            transition: { duration: 0.3 },
          }}
          className="dim"
          onClick={onClose}
        />
      </div>
    </AnimatePresence>,
    document.body
  );
}
