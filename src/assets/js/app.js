import * as cfg from "./config";
import {app as application} from "electron";
import {enableLiveReload} from 'electron-compile';

const path = require('path');
const log = require('electron-log');
const crashReporter = require('electron').crashReporter;

export const pkg = require('../../../package.json');
export const isDev = require('electron-is-dev');


export function init() {
    if (isDev) {
        enableLiveReload();
    }
    checkUpdate();
    sendCrashReport();
}

export function checkUpdate() {
    //mac未签名 不启用更新
    if (cfg.UPDATE_ENABLE && process.platform !== 'darwin') {
        require('update-electron-app')();
    }
};

export function sendCrashReport() {
    if (cfg.CRASH_ENABLE) {
        crashReporter.start({
            productName: pkg.productName,
            companyName: pkg.author,
            submitURL: cfg.CRASH_URL
        });
    }
}

export function getUserDataPath() {
    return application.getPath('userData');
}

export function getViewsPath() {
    return path.join(__dirname, '../../views');
}

export function getAssetsPath() {
    return path.join(__dirname, '../');
}

export function info(...msg) {
    log.info(msg);
}

export function debug(...msg) {
    log.debug(msg);
}

export function error(...msg) {
    log.error(msg);
}
