import * as app from "../../assets/js/app";
import {deviceManager, QNRTCSession} from 'pili-rtc-web';
import {WhiteWebSdk} from 'white-web-sdk';

const whiteWebSdk = new WhiteWebSdk();
var miniToken = 'WHITEcGFydG5lcl9pZD1DYzlFNTJhTVFhUU5TYmlHNWJjbkpmVThTNGlNVXlJVUNwdFAmc2lnPTE3Y2ZiYzg0ZGM5N2FkNDAxZmY1MTM0ODMxYTdhZTE2ZGQ3MTdmZjI6YWRtaW5JZD00JnJvbGU9bWluaSZleHBpcmVfdGltZT0xNTY2MDQwNjk4JmFrPUNjOUU1MmFNUWFRTlNiaUc1YmNuSmZVOFM0aU1VeUlVQ3B0UCZjcmVhdGVfdGltZT0xNTM0NDgzNzQ2Jm5vbmNlPTE1MzQ0ODM3NDYzMzYwMA';
var url = 'https://cloudcapiv3.herewhite.com/room?token=' + miniToken;

app.sendCrashReport();

var vm = new Vue({
    el: '#app',
    data: {
        hello: 'hello electron!'
    },
    mounted: function () {
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
        fetch(url, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name: 'my whiteboard',
                limit: 100, // 房间人数限制
            }),
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            return whiteWebSdk.joinRoom({
                uuid: json.msg.room.uuid,
                roomToken: json.msg.roomToken,
            });
        }).then(function (room) {
            room.bindHtmlElement(document.getElementById('whiteboard'));
        });
    },
    methods: {

    }
});
