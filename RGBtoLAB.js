self.addEventListener('message', function(e) {
var data = e.data;
var w=data.msg1;
var h=data.msg2;

var s=h*w;
	j=0;
	RGB= new Array(3);
	XYZ= new Array(3);
	MAT= new Array(3);
	for (i = 0; i <3; ++ i)
	{
		RGB[i] = new Array(w*h);
		XYZ[i] = new Array(w*h);
		MAT[i] = new Array(3);	
	}	
	var t=0;	
	for(var col=0;col<w;col++)
	{
		for(var row=0;row<h;row++)
		{
			RGB[0][t]=data.msg[row][col][0];
			RGB[1][t]=data.msg[row][col][1];
			RGB[2][t]=data.msg[row][col][2];
			t++;
		}
	}
	
	var T = 0.008856;
	MAT[0][0]=0.412453;
	MAT[0][1]=0.357580;
	MAT[0][2]=0.180423;
	MAT[1][0]=0.212671;
	MAT[1][1]=0.715160;
	MAT[1][2]=0.072169;
	MAT[2][0]=0.019334;
	MAT[2][1]=0.119193;
	MAT[2][2]=0.950227;
	
	var sum;
	for(var i=0;i<3 ;i++)
	{
		for(var j=0;j<s ;j++)
		{
			sum=0;
			for(var k=0;k<3;k++)
			{
				sum=sum+(MAT[i][k]*RGB[k][j]);
				XYZ[i][j]=sum;
				
			}
			//document.write(XYZ[i][j].toFixed(4));
			//document.write(" ; ");			
		}
		//document.write("<br>");
		//document.write("<br>");
	}
	
	X= new Array(s);
	Y= new Array(s);
	Z=new Array(s);
	XT= new Array(s);
	YT= new Array(s);
	ZT=new Array(s);
	XT1= new Array(s);
	YT1= new Array(s);
	ZT1=new Array(s);
	Y3=new Array(s);
	fX=new Array(s);
	fY=new Array(s);
	fZ=new Array(s);
	L=new Array(s);
	a=new Array(s);
	b=new Array(s);
	
	for(var j=0;j<s ;j++)
	{
		X[j] = (XYZ[0][j]) / 0.950456;
		Y[j] = (XYZ[1][j]);
        Z[j] = (XYZ[2][j]) / 1.088754;	
		if(X[j]>T) XT[j]=1;
		else XT[j]=0;	
		if(Y[j]>T) YT[j]=1;
		else YT[j]=0;	
		if(Z[j]>T) ZT[j]=1;
		else ZT[j]=0;
		Y3[j] = Math.pow(Y[j],.3333)	
        		
	}
 		
	for(var j=0;j<s ;j++)
	{
		fX[j]=XT[j]*(Math.pow(X[j],0.3333));
		if(XT[j]==0) XT1[j]=1;
		else XT1[j]=0;
		var temp=(7.787* X[j]) + (16/116);
		fX[j]=fX[j]+(XT1[j]*temp);
			
		fY[j]=YT[j]*Y3[j];
		if (YT[j] == 0) YT1[j]=1;
		else YT1[j]=0;
		var temp1 = (7.787* Y[j]) + (16/116);
		fY[j]=fY[j]+(YT1[j]*temp1);
			
		fZ[j]=ZT[j]*(Math.pow(Z[j],0.3333));
		if(ZT[j]==0) ZT1[j]=1;
		else ZT1[j]=0;
		var temp2=(7.787* Z[j]) + (16/116);
		fZ[j]=fZ[j]+(ZT1[j]*temp2);	
	}	
		
	for(var j=0;j<s ;j++)
	{
		var temp3=(116 * Y3[j]) - 16.0;
		L[j]=YT[j]*temp3;
			
		if(YT[j]==0) YT1[j]=1;
		else YT1[j]=0;
		var temp4=YT1[j]* (903.3 * Y[j]);
			
		L[j]=L[j]+temp4;
		a[j]=(500 * (fX[j] - fY[j]));
		b[j] =(200 * (fY[j] - fZ[j]));
		//document.write(b[j].toFixed(4));
		//document.write(" ; ");
	}
	
	
    f_L= new Array(h);
	f_a= new Array(h);
	f_b= new Array(h);
	for (i = 0; i < f_L.length; ++ i)
	{
		f_L[i] = new Array(w);
		f_a[i] = new Array(w);
		f_b[i] = new Array(w);
	}
	var j=0;
	for(var col=0;col<w;col++)
	{
		for(var row=0;row<h;row++)
		{
			f_L[row][col]=L[j].toFixed(4);
			f_a[row][col]=a[j].toFixed(4);
			f_b[row][col]=b[j].toFixed(4);
			//document.write(f_L[row][col]);
			//document.write(" ; ");
			j++;
		}
		//document.write("<br>");
		//document.write("<br>");
		//document.write("<br>");
	}
	for(var row=0;row<h;row++)
	{
		for(var col=0;col<w;col++)
		{
			//document.write(f_a[row][col]);
			//document.write(" ; ");
		}
		//document.write("<br>");
		//document.write("<br>");
	}
	



self.postMessage({'L':f_L,'A':f_a, 'B':f_b});
}, false);







