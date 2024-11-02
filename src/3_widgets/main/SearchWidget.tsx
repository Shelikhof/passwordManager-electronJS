import Search from "@/4_features/main/Search";
import WhiteBox from "@/6_shared/wrappers/WhiteBox";

interface IProp {
  onSearch: (value: string) => void;
}

const SearchWidget: React.FC<IProp> = ({ onSearch }) => {
  return (
    <WhiteBox>
      <Search onSearch={onSearch} />
    </WhiteBox>
  );
};

export default SearchWidget;
