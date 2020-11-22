//地图通用操作
import store from "../store";

let arcGisMapUtils = {
  //图层
  layer: {
    /**
     * 创建图形图层并添加到地图
     * @param arcGisApiInstance
     * @param map 地图
     * @param layerConfig 图层配置
     */
    createGraphicsLayerAndAddToMap: function (layerConfig) {
      let {
        esri,
        map,
      } = store.state;
      let opts = {
        elevationInfo: {
          mode: "relative-to-scene"
        },
        featureReduction: {
          type: "selection"
        },
        screenSizePerspectiveEnabled: false
      };
      opts = Object.assign({}, opts, layerConfig);
      let layer = new esri.GraphicsLayer(opts);
      //图层添加到地图
      map.add(layer);
      // map.addMany([layer]); // 批量添加
      return layer;
    },
    /**
     * 创建聚类图并添加到地图
     * @param map 地图
     * @param layerConfig 图层配置
     */
    createClustMapLayerAndAddToMap: function (img, layerConfig) {
      let {
        esri,
        map,
      } = store.state;
      let clusterRadius = '100px';
      // let clusterLabelThreshold = 1000;
      let clusterMinS = "84px";
      let clusterMaxS = "84px";
      let textColor = "#f0474a";
      let fontSize = "42px";
      let fillColor = "";
      let renderer_pic = {
        type: "simple",
        symbol: {
          type: "picture-marker",
          // url:`../../images/symbol/${img}.png`,//本地
          url: `/icon/${img}.png`,//生产
          width: '84px',
          height: '84px',
          xoffset: 0,//与坐标的x轴偏移
          yoffset: '21px',//与坐标的y轴偏移
        }
      };
      if (img === '公交') {
        fillColor = '#34ff5c'
      } else {
        fillColor = '#56b8ff'
      }
      let renderer = {
        type: "simple",
        symbol: {
          type: "simple-marker",
          size: "80px",
          color: fillColor,
          outline: {
            color: "rgba(0, 139, 174, 0.5)",
            width: 5
          }
        }
      };
      const clusterConfig = {
        type: "cluster",
        clusterRadius: clusterRadius,
        /*popupTemplate: { //聚合时的气泡
            content: "{cluster_count}",
            fieldInfos: [
                {
                    fieldName: "cluster_count",
                    format: {
                        places: 0,
                        digitSeparator: true
                    }
                }
            ]
        },*/
        clusterMinSize: clusterMinS,
        clusterMaxSize: clusterMaxS,
        labelsVisible: true,
        labelingInfo: [
          {
            symbol: {
              type: "text",
              color: textColor,
              font: {
                weight: "bold",
                //family: "Noto Sans",
                size: fontSize
              }
            },
            xoffset: 0,
            yoffset: 0,
            labelPlacement: "center-center",
            labelExpressionInfo: {
              expression: "$feature.cluster_count"
            },
            // where: `cluster_count < ${clusterLabelThreshold}`
          },
          {
            symbol: {
              type: "text",
              color: textColor,
              font: {
                weight: "bold",
                family: "Noto Sans",
                size: fontSize
              }
            },
            xoffset: 0,
            yoffset: 0,
            labelPlacement: "center-center",
            labelExpressionInfo: {
              /* expression: `
                     var value = $feature.cluster_count;
                     var num = Count(Text(Round(value)));
                     Decode(num,             
                       4, Text(value / Pow(10, 3), "##.0k"),
                       5, Text(value / Pow(10, 3), "##k"),
                       6, Text(value / Pow(10, 3), "##k"),
                       7, Text(value / Pow(10, 6), "##.0m"),
                       Text(value, "#,###")
                     );`*/
            },
            // where: `cluster_count >= ${clusterLabelThreshold}`
          },

        ]
      };
      let layerDefinition = {
        featureReduction: clusterConfig,
        /*popupTemplate: { //单个时的气泡
            content: "单个时的气泡",
        },*/
        title: "聚合图层",
        renderer: renderer_pic//渲染器
        // renderer: renderer//渲染器
      };
      layerDefinition = Object.assign({}, layerDefinition, layerConfig);
      let clustMapLayer = new esri.FeatureLayer(layerDefinition);
      map.add(clustMapLayer);
      return clustMapLayer;
    },
    /**
     * 创建要素图层并添加到地图
     * @param arcGisApiInstance
     * @param map 地图
     * @param layerConfig 图层配置
     */
    createFeatureLayerAndAddToMap: function (layerConfig) {
      let {
        esri,
        map,
      } = store.state;
      let featureMapLayer = new esri.FeatureLayer(layerConfig);
      map.add(featureMapLayer);
      return featureMapLayer;
    }
  },
};

export default arcGisMapUtils;
