function nonmaxSuppression(maxMag,maxOrt,h,w,Ort)
{
	mask= new Array(h);
	boundary= new Array(h);
	for (i = 0; i <h; ++ i)
	{
		mask[i] = new Array(w);
		boundary[i] = new Array(w);
	}
	for(i=0;i<h;i++)
	{
		for(j=0;j<w;j++)
		{
			maxOrt[i][j]=(((maxOrt[i][j]-1)/Ort)*Math.PI).toFixed(4);
			if((i>0 && i<h-1) && (j>0 && j<w-1))
			{
				if((maxOrt[i][j]>=Math.PI/2) &&(maxOrt[i][j]<(3*Math.PI/4)))
				{
					if(maxMag[i][j]>=maxMag[i-1][j] && maxMag[i][j]>=maxMag[i+1][j])
						mask[i][j]=1;
					else
						mask[i][j]=0;
				}
				else if((maxOrt[i][j]>=(3*Math.PI/4)) &&(maxOrt[i][j]<Math.PI))
				{
					if(maxMag[i][j]>=maxMag[i-1][j-1] && maxMag[i][j]>=maxMag[i+1][j+1])
						mask[i][j]=1;
					else
						mask[i][j]=0;
				}
				else if((maxOrt[i][j]>=0) &&(maxOrt[i][j]<Math.PI/4))
				{
					if(maxMag[i][j]>=maxMag[i][j-1] && maxMag[i][j]>=maxMag[i][j+1])
						mask[i][j]=1;
					else
						mask[i][j]=0;
				}
				else
				{
					if(maxMag[i][j]>=maxMag[i+1][j-1] && maxMag[i][j]>=maxMag[i-1][j+1])
						mask[i][j]=1;
					else
						mask[i][j]=0;
				}
				boundary[i][j]=mask[i][j]*maxMag[i][j];
			}
			else
				boundary[i][j]=maxMag[i][j];
		}
	}
	return boundary;
}