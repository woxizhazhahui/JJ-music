import originalJonsp from 'jsonp'

export default function jsonp(url,data,option) {
  url = url + (url.indexOf('?')<0?'?':'&') + param(data)
  return new Promise((resolve,reject)=>{
    originalJonsp(url,option,(err,res)=>{
      if (!err) resolve(res)
      else reject(err)
    })
  })
}

const param = data => {
  let url = '';
  for (let key in data) {
    const value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.substr(1) : ""
}