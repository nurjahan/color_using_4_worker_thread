function BrightnessGradient(image,Ort,bin,radius,w,h)
{
	GrayImage=RGBtoGray(image,w,h);
	BMap=BrightnessMap(GrayImage,bin,w,h);
	var BrGm = new Array(h);
		for (i = 0; i <h; ++ i)
		{
			BrGm[i] = new Array(w);
			for (j = 0; j <w; ++ j)
				BrGm[i][j] = new Array(Ort);
		}
	var theta=new Array();
	for(var i=0;i<=7;i++)
	{
		theta[i]=i*Math.PI/Ort;
		BGMO=GradientComputation(BMap,bin,radius,theta[i],w,h);
		for(l=0;l<h;l++)
		{
			for(m=0;m<w;m++)
			{
				BrGm[l][m][i]=BGMO[l][m];
			}
		}	
	}
	FComb=FeatureCombination(BrGm,Ort,w,h);
	maxMag=FComb[0];
	maxOrt=FComb[1];
	PBoundary=nonmaxSuppression(maxMag,maxOrt,h,w,Ort);
	return PBoundary;
}