var H5ComponentBarV=function(name,cfg) {
	var component=new H5ComponentBar(name,cfg);
	
	var width=100/cfg.data.length;
	component.find(".line").width(width+'%');

	$.each(component.find(".rate"),function(idx,item){
		var height=$(this).width();
		$(this).height(height*3).width('');
	})

	 $.each( component.find('.per'),function(){
      $(this).appendTo( $(this).prev() ) ;
  })
	return component;
}