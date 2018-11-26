<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="text">JJ Music</div>
  </div>
</template>

<script>
  export default {
    name: "m-header"
  }
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .m-header
    height 44px
    text-align center
    color $color-theme
    display flex
    flex-direction row
    justify-content center
    align-items center
    .icon
      bg-image('logo')
      width 30px
      height 32px
      background-size 30px 32px
      display inline-block
      margin-right 9px
    .text
      font-size $font-size-large
</style>