
self.addEventListener('message', function(e) {
var data = e.data;
var w=data.msg;
var h=data.msg1;
var diag=Math.sqrt((w*w)+(h*h));
var radius=0.02*diag;

self.postMessage(radius);
 
}, false);