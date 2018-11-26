<template>
  <div class="loading">
    <img src="./loading.gif" alt="">
    <p class="title">{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      title: {
        type: String,
        default: '加载中...'
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"

  .loading
    padding-top: 20px
    text-align: center
    img
      width:48px
      height: 48px
    .title
      line-height: 20px
      margin-top: 10px
      font-size: $font-size-small
      color: $color-text-l
</style>