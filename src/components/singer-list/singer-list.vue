<template>
  <div class="singer-list">
    <scroll :probeType="3"
            :listenScroll="true"
            :dataNum="data.length"
            class="scroll"
            ref="scroll"
            @scroll="onScroll">
      <ul>
        <li v-for="(group,index) in data" :key="index" class="group" ref="shortListGroup">
          <h2 class="title">{{group.title}}</h2>
          <ul>
            <li v-for="item in group.items" :key="item.id" class="item">
              <img v-lazy="item.img">
              <p>{{item.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <ul class="short-list" @touchstart="shortListTouch($event)">
      <li v-for="(value,index) in shortList"
          class="short-list-item"
          :key="index"
          :data-index="index"
          :class="{active:index === itemIndex}">{{value}}</li>
    </ul>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'

  export default {
    name: "singer-list",
    data(){
      return {
        itemIndex: 0,
        itemsHight: [],
        scrollY: 0
      }
    },
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    computed: {
      shortList(){
        let shortList = []
        this.data.forEach(group => {
          shortList.push(group.title.substr(0,1))
        })
        return shortList
      }
    },
    components: {
      Scroll
    },
    methods: {
      shortListTouch(e){
        let index = e.target.getAttribute('data-index')
        this.$refs.scroll._scrollToEle(this.$refs.shortListGroup[index],200)
      },
      onScroll(pos){
        this.scrollY = pos.y
      },
      getitemsHight(){
        let list = this.$refs.shortListGroup
        let array = []
        for (let i = 0; i < list.length; i++) {
          array.push(this.$refs.shortListGroup[i].offsetTop)
        }
        this.itemsHight = array
      }
    },
    mounted(){
      this.getitemsHight()
    },
    watch: {
      scrollY(){
        if (this.scrollY > 0) {
          this.itemIndex = 0
          return
        }
        for (let i = 0; i < this.itemsHight.length; i++) {
          if (this.scrollY <= -this.itemsHight[this.itemsHight.length - 1]) {
            this.itemIndex = this.itemsHight.length - 1
            return
          }
          if (-this.itemsHight[i] >= this.scrollY && this.scrollY > -this.itemsHight[i + 1])
          {
            this.itemIndex = i
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"

  .singer-list
    position: relative
    .scroll
      height: 100%
      overflow: hidden
      .group
        padding-bottom: 20px
        .title
          line-height: 30px
          padding-left: 20px
          font-size: $font-size-small
          color: $color-text-l
          background-color: $color-highlight-background
        .item
          display: flex
          padding: 20px 0 0 20px
          align-items center
          img
            width: 50px
            height: 50px
            border-radius 50%
          p
            padding-left: 20px
            font-size: $font-size-medium
            color: $color-text-l
    .short-list
      position: absolute
      border-radius 25px
      z-index: 30
      transform: translateY(-50%)
      top: 50%
      right: 10px
      width: 20px
      padding: 15px 0
      text-align: center
      background-color: $color-background-d
      .short-list-item
        padding: 3px
        color: $color-text-l
        font-size: $font-size-small
        &.active
          color: $color-theme


</style>