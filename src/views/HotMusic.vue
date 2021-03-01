<template>
    <div class="hotMusic-box">
        <div class="topad">
            <div class="hot-top">
                <div class="ad"></div>
                <p>更新日期：{{updataTime | formatTime}}</p>
            </div>
        </div>
        <ul class="hotList">
            <Liitems :newsongs="item" v-for="(item,index) in newhotMusic" :key="item.id+''">
                <div class="left-num">{{index+1 | foramtIndex}}</div>
            </Liitems>
        </ul>
        <Loading v-show="loadFlag"></Loading>
        <div class="hot-bottom">
            <p @click="moreList">查看更多</p>
        </div>
    </div>
</template>

<script>
import Liitems from '../components/Liitems'
import Loading from '../components/Loading'

export default {
    components:{
        Liitems,
        Loading
    },
    data(){
        return {
            updataTime:Date.now(),
            //hotMusicList:[],//临时存歌曲数据
            newhotMusic:[],//真正的热歌数据
            loadFlag:false,//加载中组件,请求的时候为true,请求完成为false
            num:0,//查看更多
        }
    },
    beforeRouteEnter(to,from,next){
        //在路由进入之前判断有没有路由进来 如果有路由.不清空原来数据.
        next(vm=>{
            if(typeof vm.$route.params.num == "undefined"){
                vm.hotMusicList=[];
                vm.num=0;
            }
            vm.moreMusic(vm);
        })
    },
    beforeRouteUpdate(to,from,next){
        this.moreMusic(this);
        next();
    },
    methods:{
    //     // 页面滚动事件，滚动到底部进行懒加载
    //     scroll(event){
    //         let event = document.body.event || window.event;
    //         event.addEventListener('scroll',function(){
    //             let srotop = this.offsetTop;
    //             let clitop = this.clientTop;
    //             console.log(srotop,clitop);
    //         })
    //     }
        moreMusic(vm){
            let musicList = [];
            vm.loadFlag = true;
            vm.num++;
            // 请求热歌榜的歌曲
            // vm.$axios.get('/playlist/detail?id=3778678').then(data=>{
            vm.$axios.get('/top/list?idx=1').then(data=>{
                // console.log(data.data);
                vm.updataTime = data.data.playlist.updateTime;
                musicList = data.data.playlist.trackIds.slice(20  *(vm.num-1),20 * vm.num);
                // console.log(this.$root.playingMusic.playingMusicList);
            }).then(()=>{
                // console.log(vm.musicList[0]);
                // let songStr = "";
                // for(let h of vm.musicList[0]){
                //     songStr += ","+h.id;
                // }
                // songStr = songStr.substr(1);
                // console.log(songStr);
                // 数据没有直接给出相应的歌曲，只有id值，需要通过歌曲id继续发起请求
                //vm.hotMusicList=[];//每次进来将临时存取的歌曲清空，防止重复添加到数据中
                // vm.$axios.defaults.baseURL='';//临时修改请求的域名
                // vm.$axios.get('/song/detail?ids='+songStr)
                // .then(data=>{
                    // vm.hotMusicList.push(data.data);//临时存储拿到歌曲详情
                    // // console.log(data.data);
                    // console.log(vm.hotMusicList);
                    // for(let i = 0; i < vm.hotMusicList[0].songs.length; i++){
                    //     // 整理数据，使数据跟Liitems组件的循环数据结构相同
                    //     vm.newhotMusic.push({
                    //         id:data.data.songs[i].id,
                    //         name:data.data.songs[i].name,
                    //         song:{
                    //             privilege:{
                    //                 maxbr:data.data.privileges[i].maxbr
                    //             },
                    //             artists:[
                    //                 {name:data.data.songs[i].ar[0].name}
                    //             ]
                    //         }
                    //     })
                    // }
                    this.$root.playingMusic.playingMusicList=[];
                    for(let v of musicList){
                        vm.$axios.get('/song/detail?ids='+v.id).then((data)=>{//根据热榜里面歌曲id获取歌曲详细信息
                        // console.log(data);
                            vm.newhotMusic.push({
                            name:data.data.songs[0].name,
                            id:data.data.songs[0].id,
                            song:{
                                privilege:{
                                    maxbr:data.data.privileges[0].maxbr
                                },
                                artists:[{name:data.data.songs[0].ar[0].name}]
                            }
                            });
                            this.$root.playingMusic.playingMusicList.push(data.data.songs[0].id);
                        });
                    }
                    vm.loadFlag = false;
                // })
                // vm.$axios.defaults.baseURL=''; //本次请求完成后修改回原来
            })

        },
        moreList(event){
            this.moreMusic(this);
            if(this.newhotMusic.length >= 180){
                event.target.innerText = "没有更多了"
            }
        }
    },
    filters:{
        formatTime(value){
            let currentTime = new Date(value);
            let m = currentTime.getMonth()+1;
            let d = currentTime.getDate();
            m = m < 10 ? "0"+m : m;
            d = d < 10 ? "0"+d : d;
            return m+"月"+d+"日";
        },
        foramtIndex(value){
            return value < 10? "0"+value : value;
        }
    }
}
</script>

<style lang="less">
    .hotMusic-box {
        .topad {
            width: 100%;
            height: 145px;
            border-top: 1px solid transparent;
            background: url('../assets/hot_music_bg_2x.jpg');
            background-size: cover;
            position: relative;
            top: -1px;
            &::after {
                content: "";
                width: 100%;
                height: 145px;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                background-color: rgba(0,0,0,.2);
            }
            .hot-top {
                padding-left: 20px;
                position: relative;
                z-index: 1;
                 .ad {
                    width: 142px;
                    height: 67px;
                    background: url(../assets/index_icon_2x.png) no-repeat;
                    background-size: 166px 97px;
                    background-position: -24px -30px;
                    margin-top: 20px;
                }
                p {
                    text-align: left;
                    font-size: 12px;
                    color: rgba(255, 255, 255, .8);
                    margin-top: 10px;
                }
            }
        }
    }
    .left-num {
        width: 30px;
        height: 50px;
        line-height: 50px;
        color: #999;
    }
    .hot-bottom {
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: center;
        color: #999;
        padding-bottom: 50px;
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
</style>
