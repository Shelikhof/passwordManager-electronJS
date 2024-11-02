import React from "react";
import { Link } from "react-router-dom";

interface IItem {
  id: string;
  title: string;
}

interface IProps {
  items: IItem[];
}

const List: React.FC<IProps> = ({ items }) => {
  console.log(items);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default List;

const Item: React.FC<IItem> = ({ id, title }) => {
  return (
    <Link to={`/${id}`}>
      <div className="group flex justify-between items-center py-1">
        <p>{title}</p>
        <div className="group-hover:translate-x-1 transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.2 10.49L13.23 8.51999L10.02 5.30999C9.33999 4.63999 8.17999 5.11999 8.17999 6.07999V12.31V17.92C8.17999 18.88 9.33999 19.36 10.02 18.68L15.2 13.5C16.03 12.68 16.03 11.32 15.2 10.49Z" fill="#292D32" />
          </svg>
        </div>
      </div>
    </Link>
  );
};
