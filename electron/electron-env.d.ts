/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string;
    /** /dist/ or /public/ */
    VITE_PUBLIC: string;
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import("electron").IpcRenderer;
  electronAPI: {
    addPassword: <T, U>(data: T) => Promise<U>;
    getPasswords: <T>() => Promise<T>;
    getPasswordById: <T>(id: string) => Promise<T>;
    deletePasswordById: <T>(id: string) => Promise<T>;
    updatePassword: <T, U>(id: string, data: T) => Promise<U>;
    getPasswordsBySearch: <T>(searchValue: string) => Promise<T>;
    saveInFile: <T>(id: string) => Promise<T>;
  };
}
