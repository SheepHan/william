/*
* @Author: willi
* @Date:   2017-09-30 17:07:31
* @Last Modified by:   willi
* @Last Modified time: 2017-09-30 17:54:30
*/
var path=require('path');
var webpack=require('webpack');

module.exports={
	context:path.resolve(__dirname,'./src'), //资源路径

	entry:{
		app:"./app.js"    //入口
	},

	output:{
		path:path.resolve(__dirname,"./dist"), //输出路径
		filename:'bundle.js'   //输出的文件名
	},

	plugins: [  //压缩输出的 bundle.js
    	new webpack.optimize.UglifyJsPlugin()
 	]


}