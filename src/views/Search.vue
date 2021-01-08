<template>
    <div class="search-box">
        <div class="ipt-box">
            <i></i>
            <input type="text" placeholder="搜索歌曲、歌手、专辑" autocomplete="off">
            <div class="close">
                <i></i>
            </div>
        </div>
        <div class="show-result-box">
            <p>热门搜索</p>
            <ul class="show-result">
                <li v-for="(search,index) in searchList" :key="index">
                    <a href="javascript:;">{{search.first}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            searchList:[],
            iptValue:''
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.$axios.get('/search/hot').then(data=>{
                vm.searchList = data.data.result.hots;
            })
        })
    },
    methods:{
    }
}

</script>

<style lang="less">
    .search-box {
        .ipt-box {
            padding: 15px 10px;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
            position: relative;
            &>i {
                width: 15px;
                height: 15px;
                display: inline-block;
                background: url(../assets/search.svg);
                vertical-align: middle;
                position: absolute;
                left: 20px;
                top: 25px;
            }
            input {
                width: 100%;
                height: 30px;
                line-height: 30px;
                background: rgba(0,0,0,.06);
                font-size: 14px;
                color: #333;
                border: 1px solid #ddd;
                border-radius: 20px;
                text-indent: 2em;
                outline: none;
            }
            .close {
                width: 30px;
                height: 30px;
                line-height: 30px;
                position: absolute;
                right: 20px;
                top: 16px;
                & i {
                    width: 14px;
                    height: 14px;
                    text-align: center;
                    display: inline-block;
                    background: url('../assets/close.svg');
                    vertical-align: middle;
                    display: none;
                }
            }
        }
        .show-result-box {
            padding: 0 10px;
            p {
                font-size: 12px;
                color: #666;
                text-align: left;
                margin: 10px 0;
            }
            .show-result {
                text-align: left;
                li {
                    display: inline-block;
                    height: 32px;
                    margin-right: 8px;
                    margin-bottom: 8px;
                    padding: 0 14px;
                    font-size: 14px;
                    line-height: 32px;
                    color: #333;
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    a {
                        text-decoration: none;
                        color: #000;
                    }
                }
            }
        }
    }
</style>
