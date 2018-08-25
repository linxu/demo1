import * as app from "./app";

export default class Http {
    static get(url) {
        return fetch(url, {
            method: 'GET'
        }).then(function (response) {
            return response.json();
        }).then(json => {
            return Promise.resolve(json);
        }).catch(error => {
            app.error('http get error', url, error);
            return Promise.reject(error);
        });
    }

    static post(url, opts, formData = true) {
        var defaults = {
            method: 'POST'
        }
        Object.assign(defaults, opts);
        if (formData && defaults.hasOwnProperty('body')) {
            let body = new FormData();
            Object.keys(defaults.body).forEach(function (key) {
                body.append(key, defaults.body[key]);
            });
            defaults.body = body;
        }
        return fetch(url, defaults).then(response => {
            return response.json();
        }).then(json => {
            return Promise.resolve(json);
        }).catch(error => {
            app.error('http post error', url, error);
            return Promise.reject(error);
        });
    }

}