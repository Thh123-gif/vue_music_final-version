<template>
    <div class="recommend-box">
        <Loading v-if="remomendList.length <= 0"></Loading>
        <Title>推荐歌单</Title>
        <ul class="recommend-list">
            <router-link v-for="rem in remomendList" :key="rem.id" tag="li" :to="`/playlist/${rem.id}`">
                <a href="javascript:;">
                    <div class="img-list">
                        <img :src="rem.picUrl"/>
                        <span>{{rem.playCount | formatNum}}</span>
                    </div>
                    <p>{{rem.name}}</p>
                </a>
            </router-link>
        </ul>
        <Title>最新音乐</Title>
        <Loading v-if="remomendList.length <= 0"></Loading>
        <MusicList :newsongs="newMusicList"></MusicList>
    </div>
</template>

<script>
import Title from '../components/Title'
import MusicList from '../components/MusicList'
import Loading from '../components/Loading'

export default {
    components:{
        Title,
        MusicList,
        Loading,
    },
    data(){
        return {
            remomendList:[],
            newMusicList:[]
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            //6个歌单
            vm.$axios.get('/personalized?limit=6').then(data=>{
                vm.remomendList = data.data.result;
            });
            // 最新音乐
            vm.$axios.get('/personalized/newsong').then(data=>{
                vm.newMusicList = data.data.result;
                // console.log(vm.newMusicList);
                vm.$root.playingMusic.playingMusicList = [];
                for(let i = 0; i < data.data.result.length; i++){
                    vm.$root.playingMusic.playingMusicList.push(data.data.result[i].id);
                }
            });
        })
    },
    filters:{
        formatNum(value){
            return (value/10000).toFixed(1)+"万"
        }
    }
}
</script>

<style lang="less">
    .recommend-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
            width: 33%;
            margin-bottom: 10px;
            -webkit-tap-highlight-color:transparent;
            a{
                display: inline-block;
                text-decoration: none;
                color: #000;
                position: relative;
             
                .img-list {
                    img {
                        width: 100%;
                    }
                    span {
                        position: absolute;
                        top: 0px;
                        right:0px;
                        padding-top: 2px;
                        padding-right: 2px;
                        box-sizing: border-box;
                        width: 100%;
                        font-size: 13px;
                        background-image:linear-gradient(180deg, rgba(0,0,0,.2),rgba(0,0,0,0));
                        display: inline-block;
                        color: #fff;
                        text-align: right;
                        z-index: 2;
                    }
                }
                p {
                    height: 35px;
                    padding:0 5px;
                    font-size: 13px;
                    text-align: left;
                    display: -webkit-box;    
                    -webkit-box-orient: vertical;    
                    -webkit-line-clamp: 2;    
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>
