<template>
        <li :key="newsongs.id">
        <slot></slot>
        <div class="list-left">
            <div class="song-title">{{newsongs.name}}</div>
            <p>
                <i v-if="newsongs.song.privilege.maxbr > 320000"></i>
                <span>{{newsongs.song.artists[0].name}} - {{newsongs.name}}</span>
            </p>
        </div>
        <div class="list-right">
            <span @click="playMusic"></span>
        </div>
    </li>
</template>

<script>
export default {
    props:["newsongs"],
    methods:{
        playMusic(){
            this.$root.playingMusic.musicID = this.newsongs.id;
            this.$root.playingMusic.isContral = true;
        }
    }
}
</script>

<style lang="less" scoped>
     li {
        display: flex;
        justify-items: center;
        justify-content: space-between;
        height: 50px;
        text-align: left;
        padding-left:10px;
        &:nth-child(-n+3) .left-num{
            color: crimson;
        }
        .list-left {
            width: calc(100% - 64px);
            flex: 1;
            border-bottom: 1px solid #eee;
            .song-title {
                width: 100%;
                font-size: 17px;
                padding-top: 5px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
            p {
                width: 100%;
                margin: 0;
                font-size: 12px;
                color: #888;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                i {
                    width: 12px;
                    height: 8px;
                    display: inline-block;
                    margin-right: 4px;
                    background: url(../assets/index_icon_2x.png) no-repeat;
                    background-size: 166px 97px;
                }
            }
        }
        .list-right {
            border-bottom: 1px solid #ddd;
            line-height: 70px;
            padding-right: 10px;
            span{
                width: 24px;
                height: 24px;
                display: inline-block;
                background: url(../assets/index_icon_2x.png) no-repeat;
                background-size: 166px 97px;
                background-position: -23px 0;
            }
        }
    }
</style>
