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
      },
      _refresh(){
        if (this.scroller) {
          this.scroller.refresh()
        }
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