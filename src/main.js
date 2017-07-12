// 解析es6
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'  // 解决移动端300ms的延迟
import 'common/stylus/index.styl'
import lazyLoad from 'vue-lazyload'
import store from './store'     //导入store


fastclick.attach(document.body)

// 懒加载
Vue.use(lazyLoad, {
  loading: require("common/image/default.png")  // 配置懒加载默认图片
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    //  创建元素的函数，把APP组件传递进来，再渲染到主页中
    render:h=>h(App)
})
