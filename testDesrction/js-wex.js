//test1  wex.coby()  //深拷贝
(function (){
	var ax = {"abc": 123, "b": 3};
	
	var mx = wex.copy(ax);
	//在深拷贝下mx的修改不会影响到ax
	//wex.defaultControl()
	mx.b = 2;
	console.log(mx);
	console.log(ax);
})();


(function (){
	console.log("%c wex.apiname  start...", "color:green; background: #ccc; font-size:20px;")
	var ins = `
		不做数据的筛选和过滤，既然已经传递过来，还筛选个啥！！
		wex.apiname(data, map, newdata); 前后端字段分离 接口名替换
		data后端返回对象
		map映射对象类型
		newdata 新的已被替换名称的对象  可点击进入查看源代码 效果如下
	`
	console.log("%c " + ins, "color: blue");
	console.log("kkjkl");

	//wex.apiname(data, map, newdata); 前后端字段分离 接口名替换 看效果如下
	//var ax = {"code": 0, "msg": "成功", "data": [{"age": 23},{"age": 26, "name": [{"a": "zhang"}]}]};
	var ax  = [{"code":1}, 1, 2];
	var mx = []; //结果容器
	var map = {
		"code": "wcode",
		"md": "wmd"
	}

	wex.apiname(ax, map, mx);

	/*
		ins:
			不做数据的筛选和过滤，既然已经传递过来，还筛选个啥！！
	 */

})();


(function (){
	console.log("%c wex.clearNull  start...", "color:green; background: #ccc; font-size:20px;")
	var ins = `
		对传递的空数据和undfind进行清除
		可点击进入查看源代码 效果如下
		在这里愉快实现了链式调用 并且还能替换null undefind 等为 其他值  例如 暂无数据等 
		还可以定义一个函数 自定义去处理这些值哦 具体看源码
		注意事项: 想让null等返回空字符串 必须要是个带空格的字符串 
	`
	console.log("%c " + ins, "color: blue");

	var ax = {"data": "123", "ms": undefined, "fs": {"abc": undefined, "md": "123", "msr": 3}};
	
	var map = {"data": "wdata", "ms": "wms", "abc": "wabc"};
	
	var mx = {};

	wex.apiname(ax,map,mx).clearNull(mx, {
		"wms": "暂无数据",
		"wabc": " ",
		"msr": function (val){ var val = val; val += 1; console.log("x:"+ typeof val); return val;},
		"md": function (val){var val = wex.clipdata(val, 1, 2); return val;}
	}); 
		//在这里愉快的实现了链式调用
		//并且新增了值的替换处理功能
	console.log(mx);
	/*
		ins: 清楚空置和undefined
		
	 */
})();


(function (){
	console.log("%c wex.model  start...", "color:green; background: #ccc; font-size:20px;")
	var ins = `
		watchVar 监控变量是否发生了变化  并且提供回调 输出变化的数据
		可点击进入查看源代码 效果如下
	`
	console.log("%c " + ins, "color: blue");
})();
(function (){
	console.log("%c wex.model  start...", "color:green; background: #ccc; font-size:20px;")
	var ins = `
		model  模版
		etr = {
			val:  ""  //值
			newval: "" //想把值转换成的结构
			csys: [pid, id] //是否自己具备坐标系结构  例如父id 子id 常见于文件树会用到 大多数情况不会
 		}
		可点击进入查看源代码 效果如下
	`

	var md = {
		code: "1",
		dpg: [{
			"name": "zhang"
		}]
	}
	var ms = {};
	var req = wex.jsonMap(md, "data", ms);
	console.log("jsonMap:",req);
	console.log("%c " + ins, "color: blue");
})();


(function (){
	console.log("%c wex.model  start...", "color:green; background: #ccc; font-size:20px;")
	var ins = `
		apiConstruction 监控数据结构体的变化,并且可以根据需要随意调整结构体
		可点击进入查看源代码 效果如下
	`
	console.log("%c " + ins, "color: blue");
})();