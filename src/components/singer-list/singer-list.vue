<template>
  <div class="singer-list">
    <scroll :dataNum="data.length" class="scroll">
      <ul>
        <li v-for="(group,index) in data" :key="index" class="group">
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
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'

  export default {
    name: "singer-list",
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

</style>