<template>
     <div class="playlist-box">
        <span class="back" @click="back">&lt;</span>
        <div class="top-box">
            <img class="playlist-top" :src="imgUrl" />
        </div>
        <div class="title-box">
            <div class="showimg">
                <div class="playlist-icon">歌单</div>
                <img :src="imgUrl" />
                <span>{{playCount | formatplayCount}}</span>
            </div>
            <div class="message">
                <p>{{resultdata.name}}</p>
                <div class="user-img">
                    <img :src="resultdata.creator.avatarUrl" />
                    <span>{{resultdata.creator.nickname}}</span>
                </div>
            </div>
        </div>
        <h5>歌曲列表</h5>
        <ul class="showSongs">
            <Liitems :newsongs="item" v-for="(item,index) in songsList" :key="item.id">
                <div class="left-num">{{index+1}}</div>
            </Liitems>
            <div class="layout">
                <div class="hot-bottom">
                    <p @click="moreList">查看更多</p>
                </div>
            </div>
        </ul>
        <Loading v-show="loadFlag"></Loading>
      
        <Comment :playlistID="plistid"></Comment>
    </div>
</template>

<script>
import Liitems from '../components/Liitems'
import Loading from '../components/Loading'
import Comment from '../components/Comment'
export default {
    props:["plistid"],
    data(){
        return {
            resultdata:{
                creator:{
                    avatarUrl:''
                }
            },//歌单数据
            imgUrl:'',
            playCount:0,
            songsList:[],//歌曲数据
            loadFlag:false,//加载中组件,请求的时候为true,请求完成为false
            num:0,//查看更多
        }
    },
    components:{
        Liitems,
        Loading,
        Comment
    },
    methods:{
        // 查看更多
        moreList(){
            this.moreMusic(this);
        },
        // 歌曲
        moreMusic(vm){
            let lisongs = [];//临时存储的歌曲id值
            vm.loadFlag = true;
            vm.num++;
            // 获取歌单推荐
            vm.$axios.get(`/playlist/detail?id=${vm.plistid}`).then(data=>{
                // console.log("歌单",data);
                vm.resultdata = data.data.playlist;
                vm.playCount = vm.resultdata.playCount;
                vm.imgUrl = data.data.playlist.coverImgUrl;
                lisongs = data.data.playlist.trackIds.slice(10 * (vm.num-1),10 * vm.num);
                this.$root.playingMusic.playingMusicList = lisongs;
                // 根据歌单的ID进行请求，获取里面的歌曲信息
                for(let s of lisongs){
                    vm.$axios.get(`/song/detail?ids=${s.id}`).then(data=>{
                        // console.log("歌曲",data);
                        vm.songsList.push({
                            name:data.data.songs[0].name,
                            id:data.data.songs[0].id,
                            song:{
                                privilege:{
                                    maxbr:data.data.privileges[0].maxbr
                                },
                                artists:[{name:data.data.songs[0].ar[0].name}]
                            }
                        })
                    })
                }
                vm.loadFlag = false;
            });
        },
        back(){
            this.$router.push('/');
        }
    },
    filters:{
        formatplayCount(value){
            return (value / 10000).toFixed(2) + '万';
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.moreMusic(vm);
        })
    }
}
</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .playlist-box{
        position: relative;
        .back {
            position: absolute;
            left: 5px;
            top: 5px;
            color: #fff;
            transform: scaleY(2);
            z-index: 9999;
        }
        .top-box {
            width: 100%;
            height: 200px;
            overflow: hidden;
            .playlist-top {
                width: 100%;
                height: 220px;
                display: block;
                filter:blur(20px);
                transform: scale(1.2);
            }
        }
    }
    .title-box {
            width: 100%;
            height: 200px;
            padding-left: 15px;
            box-sizing: border-box;
            background: rgba(0,0,0,.2);
            display: flex;
            align-items: center;
            position: absolute;
            top:0;
            z-index: 2;
            .showimg {
                width: 150px;
                height: 130px;
                position: relative;
                .playlist-icon {
                    position: absolute;
                    z-index: 3;
                    top: 10px;
                    left: 0;
                    padding: 0 8px;
                    width: 20px;
                    height: 17px;
                    color: #fff;
                    font-size: 9px;
                    text-align: center;
                    line-height: 17px;
                    background-color: rgba(217,48,48,.8);
                    border-top-right-radius: 17px;
                    border-bottom-right-radius: 17px;
                }
                img {
                    width: 100%;
                }
                span{
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 30px;
                    background: linear-gradient(180deg, rgba(0,0,0,.5),rgba(255,255,255,0));
                    font-size: 12px;
                    color: #fff;
                    text-align: right;
                    &::before {
                        content: "";
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        background: url(../assets/ear.svg) no-repeat;
                        background-size: 100%;
                        vertical-align: -2px;
                        margin-right: 5px;
                    }
                }
            }
            .message {
                width: 230px;
                height: 130px;
                margin-left:20px;
                p {
                    color: #fff;
                    font-size: 16px;
                    margin-right: 10px;
                    margin-bottom: 20px;
                    text-align: left;
                    font-weight: 400;
                } 
                .user-img {
                    text-align: left;
                    img {
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                    span {
                        color: hsla(0,0%,100%,.7);
                    }
                }
            } 
    }
    h5 {
        text-align: left;
        padding:5px 15px;
        font-weight: 300;
        box-sizing: border-box;
        background: rgb(230, 230, 230);
        color: #000;
    }
    .showSongs {
        position: relative;
        .left-num {
            width: 30px;
            height: 50px;
            line-height: 50px;
            color: #999;
        }
        .layout {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 200px;
            background-image: linear-gradient(180deg,hsla(0,0%,97.3%,.7),#f8f8f8 60%);
            .hot-bottom {
                height: 50px;
                line-height: 50px;
                display: flex;
                justify-content: center;
                color: #999;
                padding-top: 100px;
                p {
                    font-size: 12px;
                }
                &::after {
                    content: "";
                    width: 12px;
                    height: 50px;
                    display: inline-block;
                    background: url(../assets/jiantou.svg) 100% no-repeat;
                    background-size: 7px 12px;
                    vertical-align: middle;
                }
            }
        }
    }
</style>
