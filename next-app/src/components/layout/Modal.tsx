interface Props {
  className?: string;
  modalFlg: boolean;
  setModalFlg: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export function Modal({ className, modalFlg, setModalFlg, children }: Props) {
  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center ${modalFlg || "hidden"}`}
    >
      <div
        className="absolute inset-0 bg-text opacity-60"
        onClick={() => setModalFlg(false)}
      ></div>
      <div
        className={`relative z-50 bg-white p-4 lg:p-8 rounded-lg w-full h-[600px] overflow-auto mx-8 lg:mx-20 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
