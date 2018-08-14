const {ipcMain} = require('electron');

ipcMain.on('async-message', (event, arg) => {
    console.log(arg);
    event.sender.send('async-message-reply', 'async')
});

ipcMain.on('sync-message', (event, arg) => {
    console.log(arg);
    event.returnValue = 'sync'
});