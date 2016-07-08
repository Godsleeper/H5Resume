var H5ComponentBarV=function(name,cfg) {
	var component=new H5ComponentBar(name,cfg);
	
	var width=100/cfg.data.length;
	component.find(".line").width(width+'%');

	$.each(component.find(".rate"),function(idx,item){
		var height=$(this).width();
		$(this).height(height*3).width('');
	})

	 $.each( component.find('.per'),function(){
      //  任务二：(4) 重新调整 DOM 结构，把百分比数值(.per)添加到 进度区 (.rate)中，
      //和色块元素(.bg)同级。提示，获得 进度区 元素：$(this).prev() 
      $(this).appendTo( $(this).prev() ) ;
  })
	return component;
}