var reglafalsa=function(){var e=[{name:"$f(x)=$",id:"f",title:"Función a encontrar la raíz",value:"exp(3x-12) + x*cos(3x) - x^2 + 4",type:"func",graph:!0},{name:"$x_i=$",id:"xi",title:"Valor inferior",value:"2",type:"num",validate:"float"},{name:"$x_s=$",id:"xs",title:"Valor superior",value:"3",type:"num",validate:"float"},{name:"Iteraciones:",id:"ni",value:"11",type:"num",validate:"int+"},{name:"Tolerancia:",id:"tol",value:"0.0005",type:"num",validate:"float+"}],a=[{name:"$Iter$"},{name:"$x_i$"},{name:"$x_u$"},{name:"$x_m$"},{name:"$f(x_m)$",exp:!0,dec:1},{name:"$Error$",exp:!0,dec:1}],n={metodo:"El método de <b>regla falsa</b>, aunque conserva las características y condiciones del método de bisección, difiere en la forma como calculan el punto medio. El método de regla falsa traza una recta secante entre los intervalos, la cual intercepta el eje x, siendo esta intersección el punto medio, de esta manera se traza una nueva recta del punto encontrado hasta el otro extremo del intervalo y así se continua hasta encontrar una raíz o un $x_m$ cuyo $f(x_m)$ esté lo suficientemente cerca de $0$. Por lo general, este método es más eficiente que el método de la bisección.",simulacion:""},t=function(e,a,n,t,o,r){var i=this.math,l=[],u=[],s=e(a),c=e(n);if(0===s)u.push("$x_i = "+a+"$ es una raíz");else if(0===c)u.push("$x_u = "+n+"$ es una raíz");else if(s*c<0){var m,d=a-s*(n-a)/(c-s),$=e(d),x=1,f=o+1;for(l.push([x,a,n,d,$,""]);f>o&&0!==$&&x<t;)s*$<0?(n=d,c=$):(a=d,s=$),m=d,d=a-s*(n-a)/(c-s),$=e(d),f=i.abs(d-m),r&&(f/=d),x+=1,l.push([x,a,n,d,$,f]);0===$?u.push("Aproximación a la raíz $x_m="+d+"$ donde $f(x_m)=0$"):f<o?u.push("Aproximación a la raíz $x_m="+d+"$ con error = "+f):u.push("Fracaso en "+t+" iteraciones, hasta el momento $x_m="+d+"$")}else u.push("El intervalo es inadecuado, encuentre uno con cambio de signo en $f(x)$");return{data:l,message:u}};return{getEntrada:function(){return e},getResultType:function(){return a},getAyuda:function(){return n},execute:t}}();