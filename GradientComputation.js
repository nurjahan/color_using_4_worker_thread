importScripts('convolution.js');
importScripts('CircleCreation.js');
importScripts('DivideCircle.js');

self.addEventListener('message', function(e) {
var data = e.data;
var Map = new Array(data.msg5);
for (i = 0; i <data.msg5; ++ i)
	Map[i] = new Array(data.msg4);
						
//Map=data.msg;
var bin=data.msg1;
var radius=data.msg2;
var theta=data.msg3;
var w=data.msg4;
var h=data.msg5;
var cir=CircleCreation(radius);
	circle=cir[0];
	u=cir[1];
	v=cir[2];
	count=cir[3];
	var D_cir=DivideCircle(circle,theta,radius,u,v,count);
	h_circle1=D_cir[0];
	h_circle2=D_cir[1];
	var binMap= new Array(h);
	var gradient= new Array(h);
	for (i = 0; i <h; ++ i)
	{
		binMap[i] = new Array(w);
		gradient[i] = new Array(w);
	}
	for(l=0;l<h;l++)
	{
		for(m=0;m<w;m++)
		{
			gradient[l][m]=0;
		}
	}
	for(var i=1;i<=32;i++)
	{
		for(var j=0;j<h;j++)
		{
			for(var k=0;k<w;k++)
			{
				if(data.msg[j][k]==i)
					binMap[j][k]=1;
				else
					binMap[j][k]=0;
			}
		}
		hGram1=convolution(binMap,h_circle1,'same');
		hGram2=convolution(binMap,h_circle2,'same');
		for(l=0;l<h;l++)
		{
			for(m=0;m<w;m++)
			{
				if(hGram1[l][m]!=0 || hGram2[l][m]!=0)
				{
					gradient[l][m]=(gradient[l][m]+(((hGram1[l][m]-hGram2[l][m])*(hGram1[l][m]-hGram2[l][m]))/(hGram1[l][m]+hGram2[l][m])));
				}
			}
		}
	}
	for(l=0;l<h;l++)
	{
		for(m=0;m<w;m++)
		{
			gradient[l][m]=(gradient[l][m]).toFixed(4);
			gradient[l][m]=(0.5*gradient[l][m]).toFixed(4);
		}
	}
self.postMessage(gradient);
 
}, false);


