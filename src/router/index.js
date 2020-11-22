import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    redirect: "home",
    component: r => require.ensure([], () => r(require('@/views/index'))),
    children: [{
        path: '/home',
        name: 'home',
        title: '首页',
        component: r => require.ensure([], () => r(require('@/views/home')))
    }],
}]

const router = new VueRouter({
    routes
})

const LOGIN_PAGE_NAME = 'login';
//路由拦截-前守卫
router.beforeEach((to, from, next) => {
    next();
});
//路由拦截-后守卫
router.afterEach(() => {

});
export default router