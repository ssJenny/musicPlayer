# 音乐播放器
#### 知识点：
babel-polyfill 解析es6

fastclick   解决移动端300ms的延迟

jsonp 实现跨域请求

router-link中 tag-"xx"  指定router-link解析为什么元素

Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

##### 配置路由：

````
Vue.use(Router)
 export default new Router({
  routes: [
    {path: "/", redirect:'/recommend'},
    {path: "/recommend", component: Recommend},
    {path: "/rank", component: Rank},
    {path: "/singer", component: Singer},
    {path: "/search", component: Search}
  ]
}) 
````




