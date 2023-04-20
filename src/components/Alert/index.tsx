import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Check, WarningOctagon, Warning, Info, X } from "@phosphor-icons/react";

export type AlertType = "success" | "error" | "warning" | "info";
export type AlertAnimation = "default" | "elevator";

export interface AlertProps {
  fatherRef?: React.RefObject<HTMLUListElement>;
  id?: string;
  message: string;
  title: string;
  type?: AlertType;
  onRemove?: () => void;
  date: Date;
  animation?: "default" | "elevator";
  className?: string;
}

export function Alert({
  fatherRef,
  id = "",
  message,
  title,
  type = "success",
  onRemove,
  date,
  animation = "default",
  className,
}: AlertProps) {
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     onRemove && onRemove();
  //   }, 2500);

  //   return () => clearTimeout(timeout);
  // })

  const fatherHeight = fatherRef!.current!.getBoundingClientRect().height;
  const fatherLength = fatherRef!.current!.children.length;
  const childrenHeight =
    fatherRef!.current!.children[0]?.getBoundingClientRect().height;

  const alertDefault = {
    initial: { opacity: 0, y: -100, scale: 0.5, transition: { duration: 0.5 } },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    exit: {
      opacity: 1,
      y: childrenHeight * fatherLength,
      scale: 1,
      transition: { duration: 0.75 },
    },
  };

  const aux = fatherLength > 5 ? (fatherLength - 3) * childrenHeight : 0;

  const yElevator = fatherHeight - childrenHeight - aux;

  const alertElevator = {
    initial: {
      opacity: 0.25,
      y: yElevator,
      transition: { duration: 0.75 },
      zIndex: 1000,
    },
    animate: { opacity: 1, y: 0, transition: { duration: 0.75 }, zIndex: 1000 },
    exit: {
      opacity: 1,
      y: 0,
      scale: 0.5,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AnimatePresence onExitComplete={() => onRemove && onRemove()}>
      <motion.li
        variants={animation === "default" ? alertDefault : alertElevator}
        initial="initial"
        animate="animate"
        className={clsx(
          "flex items-center rounded min-w-[400px] overflow-hidden relative",
          {
            "bg-green-100 text-green-800": type === "success",
            "bg-red-100 text-red-800": type === "error",
            "bg-yellow-100 text-yellow-800": type === "warning",
            "bg-blue-100 text-blue-800": type === "info",
          },
          className
        )}
      >
        <div
          className={clsx("h-full w-1.5 rounded-tl rounded-bl", {
            "bg-green-600": type === "success",
            "bg-red-600": type === "error",
            "bg-yellow-600": type === "warning",
            "bg-blue-600": type === "info",
          })}
        />
        <div className="p-4 flex items-center gap-4 flex-1">
          <div className="flex items-center justify-center w-12 h-12 rounded-full">
            {type === "success" && (
              <Check size={24} weight="bold" className="text-green-600" />
            )}
            {type === "error" && (
              <WarningOctagon
                size={24}
                weight="bold"
                className="text-red-600"
              />
            )}
            {type === "warning" && (
              <Warning size={24} weight="bold" className="text-yellow-600" />
            )}
            {type === "info" && (
              <Info size={24} weight="bold" className="text-blue-600" />
            )}
          </div>
          <div className="flex flex-col flex-1 gap-1 ">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm">{message}</p>
          </div>
        </div>

        <button
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-500 transition duration-500"
          aria-label="Close"
        >
          <X size={16} weight="bold" onClick={onRemove} />
        </button>

        {date && (
          <div className="absolute right-2 bottom-2 flex items-center gap-2 text-xs text-gray-500">
            <span>{date.toLocaleDateString()}</span>
            <span>{date.toLocaleTimeString()}</span>
          </div>
        )}
      </motion.li>
    </AnimatePresence>
  );
}
