// 解析es6
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'



import router from './router'

import fastclick from 'fastclick'  // 解决移动端300ms的延迟
//
import 'common/stylus/index.styl'

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    //  创建元素的函数，把APP组件传递进来，再渲染到主页中
    render:h=>h(App)
})
