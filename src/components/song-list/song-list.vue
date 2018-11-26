<template>
  <div>
    <ul>
      <li class="list-item" v-for="(item,index) in listData" :key="item.dissid">
        <div class="icon">
          <a :href="'https://y.qq.com/n/yqq/playsquare/'+ item.dissid +'.html#stat=y_new.playlist.dissname'">
            <img v-lazy="item.imgurl" alt="img">
          </a>
        </div>
        <div class="text">
          <a :href="'https://y.qq.com/n/yqq/playsquare/'+ item.dissid +'.html#stat=y_new.playlist.dissname'">
            <h2 class="name">{{item.dissname}}</h2>
          </a>
          <p class="creator-name">{{item.creator?item.creator.name:''}}</p>
          <p class="listennum">播放量：{{listenNumList[index]}}万</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "song-list",
    props: {
      listData: {
        type: Array,
        request: true
      }
    },
    computed: {
      listenNumList(){
        let list = []
        this.listData.forEach(item=>{
          list.push((item.listennum/10000).toFixed(1))
        })
        return list
      }
    },
    // methods: {
    //   imgLoad(){
    //     this.listTimer && clearTimeout(this.listTimer)
    //     this.listTimer = setTimeout(() => {
    //       this.$emit('addDataNum')
    //     },200)
    //   }
    // }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"

  .list-item
    display: flex
    box-sizing border-box
    align-items center
    padding: 0 20px 20px 20px
    .icon
      width: 60px
      flex: 0 0 60px
      margin-right: 20px
      img
        width: 60px
        height: 60px
    .text
      display: flex
      flex-direction column
      justify-content center
      overflow: hidden
      flex: 1
      line-height: 20px
      font-size: $font-size-medium
      .name
        margin-bottom: 10px
        color: $color-text
      .creator-name
        color: $color-text-d
      .listennum
        color: $color-text-d
</style>