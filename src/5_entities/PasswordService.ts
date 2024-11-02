import { IFormData, IItem } from "@/6_shared/utils/interfaces";

export default class PasswordService {
  static async getAll() {
    const res = await window.electronAPI.getPasswords<IItem[]>();
    return res;
  }

  static async getOne(id: string): Promise<IItem> {
    const res = await window.electronAPI.getPasswordById<IItem>(id);
    return res;
  }

  static async add(data: IFormData): Promise<string> {
    const res = await window.electronAPI.addPassword<IFormData, string>(data);
    return res;
  }

  static async delete(id: string): Promise<string> {
    const res = await window.electronAPI.deletePasswordById<string>(id);
    return res;
  }

  static async update(id: string, data: IFormData): Promise<string> {
    const res = await window.electronAPI.updatePassword<IFormData, string>(id, data);
    return res;
  }

  static async search(searchValue: string): Promise<IItem[]> {
    const res = await window.electronAPI.getPasswordsBySearch<IItem[]>(searchValue);
    return res;
  }

  static async saveInFile(id: string): Promise<string> {
    const res = await window.electronAPI.saveInFile<string>(id);
    return res;
  }
}
