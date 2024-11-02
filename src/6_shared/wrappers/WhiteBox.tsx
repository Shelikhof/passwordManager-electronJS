import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const WhiteBox: React.FC<IProps> = ({ children }) => {
  return <div className="p-5 bg-white rounded-[20px]">{children}</div>;
};

export default WhiteBox;
