
let HappyPack = require('happypack');
const path = require('path');
module.exports = {
  // 只在开发环境生效
  devServer: {
    hot: true,
    proxy: {
      '/api': {
        target: 'http://10.197.145.39:9002/',
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/traffic"
        },
      },
    },
  },
  configureWebpack: {
    module: {
      // cesium 3 不加这个配置会报require引入警告
      unknownContextCritical: false,
    },
    plugins: [
      new HappyPack({
        id: 'js',
        use: [{ // 将js的具体规则放置在此处
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }]
      }),
      new HappyPack({
        id: 'image',
        // threadPool: happyThreadPool,
        loaders: [{
          loader: 'url-loader',
          options: {
            esModule: false, // 这里设置为false
            outputPath: "images/", // 指定图片输入的文件夹， 打包地址是 “/dist/images/图片名字”
            publicPath: "/images", // 指定获取图片的路径，即打包结果引入的地址是 "/images/图片名字"
            // limit  (如果小于 8192字节 ，则转为base64，否则返回一个url地址)
            limit: 8192,
            name: "[name].[hash:8].[ext]" // 输入的图片名
          }
        }]
      }),
      // 处理css文件
      new HappyPack({
        id: 'css-pack',
        // threadPool: happyThreadPool,
        loaders: [{
          loader: 'css-loader'
        }]
      })
    ]
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps  打包时不生成.map文件?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    requireModuleExtension: true
  },

  pluginOptions: {
    'style-resources-loader': {
			preProcessor: 'less',
			patterns: [
				path.resolve(__dirname, "./src/assets/less/common.less") // 这段是自己加的，根据自己文件的位置来修改,用于添加全局样式表
			]
    }
  }
}