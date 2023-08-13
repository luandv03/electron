// window.addEventListener("DOMContentLoaded", () => {
//     const replaceText = (selector, text) => {
//         const element = document.getElementById(selector);
//         if (element) element.innerText = text;
//     };

//     for (const type of ["chrome", "node", "electron"]) {
//         replaceText(`${type}-version`, process.versions[type]);
//     }
// });

const { contextBridge, ipcRenderer, dialog } = require("electron");

contextBridge.exposeInMainWorld("test", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    openFile: () => ipcRenderer.invoke("dialog:openFile"),
    handleGetDataSingleLink: (url) =>
        ipcRenderer.invoke("video:send-link", url),
    handleDownloadVideoByUrl: (payload) =>
        ipcRenderer.invoke("video:download_by_url", payload),
    handleGetListDataByUsername: (username) =>
        ipcRenderer.invoke("video:send_username", username),
    // we can also expose variables, not just functions
});
