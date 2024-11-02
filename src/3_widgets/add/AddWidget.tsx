import PasswordForm from "@/4_features/PasswordForm";
import PasswordService from "@/5_entities/PasswordService";
import { IFormData } from "@/6_shared/utils/interfaces";
import WhiteBox from "@/6_shared/wrappers/WhiteBox";
import { Link, useNavigate } from "react-router-dom";

const AddWidget = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: IFormData) => {
    console.log(data);

    const res = await PasswordService.add(data);
    if (res === "OK") navigate("/");
  };

  return (
    <WhiteBox>
      <div className="flex items-center gap-5 mb-5">
        <Link to={"/"}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:-translate-x-1 transition-all">
            <g clipPath="url(#clip0_3_299)">
              <path d="M7.828 11H20V13H7.828L13.192 18.364L11.778 19.778L4 12L11.778 4.222L13.192 5.636L7.828 11Z" fill="#1A1A1A" />
            </g>
            <defs>
              <clipPath id="clip0_3_299">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
        <h1 className="text-2xl font-semibold">Добавить пароль</h1>
      </div>
      <PasswordForm onSubmit={onSubmit} />
    </WhiteBox>
  );
};

export default AddWidget;
