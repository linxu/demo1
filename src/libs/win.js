import * as core from './app';
import electron from "electron";

export function createWindow(title, url, width, height, isRenderer = false) {
    let BrowserWindow = isRenderer ? electron.remote.BrowserWindow : electron.BrowserWindow;
    let dialog = isRenderer ? electron.remote.dialog : electron.dialog;
    let win = new BrowserWindow({
        title: title,
        width: width,
        height: height,
    });
    win.webContents.on('crashed', function () {
        const options = {
            type: 'info',
            title: '提示',
            message: '天呐程序崩溃了',
            buttons: ['重来', '关闭']
        }
        dialog.showMessageBox(options, function (index) {
            if (index === 0) {
                win.reload();
            } else {
                win.close();
            }
        })
    });
    win.on('close', function () {
        win = null;
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



