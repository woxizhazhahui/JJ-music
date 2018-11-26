<template>
  <div class="slider-item">
    <slot>

      <!--<a href="#">-->
        <!--<img src="#" alt="#">-->
      <!--</a>-->

    </slot>
  </div>
</template>

<script>
  export default {
    name: "slider-item"
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"

  .slider-item
    float: left
    box-sizing: border-box
    overflow: hidden
    text-align: center
    a
      display: block
      width: 100%
      overflow: hidden
      text-decoration: none
    img
      display: block
      width: 100%

</style>