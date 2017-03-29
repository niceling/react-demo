var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
		devtool: 'eval-source-map',
    entry:{
    	app:["./app/main.js"]
    },
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
     module: {
        //loaders加载器
        loaders: [
            {test: /\.(js|jsx)$/,loader: 'babel-loader',exclude: /node_modules/},//js|jsx加载器
            {test: /\.json$/,loader: "json-loader"},//json加载器
			{test: /\.css$/,loader: 'style-loader!css-loader?modules'}//添加对样式表的处理  感叹号的作用在于使同一文件能够使用不同类型的loader
        ]
    },
     plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({template: __dirname + "/app/template/index.tmpl.html"}),//new 一个这个插件的实例，并传入相关的参数
        new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin()//压缩JS代码；
    ],
    //webpack-dev-server配置
    devServer: {
        contentBase: './build',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        port: 8030,//设置默认监听端口，如果省略，默认为"8080"
        hot: true
    }
};