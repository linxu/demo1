export const pkg = require('../../package.json');
export const isDev = require('electron-is-dev');

export function checkUpdate() {
    //mac未签名 不启用更新
    if (process.platform !== 'darwin') {
        require('update-electron-app')();
    }
};



