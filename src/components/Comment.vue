<template>
  <div class="wrapper">
    <h5>
      最新评论
      <span>({{commentList.comments.length}})</span>
    </h5>
    <ul>
      <li v-for="(item,index) in commentList.comments" :key="index">
        <div class="left-userImg">
            <img :src="item.user.avatarUrl" />
        </div>
        <div class="right-mess">
          <div class="user-name">
            <div class="m-user">
                <h3>{{item.user.nickname}}<i class="m-vip" v-show="item.user.vipRights != null"></i></h3>
            </div>
            <div class="nice">
              <span>{{item.likedCount | formatLikeCount}}</span>
              <i>
                  <svg class="u-svg u-svg-unzancmt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="#999" d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"></path></svg>
              </i>
            </div>
          </div>
          <p>{{item.time | formatTime}}</p>
          <div class="comment">
              {{item.content}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props:['playlistID'],
    data(){
        return {
            commentList:{
                comments:[]
            },//评论列表
        }
    },
    mounted(){
        console.log(this.playlistID);
        this.$axios.get(`/comment/playlist?id=${this.playlistID}`).then(data=>{
            // console.log(data.data.comments);
            this.commentList = data.data;
        })
    },
    filters:{
        formatLikeCount(value){
            return value == 0 ? '' : value;
        },
        formatTime(value){
            let newTime = new Date(value);
            let y = newTime.getFullYear();
            let m = newTime.getMonth()+1;
            let d = newTime.getDate();
            return y+'年'+m+'月'+d+'日';
        }
    }
}
</script>

<style lang="less" scoped>
        * {
            margin: 0;
            padding: 0;
        }
        ul {
            list-style: none;
        }
        .wrapper {
            max-width: 480px;
            margin-bottom: 50px;
            h5 {
                color: #666;
                font-weight: 400;
                font-size: 12px;
                padding: 5px 10px;
                box-sizing: border-box;
                text-align: left;
                background: rgb(240, 240, 240);
            }
            ul li {
                /* height: 80px; */
                padding: 5px;
                display: flex;
                .left-userImg {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 10px;
                    margin-left: 5px;
                    img {
                        width: 100%;
                        border-radius: 50%;
                    }
                }
                .right-mess {
                    flex: 1;
                    border-bottom: 1px solid #eee;
                    .user-name {
                        height: 20px;
                        .m-user {
                            float: left;
                            h3 {
                                color: #666;
                                font-weight: 400;
                                font-size: 15px;
                                .m-vip {
                                    display: inline-block;
                                    width: 32px;
                                    height: 11px;
                                    background: url(../assets/vip.png) no-repeat;
                                    background-size: contain;
                                    vertical-align: middle;
                                    margin-left: 5px;
                                }
                            }
                        }
                        .nice {
                            width: 40px;
                            height: 20px;
                            float: right;
                            span {
                                font-size: 12px;
                                color: #999;
                                margin-right: 5px;
                            }
                            i {
                                width: 15px;
                                height: 15px;
                                svg {
                                    width: 15px;
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                    p {
                        font-size: 12px;
                        color: #999;
                        margin-bottom: 5px;
                        text-align: left;
                    }
                    .comment {
                        margin-bottom: 10px;
                        text-align: left;
                    }
                }
            }
        }
</style>
