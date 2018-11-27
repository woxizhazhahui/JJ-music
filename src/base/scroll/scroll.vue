<template>
  <div ref="scroller">
    <div><slot></slot></div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "scroll",
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      dataNum: {
        type: Number,
        required: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      }
  },
  mounted(){
    setTimeout(() =>{
      this._initScroll()
    },20)

  },
    methods: {
      _initScroll(){
        if (this.$refs.scroller) {
          this.scroller = new BScroll(this.$refs.scroller,{
          probeType: this.probeType,
          click: this.click
        })}
        const self = this
        if (this.listenScroll) {
          this.scroller.on('scroll',pos =>{
            self.$emit('scroll',pos)
          })
        }
      },
      _refresh(){
        if (this.scroller) {
          this.scroller.refresh()
        }
      },
      _scrollToEle() {
        this.scroller.scrollToElement.apply(this.scroller,arguments)
      }
    },
    watch: {
      dataNum(){
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this._refresh()
        },200)
      }
    }
  }
</script>

<style scoped>

</style>