import * as cfg from "./config";
import {app as application} from "electron";

const log = require('electron-log');
const crashReporter = require('electron').crashReporter;

export const pkg = require('../../package.json');
export const isDev = require('electron-is-dev');

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

export function info(msg) {
    log.info(msg);
}

export function debug(msg) {
    log.debug(msg);
}

export function error(msg) {
    log.error(msg);
}
