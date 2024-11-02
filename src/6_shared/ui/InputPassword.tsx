import React from "react";
import Input from "./Input";

interface IProp extends React.InputHTMLAttributes<HTMLInputElement> {
  canCopy?: boolean;
  error?: string | undefined;
}

const InputPassword = React.forwardRef<HTMLInputElement, IProp>(({ canCopy = false, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(String(props.value || ""));
  };

  return (
    <div className="relative">
      <div className="absolute right-[13px] top-[13px] z-10 flex gap-1">
        {canCopy && (
          <button type="button" onClick={onCopy}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 13.6647V17.8647C16 21.3647 14.6 22.7647 11.1 22.7647H6.9C3.4 22.7647 2 21.3647 2 17.8647V13.6647C2 10.1647 3.4 8.76471 6.9 8.76471H11.1C14.6 8.76471 16 10.1647 16 13.6647Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 7.66471V11.8647C22 15.3647 20.6 16.7647 17.1 16.7647H16V13.6647C16 10.1647 14.6 8.76471 11.1 8.76471H8V7.66471C8 4.16471 9.4 2.76471 12.9 2.76471H17.1C20.6 2.76471 22 4.16471 22 7.66471Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42001 13.98 8.42001 12C8.42001 10.02 10.02 8.42001 12 8.42001C13.98 8.42001 15.58 10.02 15.58 12Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.4C18.82 5.8 15.53 3.72 12 3.72C8.47 3.72 5.18 5.8 2.89 9.4C1.99 10.81 1.99 13.18 2.89 14.59C5.18 18.19 8.47 20.27 12 20.27Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.53 9.47001L9.47001 14.53C8.82001 13.88 8.42001 12.99 8.42001 12C8.42001 10.02 10.02 8.42001 12 8.42001C12.99 8.42001 13.88 8.82001 14.53 9.47001Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.82 5.77001C16.07 4.45001 14.07 3.73001 12 3.73001C8.47 3.73001 5.18 5.81001 2.89 9.41001C1.99 10.82 1.99 13.19 2.89 14.6C3.68 15.84 4.6 16.91 5.6 17.77" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.42001 19.53C9.56001 20.01 10.77 20.27 12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39999C20.78 8.87999 20.42 8.38999 20.05 7.92999" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.51 12.7C15.25 14.11 14.1 15.26 12.69 15.52" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.47 14.53L2 22" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L14.53 9.47" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
      <Input {...props} type={showPassword ? "text" : "password"} ref={ref} />
    </div>
  );
});

export default InputPassword;
