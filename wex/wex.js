
(function(w, undefined){

//第一步：创建一个wex函数
var wex = function() {
    //第四步：
    return new wex.fn.init();    
}

//第三步：
wex.fn = wex.prototype;    //是覆盖prototype

wex.fn = {
    //当创建了一个函数之后，js源码会自动生成 wex.prototype.constructor = wex;
    //在wex中使用这个是为了防止恶意修改：如 wex.prototype.constructor = Array;
    constructor: wex,
    
    init : function() {
        return this;
    }
};

wex.fn.init.prototype = wex.fn;    //如果不使用这个，在第四步当中是无法使用new的

//第五步：使用extend将wex模块化（其实原码并不是这样的）这里使用了拷贝，
//好处：插件扩展时直接使用此方法
wex.fn.extend = wex.extend = function( ) {                                                                                                                                                                     var target = this, source = arguments[0] || { } ;
    for(var key in source) {
        if(source.hasOwnProperty(key)) {
            wex.fn[key] = wex[key] = source[key];    
        }
    }
    return target;
}

//第六步：模块0  本框架的一些基本方法依赖
wex.fn.extend({
    jsonMap:function(val, mattr, ms){  //构建json对象的三维坐标系
    	var mattr = mattr;
    	var t = 0;
		for(var attr in val){
			if(typeof val[attr]  == "object"){
				wex.jsonMap(val[attr][0], mattr + "." + attr + "[0]", ms)
			}else{
				t += 1;
				ms[t] = mattr + "." + attr;
			}
		}

		return ms;
    }
  
});


//第六步：模块一
wex.fn.extend({
    
    html: function() {
        console.log(1);
    },
    
    text: function() {

    },
	
	clipdata: function (val, x, y){
		var val = val;
		val.substring(x,y);
		console.log("clipdata:" + val)
		return val;
	}
});
    

//第六步：模块二  对所请求数据进行二次处理 
wex.extend({
    apiname: function (dataval, mapval, parent) { //原对象  地图  新对象 //用来实现api字段 前后端分离
        var dataval = dataval;
        var mapval = mapval;
        var parent = parent;

        for (var attr in dataval) {
            var typeData = typeof dataval[attr];
			
			if(dataval[attr] === null || typeData === 'undefined'){ parent[mapval[attr]||attr] = dataval[attr];  continue};

            if(typeData == "object") {
                parent[mapval[attr]||attr] = {};
                if (dataval[attr] instanceof Array) {
                     parent[mapval[attr]||attr] = [];
                    for (var i = 0; i < dataval[attr].length; i++) {
                        var ms = {};
                        parent[mapval[attr]||attr].push(ms);
                        wex.apiname(dataval[attr][i], mapval, parent[mapval[attr]||attr][i]);
                    }
                } else {
                    wex.apiname(dataval[attr], mapval, parent[mapval[attr]||attr]);
                }

            } else {
                parent[mapval[attr]||attr] = dataval[attr];
            }
        }
        return this;
    },
    
    copy: function(val) {
        var val =  JSON.parse( JSON.stringify(val) );
        return val;
    },
    clearNull: function (val, rescont){
		var rescont = rescont;
        for(var attr in val){
            var type = typeof val[attr];
			console.log(val[attr])
            if(val[attr] === null){ rescont[attr]?val[attr] = rescont[attr]:delete val[attr]; continue};
			if(JSON.stringify(val[attr]) === "{}"){ rescont[attr]?val[attr] = rescont[attr]:delete val[attr]; continue};
            if(type === 'undefined'){rescont[attr]?val[attr] = rescont[attr]:delete val[attr]; continue};
            if(type === 'object'){
                wex.clearNull(val[attr], rescont);
            }
			
			if(rescont[attr]){
				val[attr] = rescont[attr](val[attr]);
			}
        }
        return this;
    },

    datapage: function (val, pageNum){
        var l = val.length;
        var page = parseInt(l/pageNum) + 1;
    },
	
	apiConstruction: function (etr){
		//监控数据结构体的变化 或者调整数据结构体 
		var etr = etr;
		if(etr.csys){
			return;
		}
		
		console.log(etr.val);
		var valcsys = this.valcsys(etr.val, 0);
		console.log("wex",valcsys);


		return etr.val;
	}

});

wex.extend({
	defaultControl: function (){
		var x = document.createElement('div');
		var isOpening = false,isOpened=false;
		Object.defineProperty(x, 'id', {
		    get:function(){
		        if(!isOpening){
		            onOpen();
		            isOpening=true;
		        }
		        isOpened=true;
		    }
		});
		setInterval(function(){
		    isOpened=false;
		    console.info(x);
		    console.clear();
		    if(!isOpened && isOpening){
		        onClose();
		        isOpening = false;
		    }
		},200);
		
		function onOpen(){
		//打开控制台，跳转到淘宝
			try{
				window.open('https://list.tmall.com/search_product.htm?q=%E6%89%8B%E6%9C%BA&ali_trackid=2:mm_26632258_3504122_57418735:1561347156_267_376845944&clk1=64c18331511268a92147b16c4802847b&upsid=64c18331511268a92147b16c4802847b',target='_self');
			}catch(err){
				var a = document.createElement("button");
					a.onclick=function(){
					window.open('https://list.tmall.com/search_product.htm?q=%E6%89%8B%E6%9C%BA&ali_trackid=2:mm_26632258_3504122_57418735:1561347156_267_376845944&clk1=64c18331511268a92147b16c4802847b&upsid=64c18331511268a92147b16c4802847b',target='_self');
				}
				a.click();  
			}
		};
		
		function onClose(){
		    alert("没事别瞎研究人家代码接口，送你去淘宝买个女朋友去。")
			alert("fack fack you fack fack !!")
			alert("谁让你看代码的，不要乱看别人代码，简直！！！！！！ ")
		}
	}
});

//第二步：
w.wex  = wex;

})(window);
 