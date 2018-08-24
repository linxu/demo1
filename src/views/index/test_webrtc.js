import * as app from "../../assets/js/app";

app.info(window.WebRTC);

WebRTC.checkCompatibility().then(function (data) {
    app.info('兼容性检查', data);
});

var vm = new Vue({
    el: '#app',
    data: {},
    mounted: function () {

    },
    methods: {
        joinRoom: function () {

        },
        setAppliance: function (name) {

        },
        leaveRoom: function () {

        }
    }
});
