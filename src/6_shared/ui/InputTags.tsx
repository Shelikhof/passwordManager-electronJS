import React from "react";
import Input from "./Input";

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

const InputTags: React.FC<IProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (value) {
      setTags(value.split(","));
    }
  }, []);

  React.useEffect(() => {
    onChange(tags.join(","));
  }, [tags]);

  const onAdd = () => {
    setTags([...tags, inputValue]);
    setInputValue("");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-5">
      <div className="relative">
        <Input placeholder="Теги" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="button" onClick={onAdd} className="absolute right-[13px] top-[13px]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3741_4932)">
              <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#1A1A1A" />
            </g>
            <defs>
              <clipPath id="clip0_3741_4932">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <TagsItem key={index} title={tag} onDelete={() => setTags(tags.filter((t) => t !== tag))} />
        ))}
      </div>
    </div>
  );
};

interface IPropsItem {
  title: string;
  onDelete: () => void;
}

const TagsItem: React.FC<IPropsItem> = ({ onDelete, title }) => {
  return (
    <div className="flex items-center gap-2 bg-purple-100 rounded-[10px] p-3">
      <p>{title}</p>
      <button type="button" onClick={onDelete}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0002 10.586L16.9502 5.63599L18.3642 7.04999L13.4142 12L18.3642 16.95L16.9502 18.364L12.0002 13.414L7.05023 18.364L5.63623 16.95L10.5862 12L5.63623 7.04999L7.05023 5.63599L12.0002 10.586Z" fill="#1A1A1A" />
        </svg>
      </button>
    </div>
  );
};

export default InputTags;
