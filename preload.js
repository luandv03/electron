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
    hanldeDownloadVideoFromListByUsername: (payload) =>
        ipcRenderer.invoke("video:download_list", payload),
    // we can also expose variables, not just functions
});
