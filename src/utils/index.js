/*
 * @Description: file content
 * @Author: Wenmin He
 * @Date: 2020-07-09 17:28:40
 * @LastEditors: Wenmin He
 * @LastEditTime: 2020-09-12 14:59:05
 */
import axios from "@/axios";
import store from "../store";




const utils = {
  /**
   * 数据接口请求方法
   * @param {S} api 接口地址后缀
   * @param {O} param 接口参数
   */
  getData(api, param) {
    let baseUrl = `http://10.198.246.32/ebus/gzshpqsjfwpt`;
    let paramArr = [];
    if (typeof param === "object") {
      for (let key in param) {
        paramArr.push(`${key}=${param[key]}`);
      }
    }
    let url = `${baseUrl}${api}${
      paramArr.length ? "?" + paramArr.join("&") : ""
      }`;
    let apiName = api.split("/");
    apiName = apiName[apiName.length - 1];
    return new Promise((resolve, reject) => {
      axios
        .post(`/api/requestByHzUrl?${apiName}`, {
          url,
        })
        .then(
          (rs) => {
            if (rs) {
              resolve(rs.data);
            } else {
              console.log("失败", url);
              reject();
            }
          },
          (error) => {
            reject(error);
          }
        )
        .catch((rs) => {
          reject(rs);
        });
    });
  },

  /**
   * 地图撒点方法
   * @param {S} id 图层id 命名规则:模块名-
   * @param {O || A} symbols 撒点的图标，可支持多个symbol, 多个symbol请传数组
   * @param {A} data 包含经纬度的数据，同时会将数据存放到图层的attribute里，用于后续图层点击传值
   * @param {A} visible 控制图层显示隐藏，默认显示
   */
  addPoints(id, symbols, data, isClear=true, visible = true) {
    console.log('data',data)
    let {
      esri: {
        Graphic,
        GraphicsLayer
      },
      map,
      view,
    } = store.state;
    let graphicsLayer = map.findLayerById(id)
    let flag
    if (graphicsLayer) {

      if (isClear) {
        graphicsLayer.removeAll()
      }
      flag = true
    } else {
      graphicsLayer = new GraphicsLayer({
        id: id,
        elevationInfo: {
          mode: "relative-to-scene"
        },
        featureReduction: {
          type: "selection"
        },
        screenSizePerspectiveEnabled: false
      });
    }
    let allPiont = []
    data.map(item => {
      let point = {
        type: "point", // autocasts as new Point()
        x: Number(item.longitude),
        y: Number(item.latitude),
        z: 5,
        spatialReference: view.spatialReference,
      };
      //判断是否多个symbol
      if (Array.isArray(symbols)) {
        symbols.map((symbol) => {
          addSymbol(symbol);
        });
      } else {
        addSymbol(symbols);
      }
      // newData.siteid = "graphicItem";
      function addSymbol(symbol) {
        let pointGraphic = new Graphic({
          attributes: item,
          geometry: point,
          symbol: symbol,
        });
        // Create a symbol for drawing the point
        graphicsLayer.add(pointGraphic);
        // allPiont.push(pointGraphic)
      }
    });
    // if (data.length > 30) {
    // clusterUtil.addGraphicCluster(graphicsLayer, allPiont, 300); //聚合点
    // }
    if (flag) {
      graphicsLayer.visible = visible;
    } else {
      map.add(graphicsLayer);
      graphicsLayer.visible = visible;
    }

  },

  /**
  * 地图撒点方法
  * @param {S} id 图层id 命名规则:模块名-
  * @param {O || A} symbols 撒点的图标，可支持多个symbol, 多个symbol请传数组
  * @param {A} data 包含经纬度的数据，同时会将数据存放到图层的attribute里，用于后续图层点击传值
  * @param {s} code 高亮的id
  * @param {A} visible 控制图层显示隐藏，默认显示
  */
  addPointsLight(id, symbols, data, index, value, visible = true) {
    let {
      esri: {
        Graphic,
        GraphicsLayer
      },
      map,
      view,
    } = store.state;

    let graphicsLayer = map.findLayerById(id)
    let flag
    if (graphicsLayer) {
      graphicsLayer.removeAll()
      flag = true
    } else {
      graphicsLayer = new GraphicsLayer({
        id: id,
        elevationInfo: {
          mode: "relative-to-scene"
        }
      });
    }
    let allPiont = [];
    let graphicLight;
    data.map(item => {
      let newData = {
        ...item,
      };
      let point = {
        type: "point", // autocasts as new Point()
        x: newData.LONGITUDE,
        y: newData.LATITUDE,
        z: 5,
        spatialReference: view.spatialReference,
      };
      //判断是否多个symbol
      if (Array.isArray(symbols)) {
        symbols.map((symbol) => {
          addSymbol(symbol);
        });
      } else {
        addSymbol(symbols);
      }
      // newData.siteid = "graphicItem";
      function addSymbol(symbol) {
        let pointGraphic = new Graphic({
          attributes: newData,
          geometry: point,
          symbol: symbol,
        });
        if (newData[index] == value) {
          graphicLight = pointGraphic;
        }
        // Create a symbol for drawing the point
        graphicsLayer.add(pointGraphic);
        allPiont.push(pointGraphic)
      }
    });

    if (flag) {
      graphicsLayer.visible = visible;
    } else {
      map.add(graphicsLayer);
      graphicsLayer.visible = visible;
    }
    if (graphicLight) {
      view.whenLayerView(graphicLight.layer).then(function (lyrView) {
        map.highlight = lyrView.highlight(graphicLight);
      });
      if (graphicLight.geometry) {
        utils.zoomLayer(graphicLight.geometry)
      }
    }
  },

  //撒微聚合点
  addGraphicCluster(graphicsOld, clusterRadius) {
    let {
      esri: {
        textSymbol,
        GraphicsLayer
      },
      view,
    } = store.state;
    let graphicsLayer = new GraphicsLayer();

    if (!clusterRadius) clusterRadius = 100;

    var clusterArr = new Array();

    while (graphicsOld.length > 0) {
      //var graphics = cloneGraphic(graphicsOld);
      var graphics = graphicsOld;
      var centerPointIndex = Math.ceil(Math.random() * graphics.length) - 1;
      var centerPoint = graphics[centerPointIndex];

      graphics.splice(centerPointIndex, 1);

      var cluster = new Array();
      cluster.push(centerPoint);

      for (var i = 0; i < graphics.length; i++) {
        if (isCluster(centerPoint, graphics[i], clusterRadius)) {
          cluster.push(graphics[i]);
          graphics.splice(i, 1);
          i--;
        }
      }
      clusterArr.push(cluster);
    }
    var clusterPointsArray = new Array();
    clusterArr.forEach(function (clusterPoints) {
      if (clusterPoints.length > 8) {
        var showGraphic = clusterPoints[
          Math.ceil((clusterPoints.length - 1) / 2)
        ].clone();
        showGraphic.symbol = getTextSymbol(clusterPoints.length);
        clusterPointsArray.push(showGraphic);
      } else {
        clusterPointsArray.push(clusterPoints[0]);
      }
    });
    graphicsLayer.addMany(clusterPointsArray);

    function isCluster(point1, point2, clusterRadius) {
      var screen1 = view.toScreen({
        type: "point",
        x: point1.geometry.x,
        y: point1.geometry.y,
        hasZ: false,
        spatialReference: view.spatialReference,
      });

      var screen2 = view.toScreen({
        type: "point",
        x: point2.geometry.x,
        y: point2.geometry.y,
        hasZ: false,
        spatialReference: view.spatialReference,
      });

      let deltaX = screen1.x - screen2.x;
      let deltaY = screen1.y - screen2.y;
      let result = clusterRadius > Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      return result;
    }

    function getTextSymbol(text) {
      var textSymbol = {
        type: "text", // autocasts as new TextSymbol()
        color: "white",
        haloColor: "black",
        haloSize: "1px",
        text: "数量:" + text,
        xoffset: 3,
        yoffset: 3,
        font: {
          // autocasts as new Font()
          size: 52,
          family: "Josefin Slab",
          weight: "bold",
        },
      };

      return textSymbol;
    }
    return graphicsLayer;
  },
  /**
   * 地图添加单个面方法
   * @param {S} id 图层id
   * @param {A} data 包含经纬度的数据，同时会将数据存放到图层的attribute里，用于后续图层点击传值
   * @param {A} fillSymbol 图标面渲染样式symbol
   * @param {A} name 指定高亮数据
   */
  addPolygon(id, data, fillSymbol, name) {
    let {
      esri: {
        Graphic,
        GraphicsLayer
      },
      map,
      view,
    } = store.state;
    let polygonGraphicsLayer = map.findLayerById(id);
    if (!polygonGraphicsLayer) {
      polygonGraphicsLayer = new GraphicsLayer({
        id: id,
      });
      map.add(polygonGraphicsLayer);
    }
    var polygon = {
      type: "polygon",
      rings: data.geometry.rings,
      spatialReference: view.spatialReference,
    };
    var polygonGraphic = new Graphic({
      attributes: data.attributes,
      geometry: polygon,
      symbol: fillSymbol,
    });
    polygonGraphicsLayer.add(polygonGraphic);
    //默认显示的高亮数据
    if (!name || name == "") return;
    let matchValue = id.match(/\(.*\)/);
    let nameKey = Array.isArray(matchValue) ?
      matchValue[0].substring(1, matchValue[0].length - 1) :
      null;
    if (nameKey && data.attributes[nameKey] == name) {
      view.whenLayerView(polygonGraphic.layer).then(function (lyrView) {
        map.highlight = lyrView.highlight(polygonGraphic);
      });
      if (polygonGraphic.geometry) {
        utils.zoomLayer(polygonGraphic.geometry)
      }
    }
  },
  /**
   * 
   * @param {*} id 图层id
   * @param {*} data 数据
   * @param {*} symbol symbol
   * @param {*} isClear 是否需要清空图层 true:清空所有symbol false:保留图层下的symbol
   */
  addLines(id, data, symbol, isClear=true, visible=true) {
    let {
      esri: {
        Graphic,
        GraphicsLayer
      },
      map,
      view,
    } = store.state;
    let graphicsLayer = map.findLayerById(id)
    let flag
    if (graphicsLayer) {
      if (isClear) {
        graphicsLayer.removeAll()
      }
      flag = true
    } else {
      graphicsLayer = new GraphicsLayer({
        id: id,
        elevationInfo: {
          mode: "relative-to-scene"
        },
        featureReduction: {
          type: "selection"
        },
        screenSizePerspectiveEnabled: false
      });
    }
    data.map(item => {
      let graphic = new Graphic({
        attributes: item.attributes,
        geometry: item.geometry,
        symbol: symbol,
      });
      // Create a symbol for drawing the point
      graphicsLayer.add(graphic);
    });
    if (flag) {
      graphicsLayer.visible = visible;
    } else {
      map.add(graphicsLayer);
      graphicsLayer.visible = visible;
    }
  },
  /**
 * 缩放到范围无倾斜视角
 * @param {O} geometry Graphic.geometry//不传值缩放至首页全图
 */
  zoomLayer(geometry) {
    let {
      esri: {
        Camera,
        Extent
      },
      view,
    } = store.state;
    if (geometry && geometry.type == "polygon") {
      let zoomExtent = new Extent({ //根据几何图形范围大小缩放
        type: "extent",
        xmax: geometry.extent.xmax + 5000,
        xmin: geometry.extent.xmin - 5000,
        ymax: geometry.extent.ymax + 2000,
        ymin: geometry.extent.ymin - 2000,
        spatialReference: view.spatialReference
      });
      view.goTo({
        target: zoomExtent,
        heading: 0,
        tilt: 0,
      });
    } else if (geometry && geometry.type == "point") {
      var cam = new Camera({ //全局视角//根据几何点定位缩放
        fov: 55,
        heading: 0,
        tilt: 0,
        postition: {
          x: geometry.x,
          y: geometry.y,
          z: geometry.z,
          type: "point",
          spatialReference: view.spatialReference
        }
      });
      view.goTo(cam);
    }else if(geometry && geometry.type == "polyline"){
      let extent = geometry.extent
      extent.expand(2)//2倍缩放地图(拥堵列表连续点击同一个的时候出现效果)
      view.goTo({
        target: extent
      }, { duration: 800 });
    } else {
      if (Extent && view) {
        let zoomExtent = new Extent({ //默认全局范围
          type: "extent",
          xmax: 149868.08667397514,//xmax: 120954.14882665468,
          xmin: -45610.72113490867,//xmin: 4307.306639878516,
          ymax: 246026.09587337417,//ymax: 257437.4930380493,
          ymin: 209373.81940920846,//ymin: 213694.92721800823,
          spatialReference: view.spatialReference
      });
        // view.extent = zoomExtent
        view.goTo({
          target: zoomExtent
        }, { duration: 800 });
        this.clearMap()
      }
    }
  },
  /**
 * 缩放到范围具有倾斜视角，在三维底图情况下使用
 * @param {O} geometry Graphic.geometry//不传值缩放至首页全图
 * @param {D} heading 方向（以度为单位），正北为0，顺时针旋转，不传值为默认倾斜度
 * @param {D} tilt 倾斜度（以度为单位，平铺倾斜为0，不传值为默认倾斜度
 */
  zoomLayerTilt(geometry, heading = 0.86, tilt = 44) {
    let {
      esri: {
        Camera,
        Extent
      },
      view,
    } = store.state;

    if (geometry && geometry.type == "polygon") {
      let zoomExtent = new Extent({//根据几何图形范围大小缩放
        type: "extent",
        xmax: geometry.extent.xmax + 5000,
        xmin: geometry.extent.xmin - 5000,
        ymax: geometry.extent.ymax + 2000,
        ymin: geometry.extent.ymin - 2000,
        spatialReference: view.spatialReference
      });
      view.goTo({
        target: zoomExtent,
        heading: heading,
        tilt: tilt,
      }, { duration: 600 });
    } else if (geometry && geometry.type == "point") {
      var cam = new Camera({//全局视角//根据几何点定位缩放
        fov: 55,
        heading: heading,
        tilt: tilt,
        postition: {
          x: geometry.x,
          y: geometry.y,
          z: geometry.z,
          type: "point",
          spatialReference: view.spatialReference
        }
      });
      view.goTo(cam, { duration: 600 });
    } else {
      let zoomExtent = new Extent({//默认全局范围
        type: "extent",
        xmax: 120954.14882665468,
        xmin: 4307.306639878516,
        ymax: 257437.4930380493,
        ymin: 213694.92721800823,
        spatialReference: view.spatialReference
      });
      view.goTo({
        target: zoomExtent,
        heading: heading,
        tilt: tilt,
      }, { duration: 600 });
    }

    // view.zoomIn();
  },
  /**
     * 地图下钻到某个点公用方法
     * @param {o} graphic 
     */
  mapDirllTo(graphic, z = 5) {
    let {
      esri: {
        Camera
      },
      map,
      view,
    } = store.state;
    let geometry = graphic.geometry
    var cam = new Camera({
      fov: 0,
      heading: 1.0219223456641569, // face due east
      tilt: 30, // looking from a bird's eye view
      position: {
        x: geometry.x,
        y: geometry.y,
        z: z,
        spatialReference: view.spatialReference
      }
    });
    return new Promise((resolve, reject) => {
      let animation = view.goTo(cam, {
        duration: 600
      }).then(() => {
        view.goTo(geometry)
        resolve()
      });
    })

  },
  /**
   * 删除图层
   * @param {S} id //需要删除的图层id
   * @param {Boolean} flag //true清除、 false隐藏
   */
  removeLayer(id, flag = true) {
    let {
      map
    } = store.state;
    if (flag) {
      map.remove(map.findLayerById(id));
    } else {
      map.findLayerById(id).visible = false
    }
    // map.findLayerById(id).visible = false
  },
  /**
 * layers 显示的图层
 * 显示地图图层
 */
  showLayers(layers = []) {
    let { map, esri } = store.state;
    map.layers.items.map(item => {
      if (layers.length && layers.indexOf(item.id) != -1) {
        item.visible = true
      }
    })
  },
  /**
   * layers 显示的图层
   * 隐藏地图图层
   */
  hideLayers(layers = []) {
    let { map, esri } = store.state;
    let itemIds = map.layers.items.map(item => item.id)
    itemIds.map(item => {
      if (!layers.length || layers.indexOf(item) == -1) {
        let layer = map.findLayerById(item)
        layer.visible = false
      }
    })
  },
  /**
 * layers 保留的涂层
 * 清理地图图层
 */
  clearMap(layers = [], isHidden = false) {
    let {
      map,
      esri
    } = store.state;
    let itemIds = map.layers.items.map(item => item.id)
    itemIds.map(item => {
      if (layers.length && layers.indexOf(item) !== -1) {
        // item.visible = true 
      } else {
        let layer = map.findLayerById(item)
        layer.visible = false
        if (item !== 'sketch-layer' && isHidden) {
          if (!isHidden) {
            map.remove(layer)
          }

        }
      }
    })
    watchZoomClusterPoints.clearAll()
    // map.findLayerById('sketch-layer').visible = false
  },
  /**
   * 转换坐标系
   * @param {A} list 需要转换的坐标系数组，必须带有latitude,longitude,location_type
   * @param {S} originType 源坐标系类型
   * @param {S} targetType 转换至坐标系类型
   */
  chansformLocation(
    list,
    originType,
    targetType,
    latName = "LATITUDE",
    lonName = "LONGITUDE"
  ) {
    return new Promise((resolve, reject) => {

      let chansformData = list.map((item) => {
        return {
          latitude: item[latName],
          longitude: item[lonName],
          location_type: originType,
        };
      });
      if (originType == 'GZ2000') resolve(chansformData);
      chansformData = JSON.stringify(chansformData);
      axios.post(
        "/api/agCoordTransController/coordinateSystemConversion?location_type=" +
        targetType,
        chansformData
      )
        .then(
          (rs) => {
            if (rs) {
              resolve(rs.data);
            } else {
              // console.log('失败', url)
              reject();
            }
          },
          (error) => {
            reject(error);
          }
        )
        .catch((rs) => {
          reject(rs);
        });
    });
  },
  /**
   *
   *获取元素可视宽高
   * @param {dom} el
   * @returns
   */
  getDomSize(el) {
    let w = el.clientWidth;
    let h = el.clientHeight;
    return {
      w,
      h,
    };
  },
  /**
   * 日期格式化
   */
  dateFormat(date, formatStr) {
    let str = formatStr;
    let Week = ["日", "一", "二", "三", "四", "五", "六"];

    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(
      /yy|YY/,
      date.getYear() % 100 > 9 ?
        (date.getYear() % 100).toString() :
        "0" + (date.getYear() % 100)
    );

    str = str.replace(
      /MM/,
      date.getMonth() > 9 ?
        (date.getMonth() + 1).toString() :
        "0" + (date.getMonth() + 1)
    );
    str = str.replace(/M/g, date.getMonth() + 1);

    str = str.replace(/w|W/g, Week[date.getDay()]);

    str = str.replace(
      /dd|DD/,
      date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate()
    );
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(
      /hh|HH/,
      date.getHours() > 9 ? date.getHours().toString() : "0" + date.getHours()
    );
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(
      /mm/,
      date.getMinutes() > 9 ?
        date.getMinutes().toString() :
        "0" + date.getMinutes()
    );
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(
      /ss|SS/,
      date.getSeconds() > 9 ?
        date.getSeconds().toString() :
        "0" + date.getSeconds()
    );
    str = str.replace(/s|S/g, date.getSeconds());

    return str;
  },
  /************************************多方会商****************************************/
  /**
   * 接口请求处理，传参与axios的option配置一样
   * @param {Sting} url 接口地址
   * @param {Sting} method 接口请求方式，GET、POST等等
   * @param {Object} params 参数以query方式传入
   * @param {Object} data 参数以body方式传入
   */
  request(option) {
    return new Promise((resolve, reject) => {
      axios(option)
        .then(
          (rs) => {
            if (rs) {
              resolve(rs.data);
            } else {
              reject();
            }
          },
          (error) => {
            reject(error);
          }
        )
        .catch((rs) => {
          reject(rs);
        });
    });
  },
  /**
   * 预警点画周边范围圈
   * @param {*} latitude 经度
   * @param {*} longitude 维度
   */
  warningArea(latitude, longitude) {
    let {
      esri: {
        Graphic,
        Circle,
        Point,
        GraphicsLayer
      },
      map,
      view,
    } = store.state;
    let graphicsLayer = map.findLayerById('sketch-layer');
    graphicsLayer.removeAll()
    let point = new Point({
      x: latitude,
      y: longitude,
      spatialReference: view.spatialReference
    })
    let polygon = new Circle({
      radius: 1,
      radiusUnit: 'kilometers',
      center: point
    })
    let polygonSymbol = {
      //图形样式
      type: "simple-fill",
      color: [0, 255, 255, 0.8],
      style: "solid",
      outline: {
        color: "white",
        width: 1,
      },
    }
    let polygonGraphic = new Graphic({
      attributes: 'warningArea',
      geometry: polygon,
      symbol: polygonSymbol
    });
    graphicsLayer.add(polygonGraphic)
    store.commit('SET_MAP_EXTENT', new Date())
  },
  /**
   * query奥格坐标查询公共方法
   * @param {s} url query地址
   * @param {s} where query条件 默认值 "1=1"
   */
  queryGeometry(url, where = "1=1") {
    let {
      esri: {
        QueryTask,
        Query
      },
    } = store.state
    return new Promise((resolve, reject) => {
      var sqUrl = url; // Represents the REST endpoint for a layer of cities.
      var sqQueryTask = new QueryTask({
        url: sqUrl
      });
      var query = new Query();
      query.returnGeometry = true;
      query.outFields = ["*"];
      query.where = where
      sqQueryTask.execute(query).then(function (results) {
        resolve(results.features)
      }, () => {
        reject()
      })
    })
  },
  /**
   * 转换坐标系
   * @param {A} list 需要转换的坐标系数组，必须带有latitude,longitude,location_type
   * @param {S} originType 源坐标系类型
   * @param {S} targetType 转换至坐标系类型
   */
  chansformLocation(
    list,
    originType,
    targetType,
    latName = "latitude",
    lonName = "longitude"
  ) {
    return new Promise((resolve, reject) => {

      let chansformData = list.map((item) => {
        return {
          latitude: item[latName],
          longitude: item[lonName],
          location_type: originType,
        };
      });
      if (originType == 'GZ2000') resolve(chansformData);
      chansformData = JSON.stringify(chansformData);
      axios.post(
        "/api/agCoordTransController/coordinateSystemConversion?location_type=" +
        targetType,
        chansformData
      )
        .then(
          (rs) => {
            if (rs) {
              resolve(rs.data);
            } else {
              // console.log('失败', url)
              reject();
            }
          },
          (error) => {
            reject(error);
          }
        )
        .catch((rs) => {
          reject(rs);
        });
    });
  }
};
export default utils;