!function(r){var n=function(r,n,o,a){var i=[],f="",t=new Array;for(w=0;w<r;w++)for(t[w]=new Array,c=0;c<r;c++)t[w][c]="";for(var u=1,v=0,w=0;w<r;w++){t[w][0]=o[w];for(var c=1;c<=w;c++)t[w][c]=(t[w][c-1]-t[w-1][c-1])/e(n[w]-n[w-c]);i.push([t[w].slice()]),w>0&&(u*=a-n[w-1]),v+=t[w][w]*u}var s="\\begin{eqnarray} p(x) &= &";s+=t[0][0];for(var p="",w=1;w<r;w++)s+="\\nonumber \\\\ & &",p+="(x-"+n[w-1]+") ",s+=t[w][w]+" * "+p,s+=t[w][w]>0?"+":"-";return""!=a&&(s+="\\\\ p("+a+") &= & "+v+" \\nonumber"),s+="\\end{eqnarray}",f=s,{data:i,message:f}},e=function(r){if(r=+r,!r)throw new Error("División por cero");return r};r.newton=n}(window);