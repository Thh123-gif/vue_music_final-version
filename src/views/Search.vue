<template>
    <div class="search-box">
        <div class="ipt-box">
            <i></i>
            <input v-model="iptValue" type="text" placeholder="搜索歌曲、歌手、专辑" autocomplete="off" @keydown.enter="searchResult(iptValue,true)">
            <div class="close" v-show="searchValue.length > 0" @click="clear">
                <i></i>
            </div>
        </div>
        <div class="show-result-box">
            <ul class="show-result" v-show="searchValue.length <= 0">
                <p>热门搜索</p>
                <li v-for="(search,index) in searchList" :key="index" @click="selectLi(search.first)">
                    <a href="javascript:;">{{search.first}}</a>
                </li>
            </ul>
            <ul class="history" v-show="historyFlag && historyList.length > 0">
                <h5>历史搜索</h5>
                <li v-for="(item,index) in historyList" :key="index">
                    <div class="list-left">
                        <div class="song-title">
                             <i>
                            <svg t="1610640420361" class="icon" viewBox="0 0 1060 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1677" width="200" height="200"><path d="M515.762599 958.870845c246.966761 0 447.17029-200.203529 447.17029-447.170289 0-246.966761-200.203529-447.17029-447.17029-447.17029-246.966761 0-447.17029 200.203529-447.170289 447.17029 0 246.966761 200.203529 447.17029 447.170289 447.170289z m0 63.88147c-282.251292 0-511.051759-228.800468-511.051759-511.051759 0-282.251292 228.800468-511.051759 511.051759-511.05176 282.238815 0 511.051759 228.800468 511.05176 511.05176 0 282.251292-228.800468 511.051759-511.05176 511.051759z m0 0" p-id="1678"></path><path d="M547.703334 192.293206c0-17.642265-14.29847-31.940735-31.940735-31.940735s-31.940735 14.29847-31.940735 31.940735v343.362901c0 9.195438 3.955161 17.954187 10.85486 24.017935l191.644409 167.688859c13.262891 11.640901 33.462911 10.318355 45.103812-2.93206 11.640901-13.262891 10.318355-33.462911-2.93206-45.103811L547.703334 521.158008V192.293206z m0 0" p-id="1679"></path></svg>
                        </i>
                            {{item}}</div>
                    </div>
                </li>
            </ul>
            <Loading v-show="loadingFlag"></Loading>
            <div class="search-result" v-show="searchValue.length > 0">
                <h1>搜索“{{iptValue}}”</h1>
                <ul class="setion" v-show="searchFlag">
                    <li v-for="(s,index) in searchValue" :key="index" @click="searchResult(s.name,true)">
                        <i></i>
                        <span>{{s|formatName}}{{s.name}}</span>
                    </li>
                </ul>
                <ul class="result-search" v-show="msearchFlag">
                    <Liitems :newsongs="item" v-for="item in mysearch" :key="item.id"></Liitems>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Liitems from '../components/Liitems'
