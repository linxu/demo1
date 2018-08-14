import * as core from './core';
import electron from "electron";

export function createWindow(title, url, width, height) {
    let win = new electron.BrowserWindow({
        title: title,
        width: width,
        height: height,
    });
    win.loadURL(url);
    if (core.isDev) {
        win.webContents.openDevTools();
    }
    return win;
};

export function closeWin() {
    electron.remote.getCurrentWindow().close();
};

export function hideWin() {
    electron.remote.getCurrentWindow().minimize();
};

export function showWin() {
    electron.remote.getCurrentWindow().show();
};

export function notify(msg) {
    if (electron.remote.getCurrentWindow().isMinimized()) {
        var n = new Notification("您有一条新的消息", {
            body: msg
        });
        n.onclick = function () {
            showWin();
        };
    }
};



