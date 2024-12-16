"use client";

import Modal from "@components/project/Modal";
import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  open: (body: ReactNode) => void;
  close: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
  isOpen: boolean;
  body: ReactNode;
}

const defaultValues: ModalProps = {
  isOpen: false,
  body: null,
};

export function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalState, setModalState] = useState<ModalProps>(defaultValues);

  const open = (body: ReactNode) => {
    setModalState({
      isOpen: true,
      body,
    });
  };

  const close = () => {
    setModalState({
      isOpen: false,
      body: null,
    });
  };

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}

      {typeof window === "object" && (
        <Modal isOpen={modalState.isOpen} onClose={close}>
          {modalState.body}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("ModalContext 안에서 사용해주세요");
  }
  return context;
};