import Loading from '../components/Loading'
export default {
    data(){
        return {
            searchList:[],//默认搜索
            iptValue:'',//动态绑定输入框的内容
            loadingFlag:false,//加载中
            searchValue:[],//搜索的内容
            searchres:{},//临时存储搜索的简略结果
            mysearch:{},//最终搜索的详细结果
            searchFlag:true,//简略搜索
            msearchFlag:false,//精确搜索
            historyFlag:true,//历史记录的显示
            historyList:[],//历史记录
        }
    },
    components:{
        Liitems,
        Loading,
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.setSearch(vm);
            for(let i = 0 ; i <= 10; i++){
                let name = window.sessionStorage.getItem('songsname'+i)
                if(name != null){
                    vm.historyList.push(name);
                }
            }
        })
    },
    filters:{
        // 根据返回的数据order不同，对搜索的结果进行过滤
        formatName(value){
            if(typeof value.artists != 'undefined'){
                return '歌曲：'
            }else if(typeof value.artist != 'undefined'){
                return '专辑：'
            }else {
                return '歌手：'
            }
        }
    },
    methods:{
        // 拆分获取热门搜索的方法
        setSearch(vm){//vm为形参
            vm.$axios.get('/search/hot').then(data=>{
                vm.searchList = data.data.result.hots;
            });
        },
        // 点击X时清除所有数据
        clear(){
            this.iptValue = '';
            this.searchValue = [];
            this.historyFlag = true;
            this.setSearch(this);
        },
        // 搜索的结果
        searchResult(liname,boo){
            this.iptValue = liname;

            // 根据输入的内容进行请求
            this.$axios.get('/search?keywords='+liname).then(data=>{
                this.searchres = data.data.result.songs;//临时存储返回的数据
                // console.log(this.searchres);
                this.mysearch = [];//循环之间将mysearch清空
                this.$root.playingMusic.playingMusicList = [];
                for(let i = 0; i < this.searchres.length; i++){
                    // 将数据整理成Liitems组件里的循环结构
                    this.mysearch.push({
                        id:this.searchres[i].id,
                        name:this.searchres[i].name,
                        song:{
                            privilege:{
                                maxbr:900000
                            },
                            artists:[{name:this.searchres[i].artists[0].name}]
                        }
                    })
                    this.$root.playingMusic.playingMusicList.push(this.searchres[i].id);
                }
                if(boo == false){
                    this.searchFlag = true;
                    this.msearchFlag = false;

                }else{
                    this.searchFlag = false;
                    this.msearchFlag = true;

                }
                // this.msearchFlag = boo;
                // 防止输入框清除数据太快，内容为空时，异步请求还在继续请求
                if(liname == ''){
                    this.mysearch = [];
                }
            })
        },
        // 点击li进行搜索
        selectLi(value){
            this.searchResult(value);
            this.historyList.push(value);
            for(let i = 0; i < this.historyList.length ; i++){
                // let forname = this.historyList[i];
                // if(this.historyList.indexOf(forname) > 0){
                window.sessionStorage.setItem('songsname'+i,this.historyList[i]);
                // }
            }
            this.historyFlag = false;
        }
    },
    watch:{
        // 监听输入框的值发生改变
        iptValue(value){
            // 如果输入框的值不为空时，才进行请求
            if(value != ''){
                this.loadingFlag = true;
                this.$axios.get('/search/suggest?keywords='+value).then(data=>{
                    // console.log(data.data);
                    // 根据返回的数据结果，如果没有搜索到，就不添加到数据中
                    if(data.data.code == 200 && data.data.result.order){
                        let result = data.data.result;
                        // 合并多个数组为一个数组
                        let newResult = result.order.reduce((prev,v)=>{
                            let rev = result[v];
                            return prev.concat(rev);
                        },[]);
                        this.searchValue = newResult;
                        this.loadingFlag = false;
                    }
                });
                this.searchResult(value,false);
            }else{
                this.searchValue = [];//清空数据
            }
        }
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
                right: 10px;
                top: 16px;
                & i {
                    width: 14px;
                    height: 14px;
                    text-align: center;
                    display: inline-block;
                    background: url('../assets/close.svg');
                    vertical-align: middle;
                }
            }
        }
        .show-result-box {
            .history {
                h5 {
                    text-align: left;
                    font-weight: 400;
                    padding-left: 10px;
                }
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
                            line-height: 50px;
                            padding-top: 5px;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                            i {
                                width: 15px;
                                height: 15px;
                                display: inline-block;
                                svg {
                                    width: 15px;
                                    height: 15px;
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                }
            }
            p {
                font-size: 12px;
                color: #666;
                text-align: left;
                margin: 10px 0;
            }
            .show-result {
                text-align: left;
                padding: 0 10px;
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
                    -webkit-tap-highlight-color: transparent;
                    a {
                        text-decoration: none;
                        color: #000;
                    }
                }
            }
            h1 {
                height: 50px;
                padding-left: 10px;
                padding-right: 10px;
                font-size: 15px;
                line-height: 50px;
                font-weight: 500;
                color: #507daf;
                border-top: 1px solid #eee;
                text-align: left;
                position: relative;
                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: inline-block;
                    width: 100%;
                    height: 50px;
                    margin-left: 10px;
                    border-bottom: 1px solid #eee;
                }
            }
            .setion {
                text-align: left;
                padding: 0 10px;
                li {
                    height: 50px;
                    display: flex;
                    line-height: 50px;
                    justify-content: center;
                    align-items: center;
                    i {
                        width: 15px;
                        height: 15px;
                        display: inline-block;
                        background: url(../assets/search.svg) no-repeat;
                        vertical-align: middle;
                        margin-right: 10px;
                    }
                    span {
                        flex: 1;
                        height: 50px;
                        display: inline-block;
                        border-bottom: 1px solid #eee;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
</style>
