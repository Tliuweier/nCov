//gzip 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 代码压缩
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'
// 本地环境是否需要使用cdn
const devNeedCdn = true

// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter'
    },
    // cdn的css链接
    css: [],
    // cdn的js链接
    js: [
        'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
        'https://cdn.staticfile.org/vuex/3.0.1/vuex.min.js',
        'https://cdn.staticfile.org/vue-router/3.0.3/vue-router.min.js'
    ]
}


module.exports = {
    devServer:{
        proxy: {
            '/g2': {    // search为转发路径
                target: 'https://view.inews.qq.com/',  // 目标地址
                ws: true, // 是否代理websockets
                changeOrigin: true // 设置同源  默认false，是否需要改变原始主机头为目标URL,
            }
        }
    },
    productionSourceMap: false,
    chainWebpack: config =>{
        // cdn start
        config.plugin('html').tap(args =>{
            if(isProduction|| devNeedCdn) args[0].cdn = cdn
            return args
        })
        // cdn end
        config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    },
    configureWebpack: config => {
        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction || devNeedCdn) config.externals = cdn.externals
        
        //代码压缩
        // config.plugins.push(
        //     new UglifyJsPlugin({
        //         uglifyOptions: {
        //             compress: {
        //                 // warnings:false,
        //                 drop_debugger: true,
        //                 drop_console: true,
        //                 pure_funcs: ['console.log']
        //             }
        //         },
        //         sourceMap: false,
        //         parallel: true
        //     })
        // )
        //gzip压缩
        const productionGzipExtensions = ['html', 'js', 'css']
        config.plugins.push(
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' + productionGzipExtensions.join('|') + ')$'
                ),
                threshold: 10240,// 只有大小大于该值的资源会被处理 10240
                minRatio: 0.8,// 只有压缩率小于这个值的资源才会被处理
                deleteOriginalAssets: false // 删除原文件
            })
        )
        // 公共代码抽离
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'all',
                        test: /node_modules/,
                        name: 'vendor',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 100
                    },
                    common: {
                        chunks: 'all',
                        test: /[\\/]src[\\/]js[\\/]/,
                        name: 'common',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c)ss$/,
                        chunks: 'all',
                        enforce: true
                    },
                    runtimeChunk: {
                        name: 'manifest'
                    }
                }
            }
        }
    }
}