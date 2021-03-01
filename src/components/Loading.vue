<template>
    <div class="loading-component">
        <div class="load-box">
            <i></i>
            <i></i>
            <i></i>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .loading-component {
        display: flex;
        justify-content: center;
        .load-box {
            width: 20px;
            height: 10vh;
            display: flex;
            justify-content: space-between;
            align-items: center;
            i {
                width: 4px;
                height: 20px;
                border-radius: 4px;
                display: inline-block;
                background-color: #dd001b;
                &:first-of-type,&:last-of-type{
                    animation: loading .7s linear -.3s alternate-reverse infinite;
                }
                &:nth-child(2){
                    animation: loading .7s linear 0s alternate-reverse infinite;
                }
            }
        }
    }
    @keyframes loading {
        0%{
            transform: scaleY(1);
        }
        100%{
            transform: scaleY(0.3);
        }
    }
</style>
