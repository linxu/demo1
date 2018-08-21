import {app as application} from 'electron';
import * as app from './libs/app';
import * as win from './libs/win';

if (require('electron-squirrel-startup')) {
    application.quit();
}

let mainWindow;

const createWindow = () => {
    mainWindow = win.createWindowBeforeSplash();
};

application.on('ready', createWindow);

application.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        application.quit();
    }
});

application.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

//初始化配置
app.init();