# 音乐播放器
#### 所需：
babel-polyfill 解析es6

fastclick   解决移动端300ms的延迟

jsonp 实现跨域请求

router-link中 tag-"xx"  指定router-link解析为什么元素

Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

axios
基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用

slot标签
用于父组件向子组件传递元素

Object.assign 参数合并

ref属性用法：ref绑定的元素可通过this.$refs.元素进行使用

### 1. 首页

- 获取首页数据，使用jsonp跨域请求 url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
获取数据方法：
```
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  // Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
```
 轮播图：
 ```
getRecommend().then((res) =>{
  if(res.code == ERR_OK){
    this.recommends = res.data.slider
  }
})
```
推荐歌单
```
 _getDiscList(){
    getDiscList().then((res) =>{
      if(res.code == ERR_OK){
        this.disclist = res.data.list

      }
    })
  }
```
- 轮播组件 [better-scroll](https://www.npmjs.com/package/better-scroll)
```
  this.slider = new BScroll(this.$refs.slider, {
    scrollX: true,   // 水平滚动方向
    scrollY: false, // 垂直滚动方向
    momentum: false,
    snap: true,
    snapLoop: this.loop,
    snapThreshold: 0.3,
    snapSpeed: 400
  })
```
- 性能优化

  图片懒加载：
  1. 引入依赖 vue-lazyload
  2. 配置懒加载默认图片
  ```
  Vue.use(lazyLoad, {
    loading: require("common/image/default.png")  // 配置懒加载默认图片
  })
  ```
  3. 应用 v-lazy="图片路径"
  4.  keep-alive 优化页面切换时的闪烁
    
### 2.歌手页
- 数据获取
```
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}

getSingerList().then((res) => {
if (res.code === ERR_OK) {
      this.singers = this._normalizeSinger(res.data.list)
    }
  })
```
- 处理获取到的数据 _normalizeSinger()，得到一个分类的有序列表
- listview 列表组件
- 点击右侧标签歌手列表滚动到对应位置，需计算每个listGroup距顶部的距离并存入数组
- 滚动到每个listGroup，其标签固定在顶部
### 3.歌手详情页
- vuex store
- 路由配置
```
 routes: [
    {path: "/", redirect:'/recommend'},
    {path: "/recommend", component: Recommend},
    {path: "/rank", component: Rank},
    {path: "/search", component: Search},
    {
      path: "/singer",
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
```
- [mapGetters工具函数](http://www.imooc.com/article/14741)

得到点击的歌手信息。
mapGetters 工具函数会将 store 中的 getter 映射到局部计算属性中
- 歌手信息通过路由传递
- 对应的歌曲信息通过向QQ音乐进行获取


