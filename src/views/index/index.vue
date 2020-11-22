<template>
  <div class="map-wrapper" :style="`cursor: ${cursor}`">
    <!-- 地图容器 -->
    <div id="viewDiv" style="width: 100%; height: 100%">
      <div class="map-bg"></div>
    </div>

    <div class="screen-content" v-if="mapLoading">
      <div class="name-tips" v-followMap.top.index="'tip'" v-if="tipShow">{{ layerName }}</div>
      <router-view />
    </div>

    <baseFooter></baseFooter>
  </div>
</template>

<script>
import esriLoader from "esri-loader";
import myUtils from "@/utils";
import { mapState, mapMutations } from "vuex";
import baseFooter from '@/components/BaseFooter/BaseFooter'
export default {
  name: "map-wrapper",
  components:{
    baseFooter
  },
  data() {
    return {
      cursor:"default",
      tipShow:false,
      layerName:'',
      mapLoading:false,
    }
  },
  computed: {
    ...mapState([
      "mapExtent",
      "view",
      "map",
      "esri",
    ])
  },
  methods:{
    ...mapMutations([
      "SET_MAP",
      "SET_CURRENT_GRAPHIC",
      "SET_MAP_EXTENT",
    ]),
  },
  mounted() {
    let self = this;
    esriLoader.loadModules([
          "esri/Map",
          "esri/views/SceneView",
          "esri/views/MapView",
          "esri/layers/SceneLayer",
          "esri/layers/FeatureLayer",
          "esri/layers/MapImageLayer",
          "esri/layers/IntegratedMeshLayer",
          "esri/layers/TileLayer",
          "esri/Basemap",
          "esri/widgets/BasemapGallery",
          "esri/geometry/Polygon",
          "esri/geometry/Extent",
          "esri/Graphic",
          "esri/geometry/Point",
          "esri/symbols/PictureMarkerSymbol",
          "esri/layers/GraphicsLayer",
          "esri/geometry/Circle",
          "esri/symbols/LineSymbol",
          "esri/Camera",
          "esri/layers/ElevationLayer",
          "esri/tasks/QueryTask",
          "esri/tasks/support/Query",
          "esri/widgets/Sketch",
          "esri/widgets/Sketch/SketchViewModel",
          "esri/widgets/Expand",
          "esri/geometry/geometryEngine",
          "esri/core/watchUtils"
        ]
      )
      .then(function([
        Map,
        SceneView,
        MapView,
        SceneLayer,
        FeatureLayer,
        MapImageLayer,
        IntegratedMeshLayer,
        TileLayer,
        Basemap,
        BasemapGallery,
        Polygon,
        Extent,
        Graphic,
        Point,
        PictureMarkerSymbol,
        GraphicsLayer,
        Circle,
        LineSymbol,
        Camera,
        ElevationLayer,
        QueryTask,
        Query,
        Sketch,
        SketchViewModel,
        Expand,
        geometryEngine,
        watchUtils
      ]) {
        let utils = [
          "Map",
          "SceneView",
          "MapView",
          "SceneLayer",
          "FeatureLayer",
          "MapImageLayer",
          "IntegratedMeshLayer",
          "TileLayer",
          "Basemap",
          "BasemapGallery",
          "Polygon",
          "Extent",
          "Graphic",
          "Point",
          "PictureMarkerSymbol",
          "GraphicsLayer",
          "Circle",
          "LineSymbol",
          "Camera",
          "ElevationLayer",
          "QueryTask",
          "Query",
          "Sketch",
          "SketchViewModel",
          "Expand",
          "geometryEngine",
          "watchUtils"
        ];
        let esri = {};
        utils.map((item, i) => {
          esri[item] = arguments[0][i];
        });
        self.arcGisApiInstance = esri;
        var imageBasemap = new Basemap({
          baseLayers: [
            new TileLayer({
              url:
                "http://10.194.69.43/server/rest/services/GDBasemap/MapServer"
            }),
            new TileLayer({
              id: "gzyx",
              url:
              // "http://10.194.150.155:8010/ServiceAccess/MapService-T/2016年电子地图(广州2000坐标系)_/19f3612a2b44e98baae1f40713a085b6"
                "http://10.194.150.155:8010/ServiceAccess/MapService-T/2017年卫星影像地图_广州2000坐标系_/19f3612a2b44e98baae1f40713a085b6"
            })
          ]
        });
        var map = new Map({
          basemap: imageBasemap
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
        });
        window.myview = view;

        let timer = null;
        //监听地图可视范围发生变化
        watchUtils.watch(view, "stationary", function(
          newValue,
          oldValue,
          propertyName,
          target
        ) {
          if (target.stationary) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
              let z = 12;
              if (view.zoom < 12) {
                z = 12;
              } else if (view.zoom >= 17) {
                z = 17;
              } else {
                z = parseInt(view.zoom);
              }
              //执行渲染聚合
              window.watchZoomClusterPoints.setZoom(z);
              window.watchZoomClusterPoints.renderAll();
              timer = null;
            }, 300);
          }
        });
        
        let targetGraphic;
        view.on("pointer-move", event => {
          view.hitTest(event).then(response => {
            let result = response.results[0];
     
            if (result) {
              let graphic = result.graphic;
              if (!graphic.attributes) return;
              if (
                graphic.geometry.type == "point" ||
                graphic.geometry.type == "polygon" ||
                graphic.geometry.type == "polyline"
              ) {
                self.cursor = "pointer";
              } else {
                self.cursor = "default";
              }

              if (targetGraphic == graphic.attributes) return;
              targetGraphic = graphic.attributes;
              let layerId = graphic.layer.id;
              if (layerId.indexOf("-tip") !== -1) {
                let matchValue = layerId.match(/\(.*\)/);
                let nameKey = Array.isArray(matchValue)
                  ? matchValue[0].substring(1, matchValue[0].length - 1)
                  : "NAME";
                self.SET_CURRENT_GRAPHIC(graphic);
                self.layerName = graphic.attributes[nameKey];
                if (self.tipShow) {
                  self.tipShow = false;
                  setTimeout(() => {
                    self.tipShow = true;
                  });
                } else {
                    self.tipShow = true;
                }
              }
            } else {
              self.tipShow = false;
              self.cursor = "default";
              targetGraphic = null;
            }
          });
        });

        view.ui.remove("zoom"); //清除放大缩小按钮
        view.ui.remove("attribution"); //清除底部powered by ESRI
        view.ui.remove("navigation-toggle"); //清除导航按钮
        view.ui.remove("compass"); //清除 指南针按钮

        /*****************************************添加框选查询工具 结束 *********************************/
        self.mapViexw = view;
        self.mapInstant = map;
        self.SET_MAP({
          map,
          view,
          esri
        });

        view.when(function() {
          self.View = view;
          self.mapLoading = true;
          myUtils.zoomLayer();
          // self.initLayers();
        });

        //添加行政区划图层
        myUtils.queryGeometry(
           "http://10.194.69.99/proxy/rest/services/99408a6c-8c0a-444f-b1c6-16823ed8cc4a/9797d3bc-9ee6-4459-b867-93d069458257/mapserver/2/query"
          )
          .then(rs => {
            let allGraphic = [];
            console.log("rs区域界线", rs);
            let newExtent = [];
            rs.map((item, index) => {
              var symbol = {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "rgba(0,176,249, 0.3)",
                style: "solid",
                outline: {
                  color: "#69ffff", //"white",
                  width: 1
                }
              };
              var fillGraphic = new Graphic({
                attributes: item.attributes,
                geometry: item.geometry,
                symbol: symbol
              });
              allGraphic.push(fillGraphic);
              newExtent.push(fillGraphic.clone());
            });
            // self.layersOpts.areaLayer.addMany(allGraphic);
            // map.add(self.layersOpts.areaLayer);
            setTimeout(() => {
              window.watchZoomClusterPoints.gzExtent = newExtent;
            });
          });
        
    })
  },
};
</script>
<style lang="less">
.map-wrapper{
  height: 2.16rem;
  width: 11.52rem;
  position: relative;
  color: #fff;
  .map-bg {
    pointer-events:none;
    width: 100%;
    height: 100%;
    background: url("./images/map-bg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .screen-content {
    .module-wh();
    position: absolute;
    padding-top: 0.27rem;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    .name-tips {
      display: inline-block;
      font-size: 0.03rem;
      color: #fff;
      line-height: 0.045rem;
      padding: 0.02rem 0.03rem;
      max-width: 0.6rem;
      background-color: rgba(0, 0, 0, 0.4);
      transform: translateY(-0.1rem);
      position: absolute;
    }
  }
  
}
</style>