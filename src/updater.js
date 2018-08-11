const isDev = require('electron-is-dev')
const os = require('os')
const {format} = require('util')
const pkg = require('../package.json')
const electron = require('electron')
const userAgent = format(
    '%s/%s (%s: %s)',
    pkg.name,
    pkg.version,
    os.platform(),
    os.arch()
)
const supportedPlatforms = ['darwin', 'win32']

module.exports = function updater() {
    // don't attempt to update during development
    if (isDev) {
        const message = 'update-electron-app config looks good; aborting updates since app is in development mode'
        console.log(message)
        //return
    }
    electron.app.on('ready', () => initUpdater())
}

function initUpdater() {

    const {app, autoUpdater, dialog} = electron
    const feedURL = `http://192.168.31.137:5000/update/${process.platform}/${app.getVersion()}`
    const requestHeaders = {'User-Agent': userAgent}

    // exit early on unsupported platforms, e.g. `linux`
    if (typeof process !== 'undefined' && process.platform && !supportedPlatforms.includes(process.platform)) {
        console.log(`Electron's autoUpdater does not support the '${process.platform}' platform`)
        return
    }

    console.log('feedURL', feedURL)
    console.log('requestHeaders', requestHeaders)
    autoUpdater.setFeedURL(feedURL, requestHeaders)

    autoUpdater.on('error', err => {
        console.log('updater error')
        console.log(err)
    })

    autoUpdater.on('checking-for-update', () => {
        console.log('checking-for-update')
    })

    autoUpdater.on('update-available', () => {
        console.log('update-available; downloading...')
    })

    autoUpdater.on('update-not-available', () => {
        console.log('update-not-available')
    })

    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateURL) => {
        console.log('update-downloaded', arguments)

        const dialogOpts = {
            type: 'info',
            buttons: ['Restart', 'Later'],
            title: 'Application Update',
            message: process.platform === 'win32' ? releaseNotes : releaseName,
            detail: 'A new version has been downloaded. Restart the application to apply the updates.'
        }

        dialog.showMessageBox(dialogOpts, (response) => {
            if (response === 0) autoUpdater.quitAndInstall()
        })
    })

    // check for updates right away and keep checking later
    autoUpdater.checkForUpdates()
    setInterval(() => {
        autoUpdater.checkForUpdates()
    }, 1000 * 60)
}
