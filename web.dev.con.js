const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { VueLoaderPlugin } = require('vue-loader')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports  = {
    mode: "production",
    entry: './src/main.js',//多个文件用数组
    output: {
        filename: 'build.[chunkhash:7].js',//多个文件用文件夹形式
        // filename: 'build.[hash:7].js',//多个文件用文件夹形式
        // filename: 'build.[contenthash:7].js',//多个文件用文件夹形式
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins:[
        // new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: true, //是否压缩
            hash: true,//true则将唯一的webpack编译哈希值附加到所有包含的脚本和CSS文件中。主要用于清除缓存,同时需要将output中的filename设置成bundle.[hash].js
         })
    ],
    module: {
        rules: [
            { 
                test: /.(html|htm)$/i, 
                enforce: 'post', 
                use: [ 
                    { loader: 'html-loader'}, 
                ], 
            },
            {
                test: /|.js$/,
                use: [ 
                    { loader: 'babel-loader'}, 
                ],
                // include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
                exclude: /node_modules/ //必须排除
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }]
                // loader: "vue-loader"
                // use: ['vue-loader'],
                // options: {
                //     loaders: {
                //       'scss': [
                //         'vue-style-loader',
                //         'css-loader',
                //         'sass-loader'
                //       ],
                //       'sass': [
                //         'vue-style-loader',
                //         'css-loader',
                //         'sass-loader?indentedSyntax'
                //       ]
                //     }
                // }
                // use: [ 
                //     { loader: 'vue-loader'}, 
                // ],
                // options: {
                //     // extractCSS: process.env.NODE_ENV === 'production',
                //     loaders: {
                //       sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
                //       scss: 'vue-style-loader!css-loader!sass-loader',
                //       less: 'vue-style-loader!css-loader!less-loader',
                //       css: 'vue-style-loader!css-loader',
                //     }
                //   }
                // options: vueLoaderConfig
            },
            {
                //匹配哪些文件
                test: /\.css/,
                //使用哪些loader进行处理
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // 处理图片资源,但是处理不了html中img的路径问题
                test: /\.(png|jpg|gif|woff|svg|eot|woff2|ttf)$/,
                //包依赖 限制8K以上直接输出文件，以下的base64
                // 8*1024 多少字节
                loader: 'url-loader',
                options: {
                    esModule: false, // 关闭es6
                    name: '[hash:10].[ext]' //不重复名字
                }
                // exclude:/node_modules/
            }
        ]
    },

    resolve: {
        alias: {
        'vue$': 'vue/dist/vue.esm.js',
        // '@': resolve('src'),
        '@': path.join(__dirname, '../src'),
        },
        extensions: ['.js', '.vue', '.json'],
    },
    devtool: 'inline-source-map', //便于定位错误出处
    devServer: {//开发服务器配置
        port: 3000, //设置端口号
        progress: true, //进度条
        // contentBase: './dist', //服务器访问基本目录
        contentBase: path.join(__dirname, 'dist'), //监听编译后的文件夹
        compress: false, //不压缩
        open: false//自动打开页面
    }
}