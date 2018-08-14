import cache from "../libs/cache";

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

        }
    }
})