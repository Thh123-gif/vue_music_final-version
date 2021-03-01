<template>
  <div class="max">
    <div class="wrapper">
      <div
        class="audio-box"
      ></div>
      <div class="contral">
        <i ref="collImg" class="musicImg">
          <img :src="songMessage.al.picUrl" />
        </i>
        <p @click="fullPlay">
          {{ songMessage.ar[0].name }} - {{ songMessage.name }}
        </p>
        <audio
          ref="audio"
          controls
          autoplay
          @timeupdate="timeupdate"
          :src="`https://music.163.com/song/media/outer/url?id=${musicID}.mp3`"
        ></audio>
        <i ref="conplay" class="play" @click="togglePlay">
          <canvas ref="mycanvas" width="40" height="40"
            >您的浏览器暂不支持canvas标签</canvas
          >
        </i>
      </div>
    </div>
    <!-- 显示歌词 -->
    <transition enter-active-class="animate__animated animate__bounceInLeft" leave-active-class="animate__animated animate__bounceOutRight">
      <div class="myaudio" v-show="isfullplay">
        <div class="layout"></div>
        <div class="playview-box">
          <span class="quit" @click="quit">&lt;</span>
          <div class="play-point"></div>
          <div class="center" @click="togglePlay">
              <div class="cd"></div>
              <div ref="rolPlay" class="c-play"></div>
              <div ref="roplay" class="playing">
                <div class="showImg">
                  <img :src="songMessage.al.picUrl" />
                </div>
              </div>
          </div>
          <!-- 歌词 -->
          <div class="layic">
              <p>{{songMessage.name}} - {{songMessage.ar[0].name}}</p>
              <div class="lay-box">
                <ul ref="lyul">
                    <li v-for="(m,index) in mylyaic" :key="index" :class="index==currentIndex? 'active':'' ">{{m.layic}}</li>
                </ul>
              </div>
          </div>
          <div class="bg">
            <div class="bg-box">
              <img :src="songMessage.al.picUrl" />
            </div>
          </div>
          <!-- 播放组件 -->
          <div class="layTime">
            <span class="cuTime">{{thisTime | formatlayicTime}}</span>
            <span class="toTime">{{totalTime | formatlayicTime}}</span>
          </div>
          <div class="user-contral">
            <div ref="proBox" class="process"  @click.stop="changeCurrentTime">
              <div ref="pro" class="c-process" :style="`width:${present}%`">
                  <i></i>
              </div>
            </div>
          </div>
          <div class="songscontral">
            <span class="prev" @click="prevSong"></span>
            <span ref="playpause" class="play_pause" @click="playOrpause"></span>
            <span class="next" @click="nextSong"></span>
          </div>
          <div class="more"></div>
      </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["musicID"],
  data() {
    return {
      songMessage: {
        al: {
          picUrl: "",
        },
        name: null,
        ar: [{ name: "" }],
      }, //歌曲的封面、歌手信息
      isplay: true, //播放的状态
      isfullplay: false, //是否全屏显示歌词播放
      mylyaic:[],//歌词
      currentIndex:0,//歌词进度
      thisTime:0,//当前播放的时间
      totalTime:0,// 歌词总时间
      present:0,//播放进度条的百分比
      currentSongIndex:0,//当前播放的歌曲列表
      playFlag:true,//控制播放的节流阀

    };
  },
  beforeRouteEnter(to, from, next) {
    // let ctx = this.$refs.mycanvas.getContext("2d");
    // ctx.beginPath();
    // ctx.strokeStyle = "black";
    // ctx.arc(25, 25, 20, 0, Math.PI * 2);
    // ctx.stroke();
    // ctx.closePath();
    next();
  },
  methods: {
    // 切换暂停/播放
    togglePlay() {
      if (this.isplay) {
        this.$refs.audio.play();
        this.$refs.conplay.className = "play";
        this.$refs.collImg.style.animationPlayState="running";
        this.$refs.roplay.style.animationPlayState="running";
        this.$refs.rolPlay.className = 'y-play';
        this.$refs.playpause.className = 'play_play';
      } else {
        this.$refs.audio.pause();
        this.$refs.conplay.className = "pause";
        this.$refs.collImg.style.animationPlayState="paused";
        this.$refs.roplay.style.animationPlayState="paused";
        this.$refs.rolPlay.className = 'c-play';
        this.$refs.playpause.className = 'play_pause';
      }
      this.isplay = !this.isplay;
    },
    // 下方的播放暂停按钮
    playOrpause(){
      this.togglePlay();
    },
    // 播放时
    timeupdate() {
      // console.log(this.$refs.audio.currentTime);
      this.totalTime = this.$refs.audio.duration;
      let currTime = this.$refs.audio.currentTime;
      this.thisTime = currTime;
      this.present =  (currTime / this.totalTime) * 100;
      // console.log(this.present);
      for(var key in this.mylyaic){
        let lycTime = this.mylyaic[key].time;
        var newi = parseInt(key)+1;
        if(newi==this.mylyaic.length-1){//判断如果是最后一条歌词. 就等于最后一条
          this.currentIndex=this.mylyaic.length-1;
          break;
        }
        if(currTime >= lycTime && currTime < this.mylyaic[newi].time){
          this.currentIndex = key;
          break;
        }
      }
      this.$refs.lyul.style.top=`-${this.currentIndex*25}px`;
          // 判断播放完成
      this.$refs.audio.addEventListener('ended',()=> {
        this.$refs.conplay.className = "pause";
        this.$refs.collImg.style.animationPlayState="paused";
        this.$refs.roplay.style.animationPlayState="paused";
        this.$refs.rolPlay.className = 'c-play';
        this.$refs.playpause.className = 'play_pause';
      });
    },
    //播放歌词界面
    fullPlay() {
      this.isfullplay = true;
      this.isplay = true;
      this.togglePlay();
    },
    // 退出全屏
    quit(){
      this.isfullplay = !this.isfullplay;
    },
    // 点击进度条改变歌曲的播放时间
    changeCurrentTime(event){
      // console.dir(event.target);
      if(event.target.nodeName == 'DIV'){
        let width = this.$refs.proBox.offsetWidth;
        let divX = this.$refs.proBox.offsetLeft;
        let x0 = event.pageX - divX;
        this.$refs.pro.style=`width:${x0}px`;
        let changeTime = x0 * this.totalTime / width;
        this.$refs.audio.currentTime = changeTime;
        // this.timeupdate();
      }
    },
    // 上一首
    prevSong(){
      if(this.playFlag){
        this.playFlag = false;
        let Timer = null;
        for(var i = 0 ; i < this.$root.playingMusic.playingMusicList.length; i++){
          let num = this.$root.playingMusic.playingMusicList.indexOf(this.musicID);
          if(num > 0){
            this.currentSongIndex = num;
            break;
          }
        }
        this.currentSongIndex --;
        this.currentSongIndex = this.currentSongIndex <= 0 ? 0 : this.currentSongIndex;
        let soID = this.$root.playingMusic.playingMusicList[this.currentSongIndex];
        this.$root.playingMusic.musicID = soID;
        clearTimeout(Timer);
        Timer = setTimeout(()=>{
          this.playFlag = true;
        },200)
      }
    },
    // 下一首
    nextSong(){
      if(this.playFlag){
        this.playFlag = false;
        let Timer = null;
        for(var i = 0 ; i < this.$root.playingMusic.playingMusicList.length; i++){
          let num = this.$root.playingMusic.playingMusicList.indexOf(this.musicID);
          if(num > 0){
            this.currentSongIndex = num;
            break;
          }
        }
        this.currentSongIndex ++;
        this.currentSongIndex = this.currentSongIndex >= this.$root.playingMusic.playingMusicList.length-1 ? this.$root.playingMusic.playingMusicList.length-1 : this.currentSongIndex;
        let soID = this.$root.playingMusic.playingMusicList[this.currentSongIndex];
        this.$root.playingMusic.musicID = soID;
        clearTimeout(Timer);
        Timer = setTimeout(()=>{
          this.playFlag = true;
        },200)
      }
    }
  },
  watch: {
    // 监听歌曲ID发生变化
    musicID(value) {
      this.isplay = true;//切换歌曲时，将data里面的播放状态改变为初始值
      this.togglePlay();
      this.$axios.get("/song/detail?ids=" + value).then((data) => {
        // console.log(data.data);
        if(data.data.code == 200){
          this.songMessage = data.data.songs[0];
        }
      });
      this.$axios.defaults.baseURL="http://music.kele8.cn";
      this.$axios.get("/lyric?id=" + value).then((data) => {
        // console.log(data);
        let ly = data.data.lrc.lyric;
        let lySplit = ly.split("\n");
        // console.log(lySplit);
        let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
        this.mylyaic = lySplit.map(ly=>{
          reg.test(ly);
          return {
            time:parseInt(RegExp.$1 * 60) + parseFloat(RegExp.$2),
            layic:RegExp.$3
          }
        })
      });
      this.$axios.defaults.baseURL='http://musicapi.leanapp.cn/';
    },
  },
  filters:{
    formatlayicTime(value){
      let m = Math.floor(value / 60 % 60);
      let s = Math.floor(value % 60);
      m = m < 10 ? "0"+m : m;
      s = s < 10 ? "0"+s : s;
      return  m + ":" + s;
    }
  }
};
</script>

