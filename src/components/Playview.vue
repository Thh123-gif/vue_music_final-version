<template>
  <div class="playview-box">
        <div class="play-point"></div>
        <div class="center">
            <div class="cd"></div>
            <div class="playing"></div>
        </div>
        <div class="layic">
            <p>傻傻</p>
            <ul>
                <li>小白啊</li>
                <li>小白啊</li>
                <li>小白啊</li>
            </ul>
        </div>
        <div class="more"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .playview-box {
        width: 100%;
        height: 500px;
        border-top: 1px solid transparent;
        .play-point {
            position: absolute;
            top: 0px;
            left: 56%;
            display: inline-block;
            width: 90px;
            height: 130px;
            transform: translateX(-50%);
            transform-origin: center top;
            background: url(../assets/play.png) no-repeat;
            background-size: 100% 100%;
            z-index: 999;
        }
        .center {
            width: 290px;
            height: 290px;
            margin: 0 auto;
            position: relative;
            .cd {
                width: 100%;
                height: 290px;
                margin-top: 70px;
                background: url(../assets/disc.png) no-repeat;
                background-size: cover;
            }
            .playing {
                display: inline-block;
                width: 100%;
                height: 290px;
                background: url(../assets/cd.png) no-repeat;
                background-size: contain;
                position: absolute;
                top: 0;
                left: 0;
                animation: rota 4s linear infinite;
            }
        }
        .layic {
            width: 100%;
            height: 150px;
            background-color: khaki;
            color: #fff;
            text-align: center;
            margin-top: 30px;
            p {
                font-size:20px;
                margin-bottom: 10px;
            }
            ul li {
                font-size: 17px;
                margin: 5px 0;
            }
        }
        .more {
            width: 25px;
            height: 15px;
            margin: 0 auto;
            // background: url(./vue_object/src/assets/more.png) no-repeat;
            background-size: cover;
            background-color: tomato;
            animation: moveTop 7s linear infinite;
        }
    }

    @keyframes rota {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes moveTop {
        0%{
            background-position-y: 0;
        }
        100% {
            background-position-y: 90%;
        }
    }
</style>