import cache from "../../libs/cache";
import * as app from "../../libs/app";

app.sendCrashReport();

var vm = new Vue({
    el: '#app',
    data: {
        hello: 'hello electron'
    },
    mounted: function () {
        cache.put("test", {
            a: '123'
        });
        app.info(cache.get('test'));
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
