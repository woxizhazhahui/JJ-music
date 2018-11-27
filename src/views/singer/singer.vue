<template>
  <div class="singer">
    <div class="page">
      <span class="pre" @click="pre()">上一页</span>
      <span>第 {{page}} 页</span>
      <span class="next" @click="next()">下一页</span>
    </div>
    <div class="singer-list-box">
      <singer-list v-if="list.length"  :data="list" class="singer-list"></singer-list>
      <loading v-show="!list.length"></loading>
    </div>
  </div>
</template>

<script>
  import Loading from 'base/loading/loading'
  import SingerList from 'components/singer-list/singer-list'
  import {singerJsonp,OK} from "../../api/singer"
  import Scroll from "base/scroll/scroll"

  const hotLen = 10

  export default {
    name: "singer",
    data(){
      return {
        page : 1,
        singerData: [],
        list: []
      }
    },
    components: {
      Scroll,
      SingerList,
      Loading
    },
    created(){
      this._getSingerData(this.page)
    },
    methods: {
      _getSingerData(page){
        singerJsonp(page).then(res => {
          if (res.code === OK) this.singerData = res.data.list
        })
      },
      pre(){
        if (this.page > 1) {
          this.list = []
          this.page--
          this._getSingerData(this.page)
        }
      },
      next(){
        this.list = []
        this.page++
        this._getSingerData(this.page)
      },
      setList(){
        let objData = {
          hot: {
            title: '热门',
            items: []
          }
        }
        this.singerData.forEach((item,index)=> {
          if (item.Findex === '9') {
            item.Findex = '#'
          }
          if (index <= hotLen -1) {
            objData.hot.items.push({
              id: item.Fsinger_mid,
              name: item.Fsinger_name,
              img: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg`
            })
          }
          if (!objData[item.Findex]) {
            objData[item.Findex] = {
              title: item.Findex,
              items: []
            }
          }
          objData[item.Findex].items.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            img: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg`
          })
        })
        let hot = []
        let ret = []
        for (let key in objData) {
          let obj = objData[key]
          if (obj.title === '热门'){
            hot.push(obj)
          } else ret.push(obj)
        }
        ret.sort((a,b)=>{
          return a.title.charCodeAt() - b.title.charCodeAt()
        })
        this.list = hot.concat(ret)
      }
    },
    watch: {
      singerData(){
        this.setList()
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"

  .singer
    .page
      padding: 0 10px
      line-height: 44px
      display: flex
      justify-content: space-between
      font-size: $font-size-medium
      .pre,.next
        color: $color-theme
    .singer-list-box
      position: fixed
      top: 132px
      bottom: 0
      width: 100%
      .singer-list
        height: 100%
</style>