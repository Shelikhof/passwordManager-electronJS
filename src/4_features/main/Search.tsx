import Button from "@/6_shared/ui/Button";
import SearchBar from "@/6_shared/ui/SearchBar";
import { Link } from "react-router-dom";

interface IProp {
  onSearch: (value: string) => void;
}

const Search: React.FC<IProp> = ({ onSearch }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold ">Пароли</h1>
        <div className="w-[130px]">
          <Link to="/add">
            <Button>Добавить</Button>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <SearchBar onSearch={onSearch} placeholder="Поиск паролей" />
      </div>
    </>
  );
};

export default Search;
