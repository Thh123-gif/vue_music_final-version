<template>
    <ul class="music-list">
        <router-link v-for="news in newsongs" :key="news.id" to="/" tag="li">
            <div class="list-left">
                <div class="song-title">{{news.name}}</div>
                <p>
                    <i></i>
                    <span>{{news.song.artists[0].name}} - {{news.name}}</span>
                </p>
            </div>
            <div class="list-right">
                <span></span>
            </div>
        </router-link>
    </ul>
</template>

<script>
export default {
    props:["newsongs"]
}
</script>

<style lang="less">
    .music-list {
        padding-top: 10px;
        li {
            display: flex;
            justify-items: center;
            justify-content: space-between;
            height: 50px;
            text-align: left;
            padding-left:10px;
            .list-left {
                flex: 1;
                border-bottom: 1px solid #eee;
                .song-title {
                    font-size: 17px;
                    padding-top: 5px;
                }
                p {
                    margin: 0;
                    font-size: 12px;
                    color: #888;
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
    }
</style>
