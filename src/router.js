import Vue from 'vue'
import Router from 'vue-router'
const Recommend = () => import('views/recommend/recommend')
const Rank = () => import('views/rank/rank')
const Search = () => import('views/search/search')
const Singer = () => import('views/singer/singer')


Vue.use(Router)

export default new Router({
  routes: [
      {
      path: '/',
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/rank',
      component: Rank
    }
  ],
  linkActiveClass: 'is-active',
  mode: 'history'
})
