<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-text">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-text">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-text">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-text">搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "tab"
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .tab
    display flex
    height 44px
    line-height 44px
    font-size $font-size-medium
    .tab-item
      flex 1
      text-align center
    .is-active
      border-bottom 4px solid $color-theme
      .tab-text
        color $color-theme
</style>