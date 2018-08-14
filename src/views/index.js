import cache from "../libs/cache";
import {ipcRenderer} from 'electron';

ipcRenderer.on('async-message-reply', (event, arg) => {
    console.log(`async message reply: ${arg}`);
})

var app = new Vue({
    el: '#app',
    data: {
        hello: 'hello electron'
    },
    mounted: function () {
        cache.put("test", {
            a: '123'
        }).then(function () {
            cache.get('test').then(function (data) {
                console.log(data);
            })
        });
    },
    methods: {
        test: function (event) {
            ipcRenderer.send('async-message', 'test');
            var msg = ipcRenderer.sendSync('sync-message', 'test');
            console.log("sync message reply:" + msg);
        }
    }
})