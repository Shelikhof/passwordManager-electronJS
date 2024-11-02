import React from "react";

interface IProp extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, IProp>(({ placeholder, ...props }, ref) => {
  return (
    <div className="h-full relative">
      <textarea ref={ref} className="peer resize-none transition-all px-5 pt-[22px] pb-3 h-full w-full rounded-lg outline-none border-purple-100 bg-purple-100 focus:bg-white border focus:border-black" {...props} placeholder="" />
      <span className="absolute pointer-events-none transition-all left-5 top-2 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[12px] peer-focus:top-2 peer-focus:text-xs peer-focus:text-black">{placeholder}</span>
    </div>
  );
});

export default Textarea;
