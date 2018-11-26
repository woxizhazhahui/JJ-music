import jsonp from 'common/js/network/jsonp'
import {commondOptions,commondParams,code_Ok} from "./config";



export function singerJsonp(pagenum) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = {...commondParams,g_tk: 175538790,format: 'jsonp',platform: 'yqq',needNewCode: 0,hostUin: 0,pagenum: pagenum,key: 'all_all_all',page: 'list',channel: 'singer'}
  return jsonp(url,data,commondOptions)
}

export const OK = code_Ok