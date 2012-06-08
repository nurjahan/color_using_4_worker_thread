self.addEventListener('message', function(e) {
var data = e.data;
var bin=data.msg2;
var w=data.msg3;
var h=data.msg4;

var min=-100;
	var max=110;
	CMapA= new Array(h);
	CMapB= new Array(h);
	for (i = 0; i <h; ++ i)
	{
		CMapA[i] = new Array(w);
		CMapB[i] = new Array(w);
	}
	for(var i=0;i<h;i++)
	{
		for(j=0;j<w;j++)
		{
			CMapA[i][j]=Math.ceil(((data.msg[i][j]-min)/(max-min))*bin);
			CMapB[i][j]=Math.ceil(((data.msg1[i][j]-min)/(max-min))*bin);
		}
	}

self.postMessage({'colorA':CMapA, 'colorB':CMapB});
}, false);





