import cache from "../../libs/cache";
import * as app from "../../libs/app";
import {deviceManager, QNRTCSession} from 'pili-rtc-web';

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
        const localVideo = document.getElementById('localplayer');
        const remoteVideo = document.getElementById('remoteplayer');
        const myRTC = new QNRTCSession();
        myRTC.addListener('user-leave', function (user) {
            app.info('user leave');
            app.info(user);
        });
        myRTC.joinRoomWithToken("QxZugR8TAhI38AiJ_cptTl3RbzLyca3t-AAiH-Hh:ciuERtjohxEa0as5s3N79LnVPPs=:eyJhcHBJZCI6ImQ4bGs3bDRlZCIsInJvb21OYW1lIjoiaGVsbG8iLCJ1c2VySWQiOiJ0ZXN0MTIzIiwiZXhwaXJlQXQiOjE1MzQ2NzIyOTQwNjMxMzk3NDgsInBlcm1pc3Npb24iOiJ1c2VyIn0=\n").then(function (users) {
            app.info('current users', users);
            deviceManager.getLocalStream({
                video: {enabled: true},
                audio: {enabled: true},
            }).then(function (stream) {
                stream.play(localVideo, true);
                myRTC.publish(stream);
            }).catch(function (e) {
                app.error("stream play error!", e);
            })
            for (let i = 0; i < users.length; i += 1) {
                app.info(i);
                const user = users[i];
                if (user.published && user.userId !== myRTC.userId) {
                    myRTC.subscribe(user.userId).then(function (remoteStream) {
                        remoteStream.play(remoteVideo);
                    }).catch(function (e) {
                        console.log('subscribe error!', e);
                    })
                }
            }
        }).catch(function (e) {
            app.error('join room error!', e);
        })
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
});
