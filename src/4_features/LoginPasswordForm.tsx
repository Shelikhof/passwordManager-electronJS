import Input from "@/6_shared/ui/Input";
import InputPassword from "@/6_shared/ui/InputPassword";
import { loginData } from "@/6_shared/utils/interfaces";
import React from "react";

interface IProps {
  value: loginData[];
  onChange: (value: loginData[]) => void;
}

const LoginPasswordForm: React.FC<IProps> = ({ onChange, value }) => {
  const [data, setData] = React.useState(value);

  const onChangeHandler = (index: number, value: loginData) => {
    data[index] = value;
    setData(data);
    onChange(data);
  };

  const onAddHandler = () => {
    data.push({ login: "", password: "" });
    setData(data);
    onChange(data);
  };

  const onDeleteHandler = (index: number) => {
    data.splice(index, 1);
    setData(data);
    onChange(data);
  };

  return (
    <div className="flex flex-col gap-3">
      {data.map((item, index) => (
        <div key={index}>
          <Item key={index} loginData={item} onChangeHandler={(value) => onChangeHandler(index, value)} />
          <div className="flex gap-2 ml-5">
            {data.length > 1 && (
              <button className="text-sm font-semibold" type="button" onClick={() => onDeleteHandler(index)}>
                Удалить
              </button>
            )}
            {index === data.length - 1 && (
              <button className="text-sm font-semibold" type="button" onClick={onAddHandler}>
                Добавить
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

interface IItemProps {
  loginData: loginData;
  onChangeHandler: (value: loginData) => void;
}

const Item: React.FC<IItemProps> = ({ loginData, onChangeHandler }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-5">
    <Input value={loginData.login} onChange={(e) => onChangeHandler({ login: e.target.value, password: loginData.password })} placeholder="Логин" />
    <InputPassword value={loginData.password} onChange={(e) => onChangeHandler({ login: loginData.login, password: e.target.value })} placeholder="Пароль" />
  </div>
);

export default LoginPasswordForm;
