var H5ComponentPoint=function(name,cfg) {
	var component=new H5ComponentBase(name,cfg);
	
	var base=cfg.data[0][1];//以第一项的大小为基准

	$.each(cfg.data,function(idx,item){
		var point=$('<div class="point point_'+idx+'">')
		
		var per=(item[1]/base*100)+"%";

		var name=$('<div class="name">'+item[0]+'</div>');
		var rate=$('<div class="rate">'+(item[1]*100)+'%'+'</div>');
		name.append(rate);
		point.append(name);
		point.width(per).height(per);
		if(item[2])//设置颜色属性,该属性不是默认的
		{
			point.css('background-color',item[2]);
		}
		if(item[3]!=undefined&&item[4]!=undefined)//若定义了x轴与y轴的偏移
		{
			point.css('left',item[3]).css("top",item[4])
			point.data('left',item[3]).data('top',item[4])
		}
		//设置zindex和初始位置
		point.css('zIndex',100-idx)//使最上面的元素的zindex最大
		point.css('left',0).css('top',0);//初始化位置
		point.css('transition','all 1s '+idx*.5+'s')


		component.append(point);

	})

	component.on('onLoad',function(){
		component.find('.point').each(function(idx,item){
			$(item).css('left',$(item).data('left')).css("top",$(item).data('top'))
		})
	})

	component.on('onLeave',function(){
		component.find('.point').each(function(idx,item){
			$(item).css('left',0).css("top",0)
		})
	})


	component.find('.point').click(function(){
		component.find('.point').removeClass('point_focus');
		$(this).addClass("point_focus")
		return false;
	}).eq(0).trigger("click");

	return component;
}