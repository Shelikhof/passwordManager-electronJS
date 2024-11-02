import ListWidget from "@/3_widgets/main/ListWidget";
import SearchWidget from "@/3_widgets/main/SearchWidget";
import PasswordService from "@/5_entities/PasswordService";
import { IItem } from "@/6_shared/utils/interfaces";
import Center from "@/6_shared/wrappers/Center";
import React from "react";

const Main = () => {
  const [passwords, setPasswords] = React.useState<IItem[] | null>(null);

  const onSearch = (searchValue: string) => {
    PasswordService.search(searchValue).then((data) => {
      setPasswords(data);
    });
  };

  React.useEffect(() => {
    PasswordService.getAll().then((data) => {
      setPasswords(data);
    });
  }, []);

  return (
    <Center>
      <SearchWidget onSearch={onSearch} />
      {passwords && passwords?.length > 0 && (
        <div className="mt-6">
          <ListWidget items={passwords} />
        </div>
      )}
    </Center>
  );
};

export default Main;
