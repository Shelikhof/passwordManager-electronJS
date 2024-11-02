import Button from "@/6_shared/ui/Button";
import Input from "@/6_shared/ui/Input";
import InputTags from "@/6_shared/ui/InputTags";
import Textarea from "@/6_shared/ui/Textarea";
import { IFormData } from "@/6_shared/utils/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import LoginPasswordForm from "./LoginPasswordForm";

const createSchema = z.object({
  title: z.string().min(1, { message: "Введите название" }),
  transcription: z.string(),
  loginData: z.array(z.object({ login: z.string(), password: z.string() })),
  note: z.string(),
  tags: z.string(),
});

interface IProp {
  onSubmit: (data: IFormData) => void;
  onSave?: () => void;
  data?: IFormData | undefined;
}

const PasswordForm: React.FC<IProp> = ({ data, onSubmit, onSave }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: data || {
      title: "",
      transcription: "",
      loginData: [{ login: "", password: "" }],
      tags: "",
      note: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-5">
      <Controller render={({ field }) => <Input {...field} placeholder="Название" error={errors.title?.message} />} control={control} name="title" />

      <Controller render={({ field }) => <Input {...field} placeholder="Транскрипция" error={errors.transcription?.message} />} control={control} name="transcription" />

      {/* <div className="sm:row-start-2">
        <Controller render={({ field }) => <Input {...field} placeholder="Логин" error={errors.login?.message} />} control={control} name="login" />
      </div>

      <div className="sm:row-start-2">
        <Controller render={({ field }) => <InputPassword canCopy={Boolean(data)} {...field} placeholder="Пароль" error={errors.password?.message} />} control={control} name="password" />
      </div> */}

      <div className="sm:row-start-2 sm:col-span-2 ">
        <Controller render={({ field: { onChange, value } }) => <LoginPasswordForm value={value} onChange={onChange} />} control={control} name="loginData" />
      </div>

      <div className="sm:row-start-3 sm:col-span-2 ">
        <Controller render={({ field: { onChange, value } }) => <InputTags value={value} onChange={onChange} />} control={control} name="tags" />
      </div>

      <div className="sm:row-start-4 h-36">
        <Controller render={({ field }) => <Textarea {...field} placeholder="Примечание" />} control={control} name="note" />
      </div>

      <div className="sm:row-start-5">
        <Button type="submit">Сохранить</Button>
      </div>

      {data && onSave && (
        <div className="sm:row-start-5">
          <Button type="button" variant={"outline"} onClick={onSave}>
            Выгрузить
          </Button>
        </div>
      )}
    </form>
  );
};

export default PasswordForm;
