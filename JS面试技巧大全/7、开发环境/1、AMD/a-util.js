/*
* @Author: willi
* @Date:   2017-09-30 15:03:45
* @Last Modified by:   willi
* @Last Modified time: 2017-09-30 15:31:24
*/
 

 define(['./util.js'],function(util){
 	var autil={
 		autilGetFormateDate:function(date){
 			return util.getFormateDate(date,2);
 		}
 	}

 	return autil;
 })