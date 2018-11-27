<template>
  <div class="recommend">
    <scroll :dataNum="dataNum"
            class="scroll"
            :listenScroll="true"
            :probeType="3"
            @scroll="onScroll"
            ref="scroll">
      <div class="slider-module" v-if="sliderData.length">
        <slider :interval="2000" :autoPlay="true">
          <slider-item v-for="obj in sliderData" :key="obj.id">
            <a :href="obj.linkUrl">
              <img @load="addDataNum()" :src="obj.picUrl" alt="">
            </a>
          </slider-item>
        </slider>
      </div>
      <div class="list-module" ref="list">
        <h1 class="list-title">热门歌单推荐</h1>
        <song-list @addDataNum="addDataNum()"
                     v-if="listData.length"
                     :listData="listData"></song-list>
        <div class="loading-box" v-show="!listData.length">
          <loading></loading>
        </div>
      </div>
    </scroll>
    <h1 class="list-title-fix" v-show="fixShow">热门歌单推荐</h1>
  </div>
</template>

<script>
  import Loading from "base/loading/loading"
  import Scroll from "base/scroll/scroll"
  import {recommendJsonp,listData,OK} from "../../api/recommend";
  import {Slider,SliderItem} from "../../base/slider";
  import SongList from "components/song-list/song-list"

  export default {
    name: "recommend",
    data(){
      return {
        sliderData: [],
        listData: [],
        dataNum: 0,
        scrollY: 0,
        fixShow: false
      }
    },
    components: {
      SliderItem,
      Slider,
      SongList,
      Scroll,
      Loading
    },
    created(){
      this._getListData()
      this._getRecommend()
    },
    methods: {
      _getRecommend() {
        recommendJsonp().then(res => {
          if (res.code === OK) {
            this.sliderData = res.data.slider
          }
        })
      },
      _getListData(){
        // listData(res=>{
        //   console.log(res.data.data);
        // })
        listData().then(res => {
          if (res.statusText = "OK") this.listData = res.data.data.list
        })
      },
      addDataNum(){
        this.dataNum++
      },
      onScroll(pos) {
        this.scrollY = pos.y
      }
    },
    watch: {
      listData(){
        this.dataNum++
      },
      scrollY() {
        if (-this.scrollY >= this.$refs.list.offsetTop) {
          this.fixShow = true
        } else {
          this.fixShow = false
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .scroll
      height: 100%
      overflow: hidden
      .list-module
        position: relative
        .loading-box
          position: absolute
          width: 100%
          bottom: 0
          transform translateY(100%)
        .list-title
          width: 100%
          color: $color-theme
          font-size: $font-size-medium
          text-align: center
          line-height: 65px
    .list-title-fix
      width: 100%
      color: $color-theme
      background-color: $color-background
      font-size: $font-size-medium
      text-align: center
      line-height: 66px
      position: fixed
      top: 87px
      left: 0
</style>