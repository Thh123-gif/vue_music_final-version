<template>
    <h2>
        <slot></slot>
    </h2>
</template>

<script>
export default {
    name:'Title'
}
</script>

<style lang="less">
    h2 {
        position: relative;
        text-align: left;
        font-weight: 400;
        font-size: 16px;
        margin: 15px 0;
        padding-left: 10px;
        &::before{
            content: "";
            display: inline-block;
            width:2px;
            height: 20px;
            background-color: #dd001b;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }
    }
    
</style>
