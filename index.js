const { app, BrowserWindow, ipcMain } = require('electron');
const axios = require('axios');
const path = require('path');
require('dotenv').config()

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname,'src', 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    win.loadFile('src/index.html');
    win.setMenuBarVisibility(false);
};

app.whenReady().then(createWindow);

ipcMain.handle('create-room', async (event, videoUrl) => {
    try {
        const API = 'https://api.w2g.tv/rooms/create.json';
        const payload = {
            w2g_api_key: process.env.w2g_api_key,
            share: videoUrl
        };

        const { data } = await axios.post(API, payload, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return `https://w2g.tv/rooms/${data.streamkey}`;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


/**
 * https://w2g.tv/en/account/edit_user/
 */