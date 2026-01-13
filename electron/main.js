// imports in electron should be used with commonJs format, since electorn runs through node, and node
// uses commonjs, could use import __ from, but would need to update config file to make "type" : "module"


// const { app, BrowserWindow } = require("electron");
// const path = require("path");

import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

async function createWindow() {
    try {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences : {
                preload: path.join(__dirname, 'preload.js'),
                
            }
        });

        await mainWindow.loadURL("http://localhost:5173/");

    } catch (err){
        console.error("❌ Error creating window", err);
    }
}

app.whenReady().then(() => {
    createWindow();
    //make sure that for mac, app stays open even when window is closed
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length == 0){
            createWindow();
        }
    });
});


//now exiting when window is closed (except on Mac)
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});