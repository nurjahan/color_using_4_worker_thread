function CFeatureCombination(ClGA1,ClGB1,Ort,w,h)
{
	var beta = new Array(3);
	for (i = 0; i <3; ++ i)
		beta[i] = new Array(1);
	var tempA = new Array(w*h);
	var tempB = new Array(w*h);
	for (i = 0; i <w*h; ++ i)
	{
		tempA[i] = new Array(1);
		tempB[i] = new Array(1);
	}	
	var probability=new Array(w*h);
	var Magnitude=new Array(w*h);
	var Orientation=new Array(w*h);
	for (i2 = 0; i2 <w*h; ++ i2)
	{
		Magnitude[i2] = new Array(beta[0].length);
		Orientation[i2] = new Array(beta[0].length);
		probability[i2] = new Array(beta[0].length);
		for (j2 = 0; j2 <w; ++ j2)
			probability[i2][j2] = new Array(2);
	}	
			
	for(i4=0;i4<w*h;i4++)
	{
		for(j4=0;j4<beta[0].length;j4++)
		{
			Magnitude[i4][j4]=0;
			Orientation[i4][j4]=0;
		}
	}	
	var maxMagnitude=new Array(h);
	var maxOrientation=new Array(h);
	for (i2 = 0; i2 <h; ++ i2)
	{
		maxMagnitude[i2] = new Array(w);
		maxOrientation[i2] = new Array(w);
	}	
	beta[0][0]=-2.9216;
	beta[1][0]=1.5439;
	beta[2][0]=2.7643;
	for(var i=0;i<Ort;i++)
	{
		y=0;
		for(j=0;j<w;j++)
		{
			for(k=0;k<h;k++)
			{
				tempA[y][0]=ClGA1[k][j][i];
				tempB[y][0]=ClGB1[k][j][i];
				y++;
			}
		}
		
		var fcmb = new Array(w*h);
		for (i1 = 0; i1 <(w*h); ++ i1)
			fcmb[i1] = new Array(3);
		for(j1=0;j1<w*h;j1++)
		{
			fcmb[j1][0]=1;
			fcmb[j1][1]=tempA[j1][0];
			fcmb[j1][2]=tempB[j1][0];
			
		}
		var maxMagnitude=new Array(h);
		var maxOrientation=new Array(h);
		for (i2 = 0; i2 <h; ++ i2)
		{
			maxMagnitude[i2] = new Array(w);
			maxOrientation[i2] = new Array(w);
		}	
		var mult = new Array(fcmb.length);
		for (i2 = 0; i2 <fcmb.length; ++ i2)
		{
			mult[i2] = new Array(beta[0].length);
		}	
		for(i3=0;i3<fcmb.length;i3++)
		{
			for(j3=0;j3<beta[0].length;j3++)
			{
				mult[i3][j3]=0;
				for(k3=0;k3<fcmb[0].length;k3++)
				{
					mult[i3][j3]=mult[i3][j3]+(fcmb[i3][k3]*beta[k3][j3]);	
				}
				probability[i3][j3][i]=(1/(1+(Math.exp(-mult[i3][j3])))).toFixed(4);
				if(probability[i3][j3][i]>Magnitude[i3][j3])
				{
					Magnitude[i3][j3]=probability[i3][j3][i];
					Orientation[i3][j3]=i;
				}
			}
		}	
	}
	
	m=0;
	for(i=0;i<w;i++)
	{
		for(j=0;j<h;j++)
		{
			maxMagnitude[j][i]=Magnitude[m][0];
			maxOrientation[j][i]=Orientation[m][0];
			m++;
		}
	}
	return [maxMagnitude,maxOrientation];
}