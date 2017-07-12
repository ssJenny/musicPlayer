<template>
  <scroll @scroll="scroll"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          :data="data"
          class="listview"
          ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <!--阻止默认点击事件-->
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart">
      <ul>
        <li v-for="(item, index) in shortcutList" :data-index="index" class="item"
            :class="{'current':currentIndex===index}">{{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'

  const TITLE_HEIGHT = 30
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
//        ??????
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0,1)
        })
      },
//    固定在顶部的标签
      fixedTitle() {
        if (this.scrollY > 0)  {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.listHeight = []
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')  //点击位置
        let firstTouch = e.touches[0]
//
        this._scrollTo(anchorIndex)  // 移动到点击位置
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y  //滚动的top值
      },
      _calculateHeight() {

        this.listHeight = [] // 装标签距顶部的高度
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++)  {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
//      滚动到指定位置
      _scrollTo(index) {
        if(!index && index !== 0) {
          return
        }
//        边界处理
        if(index < 0){
          index = 0
        }
        else if(index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
//        赋值滚动距离
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
//            计算高度
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
//        当滚动到顶部
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
//        中间部分滚动
        for(let i = 0; i < listHeight.length-1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i+1]
          /**
           * 确定滚动位置，为右边标签添加对应的文字颜色
           */
          if(-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            return
          }
        }
//        滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
    },
    components: {
      Scroll
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
