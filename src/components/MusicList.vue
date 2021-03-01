<template>
    <div>
        <ul class="music-list">
            <Liitems v-for="item in newsongs" :newsongs="item" :key="item.id">
            </Liitems>
        </ul>
        <Loading v-if="newsongs.length <= 0"></Loading>
    </div>
</template>

<script>
import Liitems from '../components/Liitems'
import Loading from '../components/Loading'
export default {
    props:['newsongs'],
    components:{
        Liitems,
        Loading
    },
    mounted(){
        this.$root.playingMusic.playingMusicList = this.newsongs;
    },
    methods:{
    }
}
</script>

<style lang="less">
    .music-list {
        padding-top: 10px;
        margin-bottom: 50px;
    }
</style>
