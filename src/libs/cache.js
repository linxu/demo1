const storage = require('electron-json-storage');
import * as app from "./app";

export default class Cache {
    static put(key, value) {
        return new Promise(function (resolve, reject) {
            storage.set(key, value, function (error) {
                if (error) {
                    app.error(error);
                    reject('设置' + key + '出错');
                } else {
                    resolve();
                }
            });
        });
    }

    static get(key) {
        return new Promise(function (resolve, reject) {
            storage.get(key, function (error, data) {
                if (error) {
                    app.error(error);
                    reject('获取' + key + '出错');
                } else {
                    resolve(data);
                }
            });
        });
    }
}