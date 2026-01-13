const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    //defining all our api calls, from electron app into our backend, js, python, etc
})