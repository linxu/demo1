import cache from "../libs/cache";
import * as app from "../libs/app";

let WHITE_MINI_TOKEN = "WHITEcGFydG5lcl9pZD14c3MzMUxKbU1RZklzUFM1SkdkRlFPTHNhRHNBU3VIcUlXUTgmc2lnPTc3NTE0N2E1MjI0ZTA1N2VkMGJiZWEwNjhiNTc0ZDg5ZjEyNjE1OGQ6YWRtaW5JZD0yMSZyb2xlPW1pbmkmZXhwaXJlX3RpbWU9MTU2NTg1Njk4NSZhaz14c3MzMUxKbU1RZklzUFM1SkdkRlFPTHNhRHNBU3VIcUlXUTgmY3JlYXRlX3RpbWU9MTUzNDMwMDAzMyZub25jZT0xNTM0MzAwMDMzMTU4MDA";

var vm = new Vue({
    el: '#app',
    data: {
        hello: 'hello electron'
    },
    mounted: function () {
        cache.put("test", {
            a: '123'
        }).then(function () {
            cache.get('test').then(function (data) {
                app.info(data);
            })
        });
    },
    methods: {
        test: function (event) {
            app.info('info');
            app.debug('debug');
            app.error('error');
            process.crash();
            // fetch(cfg.API_WHITE + "?token=" + WHITE_MINI_TOKEN, {
            //     method: "POST",
            //     headers: {
            //         "content-type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         name: "我的第一个 White 房间",
            //         limit: 100, // 房间人数限制
            //         width: 1024,
            //         height: 768,
            //     }),
            // }).then(function (data) {
            //     console.log(data);
            //     return data.json();
            // }).then(function (data) {
            //     console.log(data);
            // });
        }
    }
})