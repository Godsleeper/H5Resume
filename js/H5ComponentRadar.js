var H5ComponentRadar=function(name,cfg) {
	//画布里坐标按两倍来算的，css样式中要用一半来算
	var component=new H5ComponentBase(name,cfg);
	
	var w=cfg.width;
	var h=cfg.height;

	//加入一个画布
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	component.append(cns)
	
	//绘制网格背景
	var r=w/2;//半径
	var step=cfg.data.length;//需要画出几边形
	for(var j=0;j<10;j++){	
		ctx.beginPath();
			for(var i=0;i<step;i++)
			{	
				var rad=(2*Math.PI/360)*(360/step)*i;//将角度转化为弧度制
				var x=r+Math.sin(rad)*r*(1-j*0.1);//x轴坐标，（r，r）为圆心
				var y=r+Math.cos(rad)*r*(1-j*0.1);//y轴坐标
				ctx.lineTo(x,y)	
			}
			ctx.closePath();//封闭图形
			if(j%2==0)//根据偶数和奇数设置颜色
			{
				ctx.fillStyle='#99c0ff'
			}else
			{
				ctx.fillStyle='#f1f9ff'
			}
			ctx.fill();	
	}	
	//绘制伞骨
	for(var i=0;i<step;i++){
		var rad=(2*Math.PI/360)*(360/step)*i;//将角度转化为弧度制
		var x=r+Math.sin(rad)*r;//x轴坐标，（r，r）为圆心
		var y=r+Math.cos(rad)*r;//y轴坐标
		ctx.moveTo(r,r)
		ctx.lineTo(x,y)

		//绘制文本
		var text=$('<div class="text">');
		text.text(cfg.data[i][0]);
		text.css('opacity',0);
		text.css('transition','all 0.5s '+i*.2+'s')
		//设定文本的x
		if(x>w/2)
		{
			text.css('left',x/2+5)
		}else{
			text.css('right',(w-x)/2+5);
		}
		//设定文本的y
		if(y>h/2)
		{
			text.css('top',y/2+5);
		}else{
			text.css('bottom',(h-y)/2+5);
		}

		if(cfg.data[i][2]!=undefined)
		{
			text.css('color',cfg.data[i][2])
		} 
		
		component.append(text);
	}
	ctx.strokeStyle='#e0e0e0';//设置骨线颜色
	ctx.stroke();
	///////////////////////////////////绘制背景层结束//////////////////////////////////////////

	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	component.append(cns);

	
	ctx.strokeStyle='#f00'
	var draw=function(per){
		if(per>=1){
			component.find('.text').css('opacity',1);
		}
		if(per<1){
			component.find('.text').css('opacity',0);
		}
		ctx.clearRect(0,0,w,h);//清空画布
		//绘制数据折线
		for(var i=0;i<step;i++)
		{
			var rate=cfg.data[i][1]*per;
			var rad=(2*Math.PI/360)*(360/step)*i
			var x=r+Math.sin(rad)*r*rate;//x轴坐标，（r，r）为圆心
			var y=r+Math.cos(rad)*r*rate;//y轴坐标
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.stroke();

		//绘制数据点
		ctx.fillStyle='#ff7676'
		for(var i=0;i<step;i++)
		{
			var rate=cfg.data[i][1]*per;
			var rad=(2*Math.PI/360)*(360/step)*i
			var x=r+Math.sin(rad)*r*rate;//x轴坐标，（r，r）为圆心
			var y=r+Math.cos(rad)*r*rate;//y轴坐标
			ctx.beginPath();
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fill();
			
		}
		
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