/*
 * @Description: file content
 * @Author: Wenmin He
 * @Date: 2020-07-12 14:36:48
 * @LastEditors: Wenmin He
 * @LastEditTime: 2020-08-27 21:14:22
 */
import store from '@/store'
import utils from '@/utils'
class DomFollowMap {
  constructor() {
    this.followList = {}
    this.viewWatchEvent = null
  }
  getList(){
    return this.followList
  }
  subscribe(id, el, graphic, position, type) {
    let page = type || store.state.type
    let pageFollowList = this.followList[page]
    if (!pageFollowList) pageFollowList = []
    let followInfo = { id, el, graphic, position }
    let isSame = null

    pageFollowList.find((item, index)=>{
      if (followInfo.graphic == item.graphic) {
        isSame = index
      }
      return followInfo.graphic == item.graphic
    })

    if (isSame!==null){
      pageFollowList.splice(isSame,1,followInfo)
    } else {
      pageFollowList.push(followInfo) 
    }
    this.followList[page] = pageFollowList
    setTimeout(()=>{
      this._setPosition(el, position, graphic.geometry)
      this._publish()
    },20)  
  }
  unSubscribe() {
    this.followList.delete(this.type)
  }
  _publish() {
    let {view} = store.state
    if (this.viewWatchEvent) this.viewWatchEvent.remove();
    this.viewWatchEvent = view.watch("extent", (e) => {
      if (Object.keys(this.followList).length == 0) return;
      for (let type in this.followList) {
        this.followList[type].map(item => {
          let { el, graphic, position } = item
          this._setPosition(el, position, graphic.geometry)
        })
      }

    });
  }
  _setPosition(el, position, geometry) {
    let { w, h } = utils.getDomSize(el)
    let {view} = store.state
    let positionInfo = {}
    let xCenter;
    let yCenter;
    if(geometry.type==="point"){
      xCenter=geometry.x
      yCenter= geometry.y
    }else if(geometry.type==="polygon"){
      xCenter=geometry.extent.center.x
      yCenter=geometry.extent.center.y
    } else if (geometry.type==="polyline") {
      xCenter=geometry.extent.center.x
      yCenter=geometry.extent.center.y
    }
    let screenPoint = view.toScreen({
      type: 'point',
      x: xCenter,//geometry.x,
      y: yCenter,//geometry.y,
      // z: 15,
      hasZ: true,
      spatialReference: view.spatialReference
    })
    let { x: geoX, y: geoY } = screenPoint
    switch (position) {
      case 'left':
        positionInfo = {
          left: geoX - w,
          top: geoY - h/2
        }
        break;
      case 'right':
        positionInfo = {
          left: geoX,
          top: geoY - h/2
        }
        break;
      case 'top':
        positionInfo = {
          left: geoX - w/2,
          top: geoY - h
        }
        break;
      case 'bottom':
        positionInfo = {
          left: geoX - w/2,
          top: geoY + h
        }
        break;
      case 'right-bottom':
        positionInfo = {
          left: geoX,
          top: geoY
        }
        break;
      case 'right-top':
        positionInfo = {
          left: geoX,
          top: geoY - h
        }
        break;
      case 'left-top':
        positionInfo = {
          left: geoX - w,
          top: geoY - h
        }
        break;
      case 'left-bottom':
        positionInfo = {
          left: geoX - w,
          top: geoY
        }
        break;
      default:
        break;
    }
    if(positionInfo.top >= (1080 - h)) positionInfo.top = 1080-h
    if(positionInfo.top <= 0) positionInfo.top = 0
    el.style.left = positionInfo.left + 'px'
    el.style.top = positionInfo.top + 'px'
    el.style.position = 'absolute'
  }
}
window.DomFollowMap = new DomFollowMap()