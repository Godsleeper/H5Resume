var H5ComponentBar=function(name,cfg) {
	var component=new H5ComponentBase(name,cfg);
	$.each(cfg.data,function(idx,item){
		var line=$('<div class="line">');//单个柱状图组件，包括标题，柱图，百分比
		var name=$('<div class="name">');//标题
		var rate=$('<div class="rate">');//图
		var per =$('<div class="per">');//百分比

		var width=item[1]*100+'%';
		var realwidth=item[1]*65+'%';
		rate.html('<div class="bg"></div>')
		if(item[2]!=undefined)
		{
			rate.find(".bg").css('background-color',item[2])
		
		}
		rate.css('width',realwidth);//rate的宽度根据百分比绝对，bg.width设为100%与rate相同
		name.text(item[0]);
		line.append(name).append(rate).append(per);
		per.text(width);
		component.append(line);
	})
	return component;
}