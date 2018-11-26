// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'views': '@/views',
        'common': '@/common',
        'api': '@/api',
        'base': '@/base'
      }
    }
  },
  devServer: {
    proxy: {
      '/api/getListData': {
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
        changOrigin: true,
        bypass:function (req,res,proxyOptions) {
          req.headers.referer = "https://y.qq.com/portal/playlist.html";
          req.headers.host = "c.y.qq.com"
        },
        pathRewrite: {
          '^/api/getListData': ''
        }
      }
    }
  }
}