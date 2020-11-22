import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "./utils/rem";


import echarts from 'echarts' //全局引入Echarts
Vue.prototype.$echarts = echarts;

require('@/assets/js/domFollowMap')
require('@/assets/js/echarts-auto-tooltip')
require('@/assets/js/watchZoomClusterPoints')

import '@/assets/less/common.less'

//时间插件
import moment from 'moment'; //导入模块
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn');
Vue.prototype.$moment = moment;//赋值使用
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)

//无缝滚动
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

Vue.use(ElementUI);

const _VUE_INSTANCE_ = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false;//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.directive('followMap', {
  inserted: function (el, binding) {
    let { modifiers, value } = binding
    let position = binding.rawName.split('.')[1] || 'right-bottom'
    if (modifiers.index) {
      window.DomFollowMap.subscribe(value, el, store.state.graphic, position, 'index')
    } else {
      window.DomFollowMap.subscribe(value, el, store.state.graphic, position)
    }
  }
})

