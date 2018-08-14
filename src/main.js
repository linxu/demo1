import {app} from 'electron';
import * as core from './libs/core';
import * as win from './libs/win';

if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow;

const createWindow = () => {
    mainWindow = win.createWindow("Demo", `file://${__dirname}/views/index.html`, 800, 600);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

//检查更新
core.checkUpdate();

//加载主进程
require("./libs/ipc");