import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

interface IProp extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined;
}

const Input = React.forwardRef<HTMLInputElement, IProp>(({ error, placeholder, ...props }, ref) => {
  const classes = cva("peer transition-all px-5 pt-[28px] pb-3 h-[50px] w-full rounded-lg outline-none", {
    variants: {
      variant: {
        default: "border-purple-100 bg-purple-100 focus:bg-white border focus:border-black",
        error: "bg-red-50 border-red-50 focus:bg-red-50 focus:border-red-50",
      },
    },
  });

  return (
    <div className="relative">
      <input className={cn(classes({ variant: error ? "error" : "default" }))} ref={ref} placeholder="" {...props} />
      <span className="absolute pointer-events-none transition-all left-5 top-2 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[12px] peer-focus:top-2 peer-focus:text-xs peer-focus:text-black">{placeholder}</span>
      {error && <span className="absolute bottom-[-20px] left-5 text-sm text-red-500">{error}</span>}
    </div>
  );
});

export default Input;
