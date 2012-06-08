var CircleCreation=function(radius)
{
	w=Math.floor(radius);
	var w1=(w*2)+1;
	var count=0;
	var u= new Array(w1);
	var v= new Array(w1);
	var circle=new Array(w1);
	for (i = 0; i <w1; ++ i)
	{
		u[i] = new Array(w1);
		v[i] = new Array(w1);
		circle[i]=new Array(w1);
	}	
	for (i=0; i<w1;i++)
	{
		for(j=0;j<w1;j++)
		{
			u[i][j]=j-w;
			v[j][i]=j-w;
		}
	}	
	for (i=0; i<w1;i++)
	{
		for(j=0;j<w1;j++)
		{
			if(((u[i][j]*u[i][j])+(v[i][j]*v[i][j]))<=(radius*radius))
			{
				circle[i][j]=1;
				count=count+1;
			}	
			else
				circle[i][j]=0;
		}
	}
	circle[w][w]=0;
	count=count-1;
	return [circle,u,v,count];		
};