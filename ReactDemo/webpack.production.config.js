var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
        //loaders������
        loaders: [
            {test: /\.(js|jsx)$/,loader: 'babel-loader',exclude: /node_modules/},
            {test: /\.json$/,loader: "json-loader"},
			      {test: /\.css$/,loader: 'style-loader!css-loader?modules'}//���Ӷ���ʽ���Ĵ���  ��̾�ŵ���������ʹͬһ�ļ��ܹ�ʹ�ò�ͬ���͵�loader
        ]
    },
     plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({template: __dirname + "/app/template/index.tmpl.html"})//new һ����������ʵ������������صĲ���
    
    ],
    //webpack-dev-server����
    devServer: {
        contentBase: './build',//Ĭ��webpack-dev-server��Ϊ���ļ����ṩ���ط������������Ϊ����һ��Ŀ¼�µ��ļ��ṩ���ط�������Ӧ������������������Ŀ¼���������õ�"build"Ŀ¼��
        historyApiFallback: true,//�ڿ�����ҳӦ��ʱ�ǳ����ã���������HTML5 history API���������Ϊtrue�����е���ת��ָ��index.html
        inline: true,//����Ϊtrue����Դ�ļ��ı�ʱ���Զ�ˢ��ҳ��
        port: 8030,//����Ĭ�ϼ����˿ڣ����ʡ�ԣ�Ĭ��Ϊ"8080"
        hot: true
    }
};