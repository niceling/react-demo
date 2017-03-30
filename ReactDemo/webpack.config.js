var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var path = require('path');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	devtool: 'eval-source-map',
    entry:{
    	app:["./app/main.js"]
    },
    output: {
        path: BUILD_PATH,
        filename: "bundle.js"
    },
     module: {
        //loaders加载器
        loaders: [
            {test: /\.(js|jsx)$/,loader: 'babel-loader',exclude: /node_modules/},//js|jsx加载器
            {test: /\.json$/,loader: "json-loader"},//json加载器
			{test: /\.css$/,loader:ExtractTextPlugin.extract({ fallback: 'style-loader',use:'css-loader?modules!postcss-loader'}),include:APP_PATH},//添加对样式表的处理  感叹号的作用在于使同一文件能够使用不同类型的loader
        	{test: /\.(png|jpg)$/,loader: 'file-loader?limit=40000&name=images/[hash:8].[name].[ext]'}//注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片。
        ]
    },
     plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({template: ROOT_PATH + "/app/template/index.tmpl.html"}),//new 一个这个插件的实例，并传入相关的参数
        new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin(),//压缩JS代码；
        new webpack.LoaderOptionsPlugin({
			options : {
				postcss : function(){return [autoprefixer];}
			}
		}),
		new ExtractTextPlugin("[name]-[hash:8].css"),
		new webpack.BannerPlugin('Created by MiRai on 17/03/30. Email:410053434@qq.com')  
	],
  	
  	//webpack-dev-server配置
	devServer:{
	    contentBase: './build',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
	    historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
	    inline: true,//设置为true，当源文件改变时会自动刷新页面
	    port: 8030,//设置默认监听端口，如果省略，默认为"8080"
	    hot: true,
	    //其实很简单的，只要配置这个参数就可以了
        proxy: {
          '/api/*': {
              target: 'http://localhost:5000',
              secure: false
          }
        }
	}
  	
};