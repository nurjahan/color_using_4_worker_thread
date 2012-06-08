function convolution(arg1,arg2,arg3,arg4)
{
	if(arguments.length==2)
		c=emlConv2('full',arg2,arg1);
	else if(arguments.length==3)
	{
		if(typeof(arg3)=='string')
			c=emlConv2(arg3,arg2,arg1);
		else
			c=emlConv2('full',arg3,arg2,arg1);
	}
	else
		c=emlConv2(arg4,arg3,arg2,arg1);
	return c;
}

function emlConv2(shape,b,a,h1)
{
	var seperable=0;
	if(arguments.length==4)
		seperable=1;
	else
	{
		ma=a.length; // height of a
		na=a[0].length; //width of a
	}
	mb=b.length;
	nb=b[0].length;
	
	if(shape=='full')
	{
		if(ma==0 || mb==0)
			mc=ma+mb;
		else
			mc=ma+mb-1;	
		if (na==0 || nb == 0)
            nc = na + nb;
        else
            nc = na + nb - 1;
        ioffset = 0;
        joffset = 0;
	}
	else if(shape=='same')
	{
		mc = ma;
        nc = na;
        if (mb < 1)
            ioffset = 0;
        else
            ioffset = Math.round((mb-1)/2);
           
        if (nb < 1)
            joffset = 0;
        else
            joffset=Math.round((nb-1)/2);
	}
	else
	{
		ioffset = mb - 1;
        joffset = nb - 1;
        if(ma < ioffset)
            mc = 0;
        else
            mc = ma - ioffset;   
        if(na < joffset)
            nc = 0;
        else
            nc = na - joffset;
	}
	c = conv2nonsep(a,b,mc,nc,ioffset,joffset);
	return c;
}


function conv2nonsep(a,b,mc,nc,ioffset,joffset)
{
	var sum;
	ma=a.length; // height of a
	na=a[0].length; //width of a
	mb=b.length;
	nb=b[0].length;
	c= new Array(mc);
	for (i = 0; i <mc; ++ i)
		c[i] = new Array(nc);
	for (jc=0;jc<nc;jc++)
	{
		j = jc + joffset;
		jp1 = j + 1;
		if(nb < jp1) // ja1 = max(0,jp1-nb);
			ja1 = jp1 - nb;
		else
			ja1 = 0;
		if(na <= j) // ja2 = min(na-1,j);
			ja2 = na-1;
		else
			ja2 = j;
		for(ic=0;ic<mc;ic++)
		{
			i = ic + ioffset;
			ip1 = i + 1;
			if(mb < ip1)  //ia1 = max(0,ip1-mb);
				ia1 = ip1 - mb;
			else
				ia1 = 0;
			if(ma <= i) // ia2 = min(ma-1,i);
				ia2 = ma-1;
			else
				ia2 = i;
			sum=0;
			for(var ja=ja1;ja<=ja2;ja++)
			{
				jb = jp1 - ja-1;
				for(var ia=ia1;ia<=ia2;ia++)
				{
					ib = ip1 - ia-1;
					sum=sum+(a[ia][ja]*b[ib][jb]);	
				}
			}
			c[ic][jc]=sum;
		}
    }
	return c;
}