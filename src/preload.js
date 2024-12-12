const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    invokeCreateRoom: (videoUrl) => ipcRenderer.invoke('create-room', videoUrl)
});
