import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

interface IProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantProps<typeof classes>["variant"];
}

const classes = cva("transition-all font-semibold text-sm h-9 w-full rounded-lg", {
  variants: {
    variant: {
      default: "bg-purple-200 text-white hover:bg-purple-300",
      outline: "border-purple-200 border-2 text-purple-200 hover:text-purple-300 hover:border-purple-300",
    },
  },
});

const Button: React.FC<IProp> = ({ children, variant = "default", ...props }) => {
  return (
    <button className={cn(classes({ variant }))} {...props}>
      {children}
    </button>
  );
};

export default Button;
