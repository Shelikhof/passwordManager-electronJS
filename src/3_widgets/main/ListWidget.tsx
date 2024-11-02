import List from "@/4_features/main/List";
import WhiteBox from "@/6_shared/wrappers/WhiteBox";
import React from "react";

interface IItem {
  id: string;
  title: string;
}

interface IProps {
  items: IItem[];
}

const ListWidget: React.FC<IProps> = ({ items }) => {
  return (
    <WhiteBox>
      <List items={items} />
    </WhiteBox>
  );
};

export default ListWidget;
