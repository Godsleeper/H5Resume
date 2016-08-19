/* 内容管理对象 */
var H5=function(){
	this.id=("h5_"+Math.random()).replace(".","_");
	this.el=$('<div class="h5" id="'+this.id+'">').hide();
	$("body").append(this.el);
	this.page=[];


	this.addPage = function(name,text){
		var page=$('<div class="h5_page section">');

		if(name!=undefined)
		{
			page.addClass("h5_page_"+name);
		}
		if(text!=undefined)
		{
			page.text(text);
		}
		this.el.append(page);
	
		this.page.push(page);

		if(typeof this.whenAddPage == 'function'){
			this.whenAddPage();
		}
		return this;//链式调用因为每次都把当前的对象返回，this就是最大的dom元素，addpage在这个dom中进行操作
	}


	this.addComponent=function(name,cfg){
		var cfg=cfg||{};

		cfg=$.extend({
			type:'base',
		},cfg)//设置默认参数

		var component;//定义一个变量存储组件元素
		var page=this.page.slice(-1)[0];
		switch(cfg.type){
			case 'base':
			component= new H5ComponentBase(name,cfg);
			break;

			case 'polyline':
			component= new H5ComponentPolyline(name,cfg);
			break;

			case 'pie':
			component= new H5ComponentPie(name,cfg);
			break;

			case 'radar':
			component=new H5ComponentRadar(name,cfg);
			break;

			case 'point':
			component=new H5ComponentPoint(name,cfg);
			break;

			case 'ring':
			component=new H5ComponentRing(name,cfg);
			break;

			case 'bar':
			component=new H5ComponentBar(name,cfg);
			break;

			case 'bar_v':
			component=new H5ComponentBarV(name,cfg);
			break;

			default:
		}
		page.append(component)
		return this;
	}

	this.loader =  H5_loading;
    return this;
}

