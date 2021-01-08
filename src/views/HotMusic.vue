<template>
    <div class="hotMusic-box">
        <div class="topad">
            <div class="hot-top">
                <div class="ad"></div>
                <p>更新日期：{{nowTime | formatTime}}</p>
            </div>
        </div>
        <MusicList></MusicList>
    </div>
</template>

<script>
import MusicList from '../components/MusicList'

export default {
    components:{
        MusicList
    },
    data(){
        return {
            musicList:[],
            nowTime:Date.now()
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.$axios.get('/playlist/detail?id=3778678').then(data=>{
                // console.log(data.data.list[3]);
                // console.log(data.data.list);
                console.log(data);
            })
        })
    },
    filters:{
        formatTime(value){
            let currentTime = new Date(value);
            let m = currentTime.getMonth()+1;
            let d = currentTime.getDate();
            m = m < 10 ? "0"+m : m;
            d = d < 10 ? "0"+d : d;
            return m+"月"+d+"日";
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
</style>
