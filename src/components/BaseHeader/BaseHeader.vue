<template>
    <div class="BaseHeader">
    <div class="por-top">
        <img src="../../../src-modules/ecology/img/top.png" alt="" srcset="">
        <img src="../../../src-modules/ecology/img/left-menu.png" alt="left">
        <img src="../../../src-modules/ecology/img/right-menu.png" alt="right">
      </div>
    </div>
</template>

<script>
    export default {
        name: "BaseHeader"
    }
</script>

<style scoped lang="scss">
    .BaseHeader{
        font-family: ShiShangZhongHeiJianTi;
        width:19.2rem;
        height: .27rem;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        /*background: @bg_color;*/
        position: absolute;
        top: 0;
        z-index: 99;
        .por-top{
        width:100%;
        height: 1.08rem;
        }
        img:nth-child(2){
            position: absolute;
            top: 0.78rem;
            left: 0.32rem;
        }
        img:nth-child(3){
            position: absolute;
            top: 0.68rem;
            right: 0.32rem;
        }
    }
</style>
