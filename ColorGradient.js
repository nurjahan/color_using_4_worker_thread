function ColorGradient(image,Ort,bin,radius,w,h)
{
	L2= new Array(h);
	A2= new Array(h);
	B2= new Array(h);
	CmapA= new Array(h);
	CmapB= new Array(h);
	maxMag=new Array(h);
	maxOrt=new Array(h);
	
	for (i = 0; i < L2.length; ++ i)
	{
		L2[i] = new Array(w);
		A2[i] = new Array(w);
		B2[i] = new Array(w);
		maxMag[i] = new Array(w);
		maxOrt[i] = new Array(w);
		CmapA[i] = new Array(w);
		CmapB[i] = new Array(w);
	}
	var imageGamma = new Array(h);
	for (i = 0; i <h; ++ i)
	{
		imageGamma[i] = new Array(w);
		for (j = 0; j <w; ++ j)
			imageGamma[i][j] = new Array(3);
	}
	for(var row=0; row<h; row++)
	{
		for(var col=0; col<w; col++)
		{
			imageGamma[row][col][0]=Math.pow(image[row][col][0],2.5);
			imageGamma[row][col][1]=Math.pow(image[row][col][1],2.5);
			imageGamma[row][col][2]=Math.pow(image[row][col][2],2.5);
		}
	}
	LAB=RGBtoLAB(imageGamma,w,h);
	L2=LAB[0];
	A2=LAB[1];
	B2=LAB[2];
	CMap=ColorMap(A2,B2,bin,w,h);
	CmapA=CMap[0];
	CmapB=CMap[1];
	var ClGA = new Array(h);
	var ClGB=new Array(h);
	for (i = 0; i <h; ++ i)
	{
		ClGA[i] = new Array(w);
		ClGB[i] = new Array(w);
		for (j = 0; j <w; ++ j)
		{
			ClGA[i][j] = new Array(Ort);
			ClGB[i][j] = new Array(Ort);
		}	
	}
	var theta=new Array();
	for(var i=0;i<Ort;i++)
	{
		theta[i]=i*Math.PI/Ort;
		CGMOA=GradientComputation(CmapA,bin,radius,theta[i],w,h);
		CGMOB=GradientComputation(CmapB,bin,radius,theta[i],w,h);
		for(l=0;l<h;l++)
		{
			for(m=0;m<w;m++)
			{
				ClGA[l][m][i]=CGMOA[l][m];
				ClGB[l][m][i]=CGMOB[l][m];
			}
		}	
	}
	CFComb=CFeatureCombination(ClGA,ClGB,Ort,w,h);
	
	maxMag=CFComb[0];
	maxOrt=CFComb[1];
	PBoundary=nonmaxSuppression(maxMag,maxOrt,h,w,Ort);
	return PBoundary;
}