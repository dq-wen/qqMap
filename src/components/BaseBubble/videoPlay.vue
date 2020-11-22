<template>
    <div class="video" @contextmenu.prevent="">
           <p class="close-btn" @click="close">
        <img src="../../../public/images/symbol/close.png" alt="">
      </p>
        <video-player
                ref="videoPlayer"
                :options="playerOptions"
                :playsinline="true"
                customEventName="customstatechangedeventname"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
        >
        </video-player>
    </div>
</template>
<script>
    import 'video.js/dist/video-js.css'
    import 'vue-video-player/src/custom-theme.css'
    import {videoPlayer} from 'vue-video-player'
    import 'videojs-flash'


    export default {
        name: 'videoPlay',
        props: {
            videoInfo: {
                type: Object,
                default() {
                    return null;
                }
            },
            open: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        components: {
            videoPlayer
        },
        data() {
            return {
                videoSrc: '',
                playerOptions: {
                    live: true,
                    autoplay: true, // 如果true，浏览器准备好时开始播放
                    muted: false, // 默认情况下将会消除任何音频
                    loop: false, // 是否视频一结束就重新开始
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    controlBar: {
                        timeDivider: true, // 时间分割线
                        durationDisplay: true, // 总时间
                        remainingTimeDisplay: false, // 剩余时间
                        currentTimeDisplay: true,//当前播放位置
                        volumeControl: false, // 声音控制键
                        playToggle: false, // 暂停和播放键
                        progressControl: true, // 进度条
                        fullscreenToggle: true, // 全屏按钮
                        olumePanel: {
                            inline: false,//音量调节是否水平
                        },
                    },
                    techOrder: ['flash'], // 兼容顺序
                    // flash: {
                    //     hls: {
                    //         withCredentials: false
                    //     },
                    //     // swf: SWF_URL
                    // },
                    sources: [{
                        type: 'rtmp/flv',
                        src: 'rtmp://10.197.149.246:1935/live/SourceId=44010557001320100011' // 视频地址-改变它的值播放的视频会改变
                    }],
                    notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                }
            }
        },
        created() {
            // this.playVideo(this.videoInfo);
        },
        mounted() {
            this.playVideo(this.videoInfo);
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player;
            }
        },
        methods: {
            // --------------------视频播放-开始-------------------- */
            // 初始化话播放-在onPlayerCanplay中调用
            initPlay(player) {
                player.play();
            },

            /* 视频播放 */
            // 视频准备完毕
            playerReadied(player) {
            },

            // 视频加载完成
            onPlayerLoadeddata(player) {
            },

            // 可以播放视频
            onPlayerCanplay(player) {
            },

            // 拖动视频条会触发事件-视频暂停>可以播放视频>可以播放视频至拖动位置>视频播放>视频加载中>可以播放视频>视频播放中>视频加载中>可以播放视频>视频播放中>视频加载中>可以播放视频>视频播放中>可以播放视频至拖动位置
            // 可以播放视频至拖动位置
            onPlayerCanplaythrough(player) {
            },

            // 视频播放
            onPlayerPlay(player) {
            },

            // 视频播放中
            onPlayerPlaying(player) {
            },

            // 视频时间更新中
            onPlayerTimeupdate(player) {
            },

            // 视频暂停
            onPlayerPause(player) {
            },

            // 视频加载中
            onPlayerWaiting(player) {
            },

            // 视频状态改变
            playerStateChanged(playerCurrentState) {
            },

            // 视频播放结束
            onPlayerEnded(player) {
            },
            //切换视频
            playVideo(item) {
                item && (this.playerOptions.sources[0].src = 'rtmp://10.197.149.246:1935/live/SourceId=' + item.cameraDeviceNum);
            },
            dispose() {
                this.player.dispose(); // 杀死当前组件
            },
            beforeDestroy() {
                this.dispose();
            },
            close() {
                this.$emit('closeWin', false);
            },


            // --------------------视频播放-结束-------------------- */
        },
        watch: {
            videoInfo: function (newValue) {
                this.playVideo(newValue);
            }
        }
    }
</script>

<style lang="less">
    .video {
        top: 1.3rem;
        right: auto;
        position: absolute;
        bottom: auto;
        left: 40%;
        width: 20%;

        > img {
            width: 17px;
        }
    }

    .close-btn {
        position: absolute;
        top: 0;
        right: 0;
        display: inline-block;
        text-align: center;
        line-height: 0.08rem;
        background: rgba(43, 51, 63, 0.7);
        border: 0px solid rgba(79, 158, 253, 0.7);
        z-index: 1000;
    }

    .video-js { /* 给.video-js设置字体大小以统一各浏览器样式表现，因为video.js采用的是em单位 */
        font-size: 14px;
    }

    .video-js button {
        outline: none;
    }

    .video-js.vjs-fluid,
    .video-js.vjs-16-9,
    .video-js.vjs-4-3 { /* 视频占满容器高度 */
        height: 100%;
        background-color: #161616;
    }

    .vjs-poster {
        background-color: #161616;
    }

    .video-js .vjs-big-play-button { /* 中间大的播放按钮 */
        font-size: 2.5em;
        line-height: 2.3em;
        height: 2.5em;
        width: 2.5em;
        -webkit-border-radius: 2.5em;
        -moz-border-radius: 2.5em;
        border-radius: 2.5em;
        background-color: rgba(115, 133, 159, .5);
        border-width: 0.12em;
        margin-top: -1.25em;
        margin-left: -1.75em;
    }

    .video-js.vjs-paused .vjs-big-play-button { /* 视频暂停时显示播放按钮 */
        display: block;
    }

    .video-js.vjs-error .vjs-big-play-button { /* 视频加载出错时隐藏播放按钮 */
        display: none;
    }

    .vjs-loading-spinner { /* 加载圆圈 */
        font-size: 2.5em;
        width: 2em;
        height: 2em;
        border-radius: 1em;
        margin-top: -1em;
        margin-left: -1.5em;
    }

    .video-js .vjs-control-bar { /* 控制条默认显示 */
        display: flex;
    }

    .video-js .vjs-time-control {
        display: block;
    }

    .video-js .vjs-remaining-time {
        display: none;
    }

    .vjs-button > .vjs-icon-placeholder:before { /* 控制条所有图标，图标字体大小最好使用px单位，如果使用em，各浏览器表现可能会不大一样 */
        font-size: 22px;
        line-height: 1.9;
    }

    .video-js .vjs-playback-rate .vjs-playback-rate-value {
        line-height: 2.4;
        font-size: 18px;
    }

    /* 进度条背景色 */
    .video-js .vjs-play-progress {
        color: #ffb845;
        background-color: #ffb845;
    }

    .video-js .vjs-progress-control .vjs-mouse-display {
        background-color: #ffb845;
    }

    .vjs-mouse-display .vjs-time-tooltip {
        padding-bottom: 6px;
        background-color: #ffb845;
    }

    .video-js .vjs-play-progress .vjs-time-tooltip {
        display: none !important;
    }

    .video-js.vjs-paused .vjs-big-play-button {
        position: absolute;
        top: 50%;
        left: 50%;
    }
</style>