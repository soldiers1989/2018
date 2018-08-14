


//获取样式函数   设置样式
function  CSS(obj,attr,value)
{
	//获取 
	if(value==undefined)
	{
		//兼容
		if(window.getComputedStyle)
		{
		   return   getComputedStyle(obj)["width"];                //标准IE
		}
		else
		{
			return  obj.currentStyle[attr];                //IE8以下版本
		}
		
	}
	
	//设置
	
	obj.style[attr]=value;
}



function  getAllObjectForClass(obj,aclass)
{
	var  array=obj.getElementsByTagName('*');    //所有
	
	var  arr=new Array();
	
	for (var i=0; i<array.length; i++) {
		
		if(array[i].className==aclass)
		{
			arr.push(array[i]);
		}
	}
	
	
	return  arr;
	
}



function show()
{
	
	alert(999999);
}

		
		
		