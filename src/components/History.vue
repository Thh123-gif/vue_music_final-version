<template>
    <div>
        <li v-for="(item,index) in history" :key="index">
            <div class="list-left">
                <div class="song-title">{{histroy}}</div>
            </div>
        </li>
    </div>
</template>

<script>
export default {
    props:["history"],
    methods:{
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
