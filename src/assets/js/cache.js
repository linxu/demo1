const Store = require('electron-store');
const store = new Store();

export default class Cache {
    static put(key, value) {
        store.set(key, value);
    }

    static get(key, defaultValue) {
        return store.get(key, defaultValue);
    }

    static has(key) {
        return store.has(key);
    }

    static delete(key) {
        return store.delete(key);
    }

    static clear() {
        return store.clear();
    }
}