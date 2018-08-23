import * as app from "../../assets/js/app";
import {deviceManager, QNRTCSession} from 'pili-rtc-web';
import {WhiteWebSdk} from 'white-web-sdk';

const white_room_uuid = "3348777524af4730bf53b86ca46142d4";
const white_room_token = "WHITEcGFydG5lcl9pZD14c3MzMUxKbU1RZklzUFM1SkdkRlFPTHNhRHNBU3VIcUlXUTgmc2lnPTVhYjZmMTFlMGEzMjc1OWEyN2M2YTUyYzFjNGI3MTUyMzdlZmNhZTk6YWRtaW5JZD0mcm9vbUlkPTMzNDg3Nzc1MjRhZjQ3MzBiZjUzYjg2Y2E0NjE0MmQ0JnRlYW1JZD0zNiZleHBpcmVfdGltZT0xNTY2NTQ4NzQxJmFrPXhzczMxTEptTVFmSXNQUzVKR2RGUU9Mc2FEc0FTdUhxSVdROCZjcmVhdGVfdGltZT0xNTM0OTkxNzg5Jm5vbmNlPTE1MzQ5OTE3ODkyMjMwMCZyb2xlPXB1Ymxpc2hlcg";
const qn_room_token = "QxZugR8TAhI38AiJ_cptTl3RbzLyca3t-AAiH-Hh:ciuERtjohxEa0as5s3N79LnVPPs=:eyJhcHBJZCI6ImQ4bGs3bDRlZCIsInJvb21OYW1lIjoiaGVsbG8iLCJ1c2VySWQiOiJ0ZXN0MTIzIiwiZXhwaXJlQXQiOjE1MzQ2NzIyOTQwNjMxMzk3NDgsInBlcm1pc3Npb24iOiJ1c2VyIn0=\n";

const whiteWebSdk = new WhiteWebSdk();
let whiteRoom = null;

app.sendCrashReport();

var vm = new Vue({
    el: '#app',
    data: {},
    mounted: function () {
        const localVideo = document.getElementById('localplayer');
        const remoteVideo = document.getElementById('remoteplayer');
        const whiteboard = document.getElementById('whiteboard');
        const myRTC = new QNRTCSession();
        myRTC.addListener('user-leave', function (user) {
            app.info('user leave', user);
        });
        myRTC.joinRoomWithToken(qn_room_token).then(function (users) {
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
        });
        // http.post(config.API_WHITE_ROOM_CREATE, {
        //     body: {
        //         name: 'my whiteboard ' + new Date().getTime()
        //     },
        // }, function (json) {
        //     whiteWebSdk.joinRoom({
        //         uuid: json.msg.room.uuid,
        //         roomToken: json.msg.roomToken,
        //     }).then(function (room) {
        //         room.bindHtmlElement(whiteboard);
        //     });
        // });
    },
    methods: {
        joinRoom: function () {
            whiteWebSdk.joinRoom({
                uuid: white_room_uuid,
                roomToken: white_room_token,
            }).then(function (room) {
                whiteRoom = room;
                whiteRoom.bindHtmlElement(whiteboard);
            });
        },
        setAppliance: function (name) {
            whiteRoom.setMemberState({
                currentApplianceName: name,
            });
        },
        leaveRoom: function () {
            whiteRoom.bindHtmlElement(null);
            whiteRoom.leaveRoom();
        }
    }
});
