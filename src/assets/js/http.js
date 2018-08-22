import * as app from "./app";

export default class Http {
    static get(url, callback) {
        return fetch(url, {
            method: 'GET'
        }).then(function (response) {
            return response.json();
        }).then(json => {
            callback(json);
        }).catch(error => {
            app.error('http get error', url, error);
        });
    }

    static post(url, opts, callback, formData = true) {
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
        fetch(url, defaults).then(response => {
            return response.json();
        }).then(json => {
            callback(json);
        }).catch(error => {
            app.error('http post error', url, error);
        });
    }

}