import jsonp from 'common/js/network/jsonp'
import {commondParams,commondOptions,code_Ok} from "./config"
import axios from 'axios'

export function recommendJsonp() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = {...commondParams,format: 'jsonp',platform: 'h5',needNewCode: 1,uin: 0,g_tk: 5381,}
  return jsonp(url,data,commondOptions)
}

export const OK = code_Ok

export function listData(callBack) {
  const url = '/api/getListData'
  const data = {...commondParams,format: 'json',platform: 'yqq',hostUin: 0,sin: 0,ein: 29,categoryId: 10000000,rnd: Math.random(),sortId: 5,needNewCode: 0}
  // return axios.get(url,{
  //   params:data
  // }).then(res=>{
  //   callBack(res)
  // })
  return new Promise((resolve,reject)=>{
    axios.get(url,{
      params:data
    }).then(res=>{
      resolve(res)
    }).catch(e=>{
      reject(e)
    })
  })


}