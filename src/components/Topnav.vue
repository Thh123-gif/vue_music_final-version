<template>
    <ul class="topnav-box">
        <li><router-link to="/">推荐音乐</router-link></li>
        <li><router-link to="/hot">热歌榜</router-link></li>
        <li><router-link to="/search">搜索</router-link></li>
        <li><router-link to="/mine">我的</router-link></li>
    </ul>
</template>
<script>
export default {
    name:'Topnav'
}
</script>

<style lang="less">
    html {
        font-size: 14px;
    }
    * {
        margin: 0;
        padding: 0;
    }
    ul {
        margin:0;
        padding: 0;
        list-style: none;
    }
    .topnav-box { 
        display: flex;
        width: 100%;
        background-color: #fff;
        justify-content: center;
        border-bottom: 1px solid #ddd;
        li{
            flex: 1;
            line-height: 40px;
            -webkit-tap-highlight-color:transparent;
            a{
                text-decoration: none;
                color: #000;
                display: inline-block;
                padding: 0 5px;
                &.router-link-exact-active{
                    color: #dd001b;
                    border-bottom: 2px solid #dd001b;
                }
            }
        }
    }
</style>
