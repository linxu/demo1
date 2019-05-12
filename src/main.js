import {app as application} from 'electron';
import * as app from './assets/js/app';
import * as win from './assets/js/win';

if (require('electron-squirrel-startup')) {
    application.quit();
}

let mainWindow;

const createWindow = () => {
    mainWindow = win.createWindowBeforeSplash();
    //mainWindow = win.createWindow({
        //url: 'https://app.netease.im/webdemo/education/#/login'
        //url: 'https://demo-rtc.qnsdk.com/'
    //});
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
