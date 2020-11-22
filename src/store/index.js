import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const type = {
  SET_MAP: 'SET_MAP',
  SET_CURRENT_GRAPHIC: 'SET_CURRENT_GRAPHIC',
  SET_MAP_EXTENT: 'SET_MAP_EXTENT',
}
export default new Vuex.Store({
  state: {
    map: null, //地图map对象
    view: null, //地图view对象
    esri: {}, //地图工具包集合
    basemapGallery:null,//底图组合
    graphic: null, //当前选中的图层
    mapExtent: null,
  },
  mutations: {
    [type.SET_MAP]:(state, obj)=>{
      if (obj.map) {
        state.map = obj.map
      } 
      if (obj.view){
        state.view = obj.view
      }
      if (obj.esri) {
        state.esri = obj.esri
      }
    },
    [type.SET_CURRENT_GRAPHIC]: (state, graphic)=>{
      state.graphic = graphic
    },
    [type.SET_MAP_EXTENT]: (state, mapExtent)=>{
      state.mapExtent = mapExtent
    },
  },
  actions: {
  
  },
  modules: {
  }
})
