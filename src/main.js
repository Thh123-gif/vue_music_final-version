import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './assets/animate.min.css'

Vue.config.productionTip = false

//存储全局数据
let playingMusic={
  musicID:0,//传递的musicID
  isContral:false,//是否显示播放组件
  playingMusicList:[]//播放中的歌曲列表
}

new Vue({
  router,
  data:{
    playingMusic
  },
  render: h => h(App)
}).$mount('#app')
