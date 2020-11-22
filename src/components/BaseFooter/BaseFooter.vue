<template>
    <div class="BaseFooter">
        <ul class="module-container">
            <li  v-for="(item,index) in lists" :key="index">
                <router-link :to="item.path" class="f_color">
                    <img class="iconImg" :src="item.img">
                    <img class="bgImg" v-if="item.path==actIndex" :src="item.changeimg2">
                    <img class="bgImg" v-else :src="item.changeimg1">
                    <span :class="{activeColor:item.path==actIndex}">{{item.name}}</span>
                </router-link>
            </li>
        </ul>

    </div>
</template>

<script>

    import spuyed from  '../../assets/images/BaseFooter_img/未标题-3_0010_形状-833.png';
    import jioatongd from '../../assets/images/BaseFooter_img/未标题-3_0009_形状-834.png';
    import chengshid from '../../assets/images/BaseFooter_img/未标题-3_0008_menu_real-estate-拷贝.png';
    import kehuod from '../../assets/images/BaseFooter_img/未标题-3_0007_形状-835.png';
    import zhilid from '../../assets/images/BaseFooter_img/未标题-3_0006_形状-866.png';
    import fistchangeimg1 from '../../assets/images/BaseFooter_img/left_F.png';
    import fistchangeimg2 from '../../assets/images/BaseFooter_img/left.png';
    import changeimg1 from '../../assets/images/BaseFooter_img/center_F.png';
    import changeimg2 from '../../assets/images/BaseFooter_img/center.png';
    import lastchangeimg1 from '../../assets/images/BaseFooter_img/right_F.png';
    import lastchangeimg2 from '../../assets/images/BaseFooter_img/right.png';

    export default {
        name: "BaseFooter",
        data(){
          return{
                currentRoute:'home',
                lists:[{
                    name:'首页',
                    path:'/home',
                    img:spuyed,
                    changeimg1:fistchangeimg1,
                    changeimg2:fistchangeimg2,
                },{
                    name:'交通基础设施',
                    path:'/traffic-transport',
                    img:jioatongd,
                    changeimg1:changeimg1,
                    changeimg2:changeimg2,
                },{
                    name:'城市交通',
                    path:'/traffic-city',
                    img:chengshid,
                    // img1:chengshid1
                    changeimg1:changeimg1,
                    changeimg2:changeimg2,
                },{
                    name:'客货运输',
                    path:'/traffic-synthetical',
                    img:kehuod,
                    // img1:kehuod1,
                    changeimg1:changeimg1,
                    changeimg2:changeimg2,

                },{
                    name:'交通治理',
                    path:'/traffic-govern',
                    img:zhilid,
                    // img1:zhilid1
                    changeimg1:lastchangeimg1,
                    changeimg2:lastchangeimg2,
                }],
                actIndex:'/home',
          }
        },
        watch:{
            '$route':{
                handler(to){
                    this.currentRoute = to.name;
                    this.actIndex = `/${this.currentRoute}`
                },
                deep:true,
                immediate:true
            }
        },
    }
</script>

<style scoped lang="less">
    .BaseFooter{
        height:0.236rem;
        width:3.82rem;
        position: absolute;
        bottom:-0.12rem;
        left: 50%;
        transform: translate(-50%, -50%);
        .module-container{
            width: 2.24rem;
            margin:0 auto;
            height: 100%;
            display: flex;
            justify-content: space-between;
            flex-direction:row;
            li{
                width:20%;
                display: flex;
                justify-content: center;
                align-items:center;
                 .f_color{
                    color:#EFF5FF;
                    font-size: 0.052rem;
                    font-weight: 600;
                }
                a{
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    position: relative;
                    .iconImg {
                        position: absolute;
                        left: 0.06rem;
                    }
                    .bgImg {
                        width: 100%;
                    }
                    span {
                        position: absolute;
                        left: 0.13rem;
                        font-size: 0.04rem;
                    }
                    .activeColor{
                        color:#EFF5FF;
                    }
                }
            }
            li:nth-child(1){
                a{
                    .iconImg {
                        left: 0.12rem;
                    }
                    span {
                        left: 0.19rem;
                        font-size: 0.04rem;
                    }
                }
            }
            li:nth-child(3),li:nth-child(4){
                a{
                    .iconImg {
                        left: 0.1rem;
                    }
                    span {
                        left: 0.17rem;
                    }
                }
            }
        }
    }
</style>