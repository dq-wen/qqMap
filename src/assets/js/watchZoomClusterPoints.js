/*
 * @Description: file content
 * @Author: Wenmin He
 * @Date: 2020-07-12 14:36:48
 * @LastEditors: Wenmin He
 * @LastEditTime: 2020-09-11 14:37:21
 */
import store from '@/store'
import utils from '@/utils'
import axios from "@/axios";
class watchZoomClusterPoints {
  constructor() {
    this.eventList = {}
    this.zoom = 9
    this.gzExtent = null
    this.tempData = {}
    this.isNew = true
    this.isRenderAll = false
  }
  getList(){
    return this.eventList
  }
  setTempData(id,data) {
    delete this.tempData[id]
    this.tempData[id] = data
  }
  subscribe(type, layerId, pictureSymbol) {
    this.eventList[layerId] = {
      type,
      pictureSymbol,
    }
    this.isNew = true
    console.log(layerId)
    this.render(layerId)
  }
  unSubscribe(layerId) {
    if(layerId){
      delete this.eventList[layerId]
      utils.removeLayer(layerId)     
    } else {
      for (let key in this.eventList) {
        utils.removeLayer(key)      
        delete this.eventList[key]
      }
    }  
  }
  render(key) {
    let {view} = store.state
    let {type, pictureSymbol} = this.eventList[key]
    // console.time('聚合时间')
      // store.commit('SET_LOADING', true)
    this.getClusterPointsData(this.zoom, type, key, pictureSymbol).then(rs=>{
      console.timeEnd('聚合时间')
      // store.commit('SET_LOADING', false)
    })
    if (!this.isRenderAll) this.isNew = false;
  }
  clearAll(){
    this.eventList = {}
  }
  setZoom(zoom) {
    if(this.zoom != zoom) {
      this.isNew = true
    }
    this.zoom = zoom
  }
  renderAll(){
    this.isRenderAll = true
    Object.keys(this.eventList).map(key=>{
      this.render(key)
    })
    this.isRenderAll = false
    this.isNew = false
  }
  /**
   * 微聚合撒点
   * @param {*} url 撒点请求地址
   * @param {*} zoom 当前view.zoom
   * @param {*} layerId 图层id
   * @param {*} symbol 撒点的symbol
   */
  getClusterPointsData(z, type, layerId, symbol) {
    return new Promise((resolve, reject) => {
      console.time('聚合')

      // if (!window.watchZoomClusterPoints.isNew) {
      //   let data = JSON.parse(window.watchZoomClusterPoints.tempData[layerId])
      //   utils.dataToPoints({
      //     data,
      //     layerId,
      //     symbol,
      //     zoom: z,
      //     resolve
      //   })
      // } else {

        axios.post(`/api/coordinate/v2/combine/point`, {
          type: type,
          zoom: z,
        }).then(
          (rs) => {
            if (rs) {             
              let data = rs.data.data || []
              this.dataToPoints({
                data,
                layerId,
                symbol,
                zoom: z,
                resolve
              })
            }
          }, error =>{
            store.commit('SET_LOADING', false)
          }
        )
      // }

    })

  }
  dataToPoints(params) {
    let {
      data,
      layerId,
      symbol,
      zoom,
      resolve
    } = params
    let {
      esri: {
        Graphic,
        geometryEngine,
        Point
      },
      view,
    } = store.state;
    let clusterRenderTextSymbol = {
      type: "text",
      color: "#fff",
      font: {
        weight: "bold",
        family: "Noto Sans",
        size: "24px"
      },
      yoffset: "-12px"
    }

    let allGraphic = []
    let spatialReference = view.spatialReference
    data.map(item => {

      let {
        type,
        detail
      } = item
      let point = {
        type: "point", // autocasts as new Point()
        x: detail.lon,
        y: detail.lat,
        z: 5,
        spatialReference: spatialReference,
      }
      let geometry = new Point({
        longitude: detail.lon,
        latitude: detail.lat,
      });
      let extend = view.extent.clone()
      //判断是否在广州内
      if (this.gzExtent) {
        let inGzFlag = false
        for (let item of this.gzExtent){
          if (geometryEngine.contains(item.geometry, geometry)) {
            inGzFlag = true
            break;
          }
        }
        if (!inGzFlag) return;
      }
      //判断是否在可视区域
      if (!geometryEngine.contains(extend, geometry)) {
        return
      }
      //根据type及数量判断symbol
      let graphic = new Graphic({
        attributes: item.detail,
        geometry: point,
        symbol: symbol[0],
      })

      if (type == 'point') {
        graphic.symbol.angle = item.detail.dir - 90
        allGraphic.push(graphic)
        
      } else {
        let targetSymbol = null
        if (detail.size > 1000) {
          targetSymbol = symbol[3]
        } else if (detail.size >= 100 && detail.size < 1000) {
          targetSymbol = symbol[2]
        } else if (detail.size > 0 && detail.size < 100) {
          targetSymbol = symbol[1]
        }
        // targetSymbol.yoffset = '-42px'
        graphic.attributes = null;
        graphic.symbol = targetSymbol
        allGraphic.push(graphic)
        clusterRenderTextSymbol.text = detail.size;
        let textGraphic = graphic.clone();
        textGraphic.symbol = clusterRenderTextSymbol;
        allGraphic.push(textGraphic)
      }
    })
    this.renderClusterPoints(layerId, allGraphic, zoom)
    resolve(allGraphic.length)
  }
  renderClusterPoints(layerId, allGraphic, zoom) {
    let {
      esri: {
        GraphicsLayer,
        geometryEngine
      },
      map,
      view,
    } = store.state;
    let graphicsLayer = map.findLayerById(layerId)
    let flag
    if (graphicsLayer) {
      console.log(allGraphic.length,graphicsLayer.graphics.length)
      if (allGraphic.length === graphicsLayer.graphics.length) {
        console.log('聚合没变化')
        store.commit('SET_LOADING', false)
        // return
      }
      graphicsLayer.removeAll()
      flag = true
    } else {
      graphicsLayer = new GraphicsLayer({
        id: layerId,
        elevationInfo: {
          mode: "relative-to-scene"
        },
        featureReduction: {
          type: "selection"
        },
        screenSizePerspectiveEnabled: false
      });
    }
    graphicsLayer.addMany(allGraphic)
    if (flag) {
      graphicsLayer.visible = true
    } else {
      map.add(graphicsLayer)
    }
    // }

    
  }
}
window.watchZoomClusterPoints = new watchZoomClusterPoints()