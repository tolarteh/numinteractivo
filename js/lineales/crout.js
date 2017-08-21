;(function (global){

	var crout = function(){

		for (var i = 0; i < this.A.length; i++) {
			this.answer.push(0);
			this.numeroColumna.push(i+1);
		}

		var aux = [];
		for (var i = 0; i < this.A.length; i++) {
			aux = []
			for (var j = 0; j < this.A.length; j++) {
				aux.push(0);
			}
			this.matrizL.push(aux);
		}

		for (var i = 0; i < this.A.length; i++) {
			aux = []
			for (var j = 0; j < this.A.length; j++) {
				if (i == j) {
					aux.push(1);
				}else{
					aux.push(0);
				}
			}
			this.matrizU.push(aux);
		}

		//this.printAbEcuaciones();
		this.printALUCrout();
		for (var i = 0; i < this.A.length; i++) {
			this.printEtapa(i+1);
			this.croutMatrizL(i);
			this.croutMatrizU(i);
			this.print("Como resultado de esta etapa tenemos:");
			this.printALUCrout(i);

			this.cont_i++;
			this.cont_j++;
		}

		this.sustitucionProgresiva();//sustitución progreasiva
		this.printSolucionB();
		this.sustitucionRegresiva("U");//sustitución regresiva en U
		console.log(this.answer);
	}

	global.prototype.crout = crout;
})(Sistema);