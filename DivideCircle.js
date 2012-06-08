var DivideCircle=function(circle,theta,radius,u,v,count)
{
	x1=radius*Math.cos(theta);
	y1=radius*Math.sin(theta);
	x=0;y=0;
	a=Math.floor(radius)*2+1;
	var halfCircle1= new Array(a);
	var halfCircle2= new Array(a);
	for (i = 0; i <a; ++ i)
	{
		halfCircle1[i] = new Array(a);
		halfCircle2[i] = new Array(a);	
	}
	for(i=0;i<a;i++)
	{
		for(j=0;j<a;j++)
		{
			halfCircle1[i][j]=0;
			halfCircle2[i][j]=0;
			if(theta==0 && v[i][j]==0 && u[i][j]>0)
			{
				halfCircle1[i][j]=(circle[i][j]/count*2).toFixed(4);
			}
            else
			{			
				if((((x1-x)*(v[i][j]-y))-((y1-y)*(u[i][j]-x)))>0)
					halfCircle1[i][j]=(circle[i][j]/count*2).toFixed(4);
				else
					halfCircle2[i][j]=(circle[i][j]/count*2).toFixed(4);
			}			
		}	
	}
	return [halfCircle1,halfCircle2];
};