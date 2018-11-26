import axios from 'axios'

export function get(url,params) {
  return new Promise((resolve,reject)=>{
    axios.get('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg')
  })
}