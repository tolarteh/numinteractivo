!function(t){var i=function(){for(var t=0;t<this.A.length;t++)this.answer.push(0),this.numeroColumna.push(t+1);for(var i=[],t=0;t<this.A.length;t++){i=[];for(var s=0;s<this.A.length;s++)i.push(0);this.matrizL.push(i)}for(var t=0;t<this.A.length;t++){i=[];for(var s=0;s<this.A.length;s++)t==s?i.push(1):i.push(0);this.matrizU.push(i)}this.printALUCrout();for(var t=0;t<this.A.length;t++)this.printEtapa(t+1),this.croutMatrizL(t),this.croutMatrizU(t),this.print("Como resultado de esta etapa tenemos:"),this.printALUCrout(t),this.cont_i++,this.cont_j++;console.log(this.matrizL),console.log(this.matrizU),this.sustitucionProgresiva(),console.warn(this.matrizU),this.printSolucionB(),this.sustitucionRegresiva("U"),console.warn(this.matrizU),console.log(this.answer)};t.prototype.crout=i}(Sistema);