<style lang="less" scoped>
#app {
      width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.wrapper {
  width: 100%;
  max-width: 480px;
  position: fixed;
  bottom: 0;
  z-index: 999;
  overflow: hidden;
}
.audio-box {
  width: 100%;
  height: 40px;
  display: flex;
  padding: 5px 0;
  background: #fff;
}
.contral {
  width: 100%;
  display: flex;
  padding: 5px 0;
  background: linear-gradient(180deg,rgba(255,255,255,.4),rgba(0,0,0,.1));
  position: absolute;
  top:0;
  z-index: 2;
  p {
    flex: 1;
  }
  audio {
    display: none;
  }
  .play {
    width: 35px;
    height: 35px;
    border: 1px solid #f00;
    border-radius: 50%;
    margin-right: 5px;
    background: url(../assets/pause3.png) center no-repeat;
    background-size: 60% 60%;
  }
  .pause {
    width: 35px;
    height: 35px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-right: 5px;
    background: url(../assets/play-icon.png) center no-repeat;
    background-size: 60% 60%;
  }
  .musicImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 5px;
    animation: rot 8s linear infinite;
    img {
      width: 100%;
    }
  }
}
.myaudio {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  // overflow: hidden;
  z-index: 99999;
}
// 遮罩层
.layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.2);
}
// 播放歌词
 .playview-box {
        width: 100%;
        height: 500px;
        border-top: 1px solid transparent;
        position: relative;
        .quit {
          position: absolute;
          top: 10px;
          left: 10px;
          color: #fff;
          font-size: 20px;
          transform: scaleY(2);
        }
        .bg {
          height: 100vh;
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          z-index: -1;
          .bg-box {
            width: 100vw;
            height: 100vh;
            img {
              width: 100%;
              height: 100%;
              transform-origin: center center 0px;
              transform: scale(1.5);
              filter: blur(30px);
            }
          }
        }
        .play-point {
            position: absolute;
            top: -1px;
            left: 51%;
            display: inline-block;
            width: 84px;
            height: 122px;
            background: url(../assets/play.png) no-repeat;
            transform: translateX(-50%);
            transform-origin: center top;
            background-size: 100%;
            z-index: 999;
        }
        .center {
            width: 300px;
            height: 300px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            .cd {
                width: 300px;
                height: 300px;
                margin: 70px auto 0;
                background: url(../assets/disc.png) no-repeat;
                background-size: contain;
            }
            .c-play {
              width: 60px;
              height: 60px;
              background:url(../assets/play-icon2.png) center no-repeat;
              background-size: 100%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              z-index: 9;
            }
            .y-play {
              width: 60px;
              height: 60px;
              background-size: 100%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              z-index: 9;
            }
            .playing {
                position: absolute;
                top: 0;
                left: calc(50% - 150px);
                display:block;
                width: 300px;
                height: 300px;
                // margin: 0 auto;
                background: url(../assets/cd.png) no-repeat;
                background-size: contain;
                overflow: hidden;
                animation: rota 10s linear infinite;
                .showImg {
                  width: 80%;
                  margin: 0 auto;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%,-50%);
                img {
                    width: 80%;
                    margin: 0 auto;
                    border-radius: 50%;
                  }
                }
            }
        }
        .layic {
            width: 100%;
            height: 20vh;
            color: #fff;
            text-align: center;
            margin: 20px 0;
            position: relative;
            overflow: hidden;
            p {
                font-size:17px;
                margin-bottom: 10px;
            }
            .lay-box {
              height: 20vh;
              overflow: hidden;
              ul {
                margin: 0 auto;
                position: relative;
                overflow-y: auto;
                transform: translateY(50px);
                transition: all .5s linear;
                li {
                    height: 20px;
                    line-height: 25px;
                    padding: 2.5px 0;
                    color: rgba(255, 255, 255, .5);
                }
                li.active {
                    color: #fff;
                }
              }
            }
        }
        .layTime {
          width: 80%;
          margin: 0 auto 5px;
          overflow: hidden;
          span {
            font-size: 12px;
            color: #fff;
            &.cuTime {
              float: left;
            }
            &.toTime {
              float: right;
            }
          }
        }
        .user-contral {
          width: 80%;
          margin: 0 auto 20px;
          text-align: left;
          .process {
            width: 100%;
            margin: 0 auto;
            height: 2px;
            background: rgba(255, 255, 255, .5);
            cursor: pointer;
            .c-process {
              height: 2px;
              background: #fff;
              position: relative;
              i {
                width: 10px;
                height: 10px;
                position: absolute;
                left: 100%;
                top: -5px;
                display: inline-block;
                border-radius: 50%;
                background: #fff;
              }
            }
          }
        }
        .songscontral {
          width: 100%;
          .prev {
            width: 40px;
            height: 40px;
            display: inline-block;
            background: url(../assets/prev.png) no-repeat;
            background-size: 100%;
            margin-right: 50px;
          }
          .play_pause {
            width: 50px;
            height: 50px;
            display: inline-block;
            background: url(../assets/play_play.png) no-repeat;
            background-size: 100%;
            vertical-align: -4px;
          }
          .play_play {
            width: 50px;
            height: 50px;
            display: inline-block;
            background: url(../assets/play_pause.png) no-repeat;
            background-size: 100%;
            vertical-align: -4px;
          }
          .next {
            width: 40px;
            height: 40px;
            display: inline-block;
            background: url(../assets/next.png) no-repeat;
            background-size: 100%;
            margin-left: 50px;
          }
        }
        .more {
            width: 25px;
            height: 15px;
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            background-size: cover;
            background: url(../assets/more.png) no-repeat;
            background-size: 100%;
            animation: moveTop 12s linear infinite;
        }
    }

    @keyframes rota {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes moveTop {
        0%{
            background-position-y: 0;
        }
        100% {
            background-position-y: 90%;
        }
    }
    @keyframes rot {
      0%{
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
}
</style>
