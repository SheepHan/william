/*
* @Author: willi
* @Date:   2017-09-30 15:00:36
* @Last Modified by:   willi
* @Last Modified time: 2017-09-30 15:30:59
*/
define(function (){

	var util={
		getFormateDate:function (date,type){
			if(type === 1){
				return date+"1";
			}

			if(type === 2){
				return  date+"2";
			}
		}
	}

	return util;
})