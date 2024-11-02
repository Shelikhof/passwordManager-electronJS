import { app, BrowserWindow, dialog, ipcMain } from "electron";
// import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Store from "electron-store";
import { v4 as uuidv4 } from "uuid";
import { IFormData, IItem } from "@/6_shared/utils/interfaces";
import fs from "fs";

// const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.ico"),

    title: "Менеджер паролей",

    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      // devTools: false,
    },
    minWidth: 450,
    autoHideMenuBar: true,
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const schema = {
  passwords: {
    type: "array",
    default: [],
  },
};

const store = new Store({ schema });

// store.clear();

const getPassword = () => {
  const passwords = store.get("passwords") as IItem[];
  return passwords;
};

const sortData = (data: IItem[]) => {
  return data.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
};

const getPasswordById = (id: string) => {
  const passwords = getPassword();
  const password = passwords.find((password) => password.id === id);
  return password;
};

const filterPasswords = (id: string, passwords: IItem[]) => {
  const filteredPasswords = passwords.filter((password) => password.id !== id);
  return filteredPasswords;
};

ipcMain.on("getPasswords", (event) => {
  const data = getPassword();
  const sortedData = sortData(data);

  event.sender.send("getPasswords", sortedData);
});

ipcMain.on("getPasswordsBySearch", (event, searchValue) => {
  const data = getPassword();
  const filterData = data.filter((item) => item.title.includes(searchValue) || item.transcription.includes(searchValue) || item?.tags.includes(searchValue));
  const sortedData = sortData(filterData);

  event.sender.send("getPasswordsBySearch", sortedData);
});

ipcMain.on("getPasswordById", (event, id: string) => {
  const password = getPasswordById(id);
  event.sender.send("getPasswordById", password);
});

ipcMain.on("addPassword", (event, data: IFormData) => {
  const id = uuidv4();
  const storedData = getPassword();
  store.set("passwords", [...storedData, { ...data, id }]);
  event.sender.send("addPassword", "OK");
});

ipcMain.on("updatePassword", (event, id: string, data: IFormData) => {
  const storedData = getPassword();
  const password = getPasswordById(id);
  if (!password) return;

  for (const key in data) {
    if (password.hasOwnProperty(key)) {
      password[key] = data[key];
    }
  }

  const filteredPasswords = filterPasswords(id, storedData);
  store.set("passwords", [...filteredPasswords, password]);
  event.sender.send("updatePassword", "OK");
});

ipcMain.on("deletePasswordById", (event, id: string) => {
  const storedData = getPassword();
  const filteredPasswords = filterPasswords(id, storedData);
  store.set("passwords", filteredPasswords);
  event.sender.send("deletePasswordById", "OK");
});

ipcMain.on("saveInFile", async (event, id: string) => {
  const data = getPasswordById(id);
  if (!data) return;

  const result = await dialog.showSaveDialog({
    title: "Выгрузка в файл",
    defaultPath: path.join(app.getPath("desktop"), `${data.title}.txt`),
    filters: [
      { name: "Выгрузка в файл", extensions: ["txt"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });

  let content = "";
  data.loginData.map((item) => {
    content += `Логин: ${item.login}  Пароль: ${item.password}\n`;
  });

  if (!result.canceled && result.filePath) {
    fs.writeFile(result.filePath, content, (err) => {
      if (err) {
        return { success: false, message: err.message };
      }
      return { success: true, message: `File created at: ${result.filePath}` };
    });
  }

  event.sender.send("saveInFile", "OK");
});

app.whenReady().then(createWindow);
