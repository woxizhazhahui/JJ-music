<template>
  <div class="slider" ref="slider">
    <div class="slider-box" ref="sliderBox">
      <slot></slot>
    </div>
    <div v-if="showDot" class="dots">
      <span class="dot"
            v-for="(value,index) in items"
            :class="{active:index===activeIndex}"></span>
    </div>
  </div>
</template>

<script>
  import BetterScroll from "better-scroll"

  export default {
    name: "slider",
    data(){
      return {
        items: [],
        activeIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: false
      },
      interval: {
        type: Number,
        default: 3000
      },
      showDot: {
        type: Boolean,
        default: true
      }
    },
    mounted(){
      setTimeout(()=>{
        this._setSliderWidth()
        this._initDot()
        this._initSlider()
        if (this.autoPlay) this._play()
      },20)
      this._refresh()
    },
    activated(){
      this._play()
    },
    deactivated(){
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isFresh) {
        const slider = this.$refs.slider
        const sliderBox = this.$refs.sliderBox
        this.sliderItems = sliderBox.children
        const sliderItemWidth = slider.clientWidth
        let sliderBoxWidth = 0
        for (let i = 0; i < this.sliderItems.length; i++) {
          let item = this.sliderItems[i]
          item.style.width = sliderItemWidth + 'px'
          sliderBoxWidth += sliderItemWidth
        }
        if (this.loop &&　!isFresh) sliderBoxWidth += 2*sliderItemWidth
        sliderBox.style.width = sliderBoxWidth + 'px'
      },
      _initSlider(){
        this.slider = new BetterScroll(this.$refs.slider,{
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {loop: true,threshold: 0.3},
          click: true,
          bounce: false,
          stopPropagation: true
        })
        this.slider.on('scrollStart',()=>{
          clearTimeout(this.timer)
        })
        this.slider.on('scrollEnd',()=>{
          // let pageIndex = this.slider.getCurrentPage().pageX
          // if (this.loop) pageIndex -= 1
          this.activeIndex = this.slider.getCurrentPage().pageX


          if (this.autoPlay) {
            // clearTimeout(this.timer)
            this._play()
          }

        })
      },
      _initDot(){
        for (let i = 0; i < this.sliderItems.length; i++) {
          this.items.push('')
        }
      },
      _play() {
        this.timer = setTimeout(()=>{
          this.slider.next(400)
        },this.interval)
      },
      _refresh(){
        window.addEventListener('resize',()=>{
          clearTimeout(this.timer)
          clearTimeout(this.reflashTimer)
          this.reflashTimer = setTimeout(()=>{
            this._setSliderWidth(true)
            this.slider.refresh()
            this._play()
          },200)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"

  .slider
    min-height: 1px
    position: relative
    overflow: hidden
    .slider-box
      position: relative
      white-space: nowrap
      overflow: hidden
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>