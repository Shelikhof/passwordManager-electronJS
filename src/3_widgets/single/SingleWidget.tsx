import PasswordForm from "@/4_features/PasswordForm";
import PasswordService from "@/5_entities/PasswordService";
import { IFormData } from "@/6_shared/utils/interfaces";
import WhiteBox from "@/6_shared/wrappers/WhiteBox";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SingleWidget = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<IFormData | null>(null);
  const navigate = useNavigate();

  const getData = async () => {
    PasswordService.getOne(id || "").then((data) => {
      setData(data);
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const onDelete = async () => {
    const res = await PasswordService.delete(id || "");
    if (res === "OK") navigate("/");
  };

  const onSubmit = async (data: IFormData) => {
    const res = await PasswordService.update(id || "", data);
    if (res === "OK") getData();
  };

  const onSave = async () => {
    const res = await PasswordService.saveInFile(id || "");
    console.log(res);
  };

  return (
    <WhiteBox>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-5 ">
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
          <h1 className="text-2xl font-semibold">{data ? data.title : ""}</h1>
        </div>

        <button onClick={onDelete}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4H20V6H18V19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V6H0V4H5V1C5 0.734784 5.10536 0.48043 5.29289 0.292893C5.48043 0.105357 5.73478 0 6 0H14C14.2652 0 14.5196 0.105357 14.7071 0.292893C14.8946 0.48043 15 0.734784 15 1V4ZM16 6H4V18H16V6ZM7 9H9V15H7V9ZM11 9H13V15H11V9ZM7 2V4H13V2H7Z" fill="#1E244D" />
          </svg>
        </button>
      </div>
      {data && <PasswordForm onSubmit={onSubmit} data={data} onSave={onSave} />}
    </WhiteBox>
  );
};

export default SingleWidget;
