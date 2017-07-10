<template>
  <div class="recommend">

      <scroll class="recommend-content" ref="scroll" :data="disclist">
        <div>
        <div class="slider-wrapper" v-if="recommends.length" >
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="" @load="loadImage"/>
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in disclist" class="item">
              <div class="icon">
                <img width="60" height="60" alt=""  v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        </div>
      </scroll>

  </div>
</template>

<script type="text/ecmascript-6">

  import { getRecommend, getDiscList } from 'api/recommend'  // 只引用recommend.js中的getcommend方法
  import { ERR_OK } from 'api/config'
  import Slider from 'base/slider/slider.vue'
  import Scroll from 'base/scroll/scroll.vue'

  export default {
      // 实例被创建之后
      data() {
        return {
           recommends:{},
           disclist: {}
        }
      },
      created() {
//          获取轮播数据
        this._getRecommend()
//        获取歌单数据
        this._getDiscList()
      },
      methods: {
          _getRecommend(){
            getRecommend().then((res) =>{
              if(res.code == ERR_OK){
                this.recommends = res.data.slider

              }
            })
          },
          _getDiscList(){
            getDiscList().then((res) =>{
              if(res.code == ERR_OK){
                this.disclist = res.data.list

              }
            })
          },
        loadImage(){
//              轮播图初始化滚动组件刷新
          if(!this.checkedLoad){
            this.checkedLoad = true
            this.$refs.scroll.refresh()


          }
        }
      },
    components: {
      Slider,
      Scroll
    }
  }


</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
