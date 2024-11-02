import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const Center: React.FC<IProps> = ({ children }) => {
  return <div className="max-w-[650px] m-auto">{children}</div>;
};

export default Center;
