!function(i){var t=function(){for(var i=0;i<this.A.length;i++)this.answer.push(0);console.log(this.answer);for(var t=0;t<this.A.length-1;t++)this.printEtapa(t+1),this.multiplicadores=[],this.mayor(),this.cambioFilas(0),this.cambioColumnas(),this.printAb(),this.sacarMultiplicadores(),this.eliminacionGaussiana(),this.etapaAb+="'",t<this.A.length-2&&this.printAb(),this.cont_i++,this.cont_j++;this.print("La matriz resultante es:"),this.printAb(!0),this.sustitucionRegresiva("A")};i.prototype.eliminacionGaussianaPivoteo=t}(Sistema);