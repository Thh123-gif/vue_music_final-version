<template>
  <div class="loginbox">
      <div class="show">
        <div class="user_ipt">
          <span></span>
          <input v-model="uname" type="text" placeholder="邮箱/用户名/登录手机">
        </div>
        <div class="pass_ipt">
          <span></span>
          <input v-model="upass" type="text" placeholder="密码">
        </div>
        <h5>忘记密码</h5>
        <button @click="login">登 录</button>
      </div>
  </div>
</template>

<script>
export default {
  name:"Login",
  data(){
    return {
        uname:'',
        upass:''
    }
  },
//   beforeRouterEnter(to,from,next){
//     let luname = window.sessionStorage.getItem('username');
//     let lupass = window.sessionStorage.getItem('userpass');
//     alert(luname,lupass)
//     if(luname == "admin" && lupass == "123456"){
//         next('/minepage');
//     }else{
//         alert('请登录');
//         next();
//     }
//   },
  methods:{
    login(){
      if(this.uname == "admin" && this.upass == "123456"){
        alert('登录成功');
        sessionStorage.setItem('username',"admin");
        sessionStorage.setItem('userpass',"123456");
        this.$router.push('/minepage');
      }else{
        alert('账号或密码错误');
        this.uname = '';
        this.upass = '';
      }
    }
  }
}
</script>

<style scoped>
.show {
  padding: 0 30px;
}
  .show .user_ipt,.show .pass_ipt {
    width: 100%;
    height: 45px;
    line-height: 45px;
    border: 1px solid #ddd;
    margin: 40px 0;
    overflow: hidden;
  }
  .show .user_ipt>span {
    width: 45px;
    height: 45px;
    display: inline-block;
    background-color: #ddd;
    background: url(../assets/denglu.png) center center no-repeat;
    background-size: 25px;
    border-right: 1px solid #ddd;
    vertical-align: top;
  }
 .show .pass_ipt>span {
    width: 45px;
    height: 45px;
    display: inline-block;
    background-color: #ddd;
    background: url(../assets/mima.png) center center no-repeat;
    background-size: 25px;
    border-right: 1px solid #ddd;
    vertical-align: top;
 }
 .show .user_ipt input,.show .pass_ipt input {
   width: calc(100% - 46px);
   height: 45px;
   line-height: 45px;
   text-indent: 1em;
   font-size: 17px;
   border: 0;
   outline: none;
 }
 h5 {
   text-align: right;
   margin-bottom: 20px;
   font-weight: 100;
 }
 button {
   width: 100%;
   height: 35px;
   background: crimson;
   color: #fff;
   letter-spacing: 10px;
   font-size: 20px;
   text-align: center;
   border: 0;
   outline: 0;
 }
</style>