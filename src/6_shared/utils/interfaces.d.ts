export type loginData = {
  login: string;
  password: string;
};

export interface IFormData {
  title: string;
  transcription: string;
  loginData: loginData[];
  note: string;
  tags: string;

  [key: string]: string | loginData[];
}

export interface IItem extends IFormData {
  id: string;
}
