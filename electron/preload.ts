import { IFormData } from "@/6_shared/utils/interfaces";
import { ipcRenderer, contextBridge } from "electron";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
});

contextBridge.exposeInMainWorld("electronAPI", {
  getPasswords: () => {
    ipcRenderer.send("getPasswords");

    return new Promise((resolve) => {
      ipcRenderer.once("getPasswords", (_event, value) => {
        resolve(value);
      });
    });
  },

  getPasswordById: (id: string) => {
    ipcRenderer.send("getPasswordById", id);

    return new Promise((resolve) => {
      ipcRenderer.once("getPasswordById", (_event, value) => {
        resolve(value);
      });
    });
  },

  addPassword: (data: IFormData) => {
    ipcRenderer.send("addPassword", data);

    return new Promise((resolve) => {
      ipcRenderer.once("addPassword", (_event, value) => {
        resolve(value);
      });
    });
  },

  deletePasswordById: (id: string) => {
    ipcRenderer.send("deletePasswordById", id);

    return new Promise((resolve) => {
      ipcRenderer.once("deletePasswordById", (_event, value) => {
        resolve(value);
      });
    });
  },

  updatePassword: (id: string, data: IFormData) => {
    ipcRenderer.send("updatePassword", id, data);

    return new Promise((resolve) => {
      ipcRenderer.once("updatePassword", (_event, value) => {
        resolve(value);
      });
    });
  },

  getPasswordsBySearch: (searchValue: string) => {
    ipcRenderer.send("getPasswordsBySearch", searchValue);

    return new Promise((resolve) => {
      ipcRenderer.once("getPasswordsBySearch", (_event, value) => {
        resolve(value);
      });
    });
  },

  saveInFile: (id: string) => {
    ipcRenderer.send("saveInFile", id);

    return new Promise((resolve) => {
      ipcRenderer.once("saveInFile", (_event, value) => {
        resolve(value);
      });
    });
  },
});
