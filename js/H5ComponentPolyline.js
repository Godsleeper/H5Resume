var H5ComponentPolyline=function(name,cfg) {
	var component=new H5ComponentBase(name,cfg);
	
	var w=cfg.width;
	var h=cfg.height;

	//加入一个画布
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	component.append(cns)
	//网格线的绘制
	var step=10;
	ctx.beginPath();//开始进行绘制
	ctx.lineWidth=1;//画笔宽度一个像素
	ctx.strokeStyle='#AAAAAA';//画笔颜色灰色
	//水平网格线
	
	for(var i=0;i<step+1;i++)
	{
		var y=(h/step)*i;
		ctx.moveTo(0,y)
		ctx.lineTo(w,y)
	
	}

	//垂直网格线和文本的绘制
	step=cfg.data.length+1;
	var text_w=Math.floor(w/(cfg.data.length+1));//文本的宽度
	for(var i=0;i<step+1;i++)
	{
		var x=(w/step)*i
		ctx.moveTo(x,0)
		ctx.lineTo(x,h)
		var x_real=(w/step)*(i+0.5)
		//直接用dom元素的方式添加文本
		if(cfg.data[i]!=undefined){
			var text=$('<div class="text">');
			text.text(cfg.data[i][0]);
			component.append(text);
			text.css('width',text_w/2).css('left',x_real/2);
		}
	}
	ctx.stroke();//收笔

	//假如另一个画布，绘制折线图

	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	component.append(cns);

	//绘制折线图的函数
	var draw=function(per){
		ctx.clearRect(0,0,w,h);//清空画布
		ctx.beginPath();//开始进行绘制
		ctx.lineWidth=3;//画笔宽度一个像素
		ctx.strokeStyle='#ff8878';//画笔颜色灰色
		var x=0;
		var y=0;

		//画点
		var row_w=w/(cfg.data.length+1);
		for(var i=0;i<cfg.data.length;i++)
		{
			var item=cfg.data[i];
			x=row_w*(i+1);
			y=h-(item[1]*h*per);
			ctx.moveTo(x,y)
			ctx.arc(x,y,5,0,2*Math.PI);
		}

		//连线操作
		ctx.moveTo(row_w,h-(cfg.data[0][1]*h*per));//画笔移到第一个点位置上
		for(var i=0;i<cfg.data.length;i++)//每次更换点的位置，连接每一个点
		{
			var item=cfg.data[i];
			x=row_w*(i+1);
			y=h-(item[1]*h*per);
			ctx.lineTo(x,y);
		}
		ctx.stroke();
		//绘制阴影
		ctx.lineWidth=1;
		ctx.strokeStyle='rgba(255,255,255,0)';
		ctx.lineTo(x,h);
		ctx.lineTo(row_w,h);
		ctx.fillStyle='rgba(255,136,120,0.2)';//设置颜色,要写在数值的前面
		ctx.fill();

		//写数据
		for(var i=0;i<cfg.data.length;i++)
		{
			var item=cfg.data[i];
			x=row_w*(i+1);
			y=h-(item[1]*h*per);
			ctx.fillStyle=item[2]?item[2]:"#595959";//设置颜色,要写在数值的前面
			ctx.fillText((item[1]*100)+'%',x-10,y-10)//写数值
		}	
		ctx.stroke();//收笔
		
	}

	component.on('onLoad',function(){
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				draw(s);
				
			},i*10+500)
		}
	})

	component.on('onLeave',function(){
		var s=1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=0.01;
				draw(s);
				
			},i*10)
		}
	})
	return component;
}