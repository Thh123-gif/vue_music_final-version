<template>
  <div id="app">
    <!-- 顶部导航栏组件 -->
    <Topnav v-show="$route.meta.showNav"></Topnav>
    <!-- 底部播放组件 -->
    <PlayContral :musicID="$root.playingMusic.musicID" v-show="$root.playingMusic.isContral"></PlayContral>
    <router-view/>
  </div>
</template>

<script>
import Topnav from './components/Topnav'
import PlayContral from './components/Playcontral'
export default {
  components:{
    Topnav,
    PlayContral
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  max-width: 480px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
