!function(t){var s=function(){for(var t=0;t<this.A.length;t++)this.answer.push(0),this.numeroColumna.push(t+1);for(var s=[],t=0;t<this.A.length;t++){s=[];for(var i=0;i<this.A.length;i++)s.push(0);this.matrizL.push(s)}for(var t=0;t<this.A.length;t++){s=[];for(var i=0;i<this.A.length;i++)s.push(0);this.matrizU.push(s)}this.printALUCholesky();for(var t=0;t<this.A.length;t++)this.printEtapa(t+1),this.choleskyMatrizL(),this.choleskyMatrizU(),this.print("Como resultado de esta etapa tenemos:"),this.printALUCholesky(t),this.cont_i++,this.cont_j++;console.log(this.matrizL),console.log(this.matrizU),this.sustitucionProgresiva(),this.sustitucionRegresiva("U")};t.prototype.cholesky=s}(Sistema);