<template>
  <div class="home">
    <div class="main_L">
      <div class="main_L_L">
        <div class="com-title">港口口岸基础服务</div>
      </div>
      <div class="main_L_R">
        <div class="com-title">港口口岸运营服务</div>
      </div>
    </div>
    <div class="main_R">
      <div class="main_R_L">
        <div class="com-title">航空口岸基础服务</div>
      </div>
      <div class="main_R_R">
        <div class="com-title">航空口岸运营服务</div>
      </div>
    </div>

    <mapTool 
      pageType="1"
      @selectVal="selectVal"
      @unSelectVal="unSelectVal"
    />
  </div>
</template>
<script>
import mapTool from '@/components/map-tool'
import myUtils from "@/utils";
import { mapState, mapMutations } from "vuex";
export default {
  name:'home',
  components:{
    mapTool
  },
  computed: {
    ...mapState(["map", "view", "esri"])
  },
  methods:{
     selectVal(data) {
      console.log('选中',data)
      let menu_name = data.MENU_NAME;
      // switch(menu_name){
      //   case '地铁':
      //     this.getSubwayLine(true)
      //   break;
      //   case '地铁站':
      //     this.getSubwayDigitalMap(true)
      //   break;
      //   case '公交':
      //     this.getBusTaxi('gj',2)
      //   break;
      //   case '出租车':
      //     this.getBusTaxi('cz',3)
      //   break;
      //   default:
      // }
      
    },

    unSelectVal(data) {
      console.log('取消选中',data)
      let menu_name = data.MENU_NAME;
      // switch(menu_name){
      //   case '地铁':
      //     this.getSubwayLine(false)
      //   break;
      //   case '地铁站':
      //     this.getSubwayDigitalMap(false)
      //   break;
      //   case '公交':
      //     window.watchZoomClusterPoints.unSubscribe();
      //   break;
      //   case '出租车':
      //     window.watchZoomClusterPoints.unSubscribe();
      //   break;
      //   default:
      // }
    },

  }
}
</script>
<style lang="less" scoped>
.home{
  .module-wh();
  .main_L{
    pointer-events:auto;
    height:calc(100% - 0.04rem);
    margin:0 0 0.04rem 0.09rem;
    float: left;
    .main_L_L{
      width: 1.6rem;
      height:100%;
      float: left;
      background:@com-bg-color;
      
    }
     .main_L_R{
      width: 1.6rem;
      height:100%;
      float: left;
      margin-left:0.04rem;
      background:@com-bg-color;
    }
  }
  .main_R{
    float:right;
    height:calc(100% - 0.04rem);
    margin:0 0.09rem 0.04rem 0;
    pointer-events:auto;
    .main_R_L{
      width: 1.6rem;
      height:100%;
      float: left;
      background:@com-bg-color;
    }
    .main_R_R{
      width: 1.6rem;
      height:100%;
      float: left;
      margin-left:0.04rem;
      background:@com-bg-color;
    }
  }
}
</style>