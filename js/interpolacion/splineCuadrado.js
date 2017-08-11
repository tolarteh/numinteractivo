; (function (global) {

	var splineCuadrado = function (n, vectorX, vectorY, x) {
		var message = "";
		var result = [];

		var numVar = (vectorX.length - 1) * 3
		var answers = [];
		var b = [];
		var temp = [];
		var aux, aux2;



        splinePrint("Dado que en la tabla se tienen $" + vectorX.length + "$ puntos, entonces el polinomio cuadrático, $p(x)$, definido por tramos, tiene la forma:");
        splinePrint("\\[p(x) = \\begin{cases} ");
        for (var i = 0; i < vectorX.length-1; i++) {
            splinePrint("a_{" + (i + 1) + "}x^{2} + b_{" + (i + 1) + "}x + c_{" + (i + 1) + "} && " + vectorX[i] + "\\leq x \\leq" + vectorX[i + 1]+"\\\\");
        }
        splinePrint("\\end{cases}\\]");


		splinePrint("Para determinar el valor de cada polinomio es necesario conocer el valor de todos los coeficientes de los polinomios asociados, para ello se define un sistema de ecuaciones lineales. Dado que son $"+((vectorX.length-1)*3)+"$ variables, se necesitan $"+((vectorX.length-1)*3)+"$ ecuaciones.");
		splinePrint("En la construcción del sistema de ecuaciones lineales se tiene en cuenta que el polinomio resultante debe: pasar por los puntos, ser continuo y en los puntos de conexión preservar el comportamiento (suavidad y concavidad). En total se generan $"+((vectorX.length-1)*3)+"$ ecuaciones.");
		splinePrint("Las siguientes ecuaciones hacen cumplir el requisito de \"pasa por\" y continuidad.");


		for (var i = 0, j = 0; i < vectorX.length-1; i++, j = j+2) {
			// Primer punto
			splinePrint((j+1)+". El polinomio resultante pasa por $("+vectorX[i]+","+vectorY[i]+")$, por lo tanto:");
			splinePrint("\\begin{eqnarray}");
			splinePrint("a_{"+(i+1)+"}*("+vectorX[i]+")^2 + b_{"+(i+1)+"}*("+vectorX[i]+") + c_{"+(i+1)+"} & = & "+vectorY[i]+"\\\\");

			var termA = Math.pow(vectorX[i], 2);
			var termB = vectorX[i];
			if(vectorX[i] != 0){
				if(vectorX[i] == 1) termA = termB = "";

				splinePrint(termA+"a_{"+(i+1)+"} + "+termB+"b_{"+(i+1)+"} + c_{"+(i+1)+"} & = & "+vectorY[i]+"\\\\");
			}else{
				splinePrint("c_{"+(i+1)+"} & = & "+vectorY[i]+"\\\\");
			}
			splinePrint(" \\end{eqnarray}");

			//Segundo punto
			splinePrint((j+2)+". El polinomio resultante pasa por $("+vectorX[i+1]+","+vectorY[i+1]+")$, por lo tanto:");
			splinePrint("\\begin{eqnarray}");
			splinePrint("a_{"+(i+1)+"}*("+vectorX[i+1]+")^2 + b_{"+(i+1)+"}*("+vectorX[i+1]+") +c_{"+(i+1)+"} & = & "+vectorY[i+1]+"\\\\");

			termA = Math.pow(vectorX[i+1], 2);
			termB = vectorX[i+1];
			if(vectorX[i+1] != 0){
				if(vectorX[i+1] == 1) termA = termB = "";

				splinePrint(termA+"a_{"+(i+1)+"} + "+termB+"b_{"+(i+1)+"} + c_{"+(i+1)+"} & = & "+vectorY[i+1]+"\\\\");
			}else{
				splinePrint("c_{"+(i+1)+"} & = & "+vectorY[i]+"\\\\");
			}

			splinePrint(" \\end{eqnarray}");

		}

		splinePrint("<br>Dado que en los puntos de conexión el polinomio resultante debe preservar el comportamiento (suavidad y concavidad). Para ello se determina el esquema de la derivada la función definida por tramos.");
        splinePrint("\\[p'(x) = \\begin{cases} ");
        for (var i = 0; i < vectorX.length-1; i++) {
            splinePrint("2a_" + (i + 1) + "x + b_" + (i + 1) + " && " + vectorX[i] + "\\leq x \\leq" + vectorX[i + 1]+"\\\\");
        }
        splinePrint("\\end{cases}\\]");

		for (var i = 0; i < vectorX.length - 1; i++) {

			temp = [];
			for (var j = 0; j < numVar; j++) {
				temp.push(0);
			}

			aux = Math.pow(vectorX[i], 2);
			aux2 = Math.pow(vectorX[i + 1], 2);

			temp[i * 3] = aux;
			temp[i * 3 + 1] = vectorX[i];
			temp[i * 3 + 2] = 1;
			answers.push(temp);
			b.push(vectorY[i]);

			temp = [];
			for (var j = 0; j < numVar; j++) {
				temp.push(0);
			}

			temp[i * 3] = aux2;
			temp[i * 3 + 1] = vectorX[i + 1];
			temp[i * 3 + 2] = 1;
			answers.push(temp);
			b.push(vectorY[i + 1]);
		}


		splinePrint("Las siguientes ecuaciones hacen cumplir el requisito de que la derivada exista en los puntos de conexión.");
		for (var i = 0; i < vectorX.length; i++) {

			temp = [];
			for (var j = 0; j < numVar; j++) {
				temp.push(0);
			}
			aux = 2 * vectorX[i];

			if (i > 0 && i < vectorX.length - 1) {
				splinePrint("En $x="+vectorX[i]+"$ hay un punto de conexión. Por lo tanto, la ecuación resultante es: ");
				splinePrint("$$"+aux + "a_{" + i + "} + b_{" + i + "} = "+aux+"a_{"+(i+1)+"} + b_{" + (i + 1)+"}$$");

				temp[(i - 1) * 3] = aux;
				temp[(i - 1) * 3 + 1] = 1;
				temp[i * 3] = ((-1) * aux);
				temp[i * 3 + 1] = (-1);
				answers.push(temp);
				b.push(0);

			}
		}

		splinePrint("Falta una condición para completar el sistema de ecuaciones. Existen varias opciones que dependen del conocimiento del contexto del problema que se tenga. Por ejemplo se puede determinar el conocimiento de la primera o la segunda derivada en uno de los extremos del intervalo de interés. En este caso, en $x="+vectorX[1]+"$ se supone que la segunda derivada es cero. Par lo tanto $2a_1=0$, es decir, la última ecuación es:");
		splinePrint("$$a_1 = 0$$");



		temp = [];
		for (var j = 0; j < numVar; j++) {
			if (j == 0) {
				temp.push(1);
			} else {
				temp.push(0);
			}
		}

		answers.push(temp);
		b.push(0);

		console.log(answers);
		console.log(b);

		//splineRenderTable(answers, b);
		var data = Sistema(answers.slice(), b.slice());
		data.eliminacionGaussianaPivoteo();

		var ecu = [];
		for (var j = 0; j < data.numeroColumna.length; j++) {
			var auxNum = data.numeroColumna.length-1;
			var text = "";
			var first = true;

			for (var i = 0; i < data.answer.length; i++) {
				if(data.numeroColumna[auxNum--]-1 != j) continue;

				var num = round(data.answer[i],3);
				if(num != 0){
					text += num;
				}

			}
			ecu.push(text);
		}


		splinePrint("Al resolver el sistema de ecuaciones, el polinomio resultante es:");
		splinePrintSolucion("<h3>Resultado:</h3>");
        splinePrintSolucion("\\[p(x) = \\begin{cases} ");
        for (var i = 0, j = 0; i < vectorX.length-1; i++, j+=3) {
			var text = "";
			var sign = "";
			var first = true;

			if(ecu[j] != ""){
				text += ecu[j]+"x^{2}";
				first = false;
			}
			if(ecu[j+1] != ""){
				sign = (ecu[j+1] < 0) ? " - " : " + ";
				sign = (first && ecu[j+1] > 0) ? "" : sign;

				text += sign+Math.abs(ecu[j+1])+"x";
				first = false;
			}
			if(ecu[j+2] != ""){
				sign = (ecu[j+2] < 0) ? " - " : " + ";
				sign = (first && ecu[j+2] > 0) ? "" : sign;

				text += sign+Math.abs(ecu[j+2])+"";
				first = false;
			}

            splinePrintSolucion(text+" && " + vectorX[i] + "\\leq x \\leq" + vectorX[i + 1]+"\\\\");
        }
        splinePrintSolucion("\\end{cases}\\]");





		printSolucionButton();

		return { data: result, message: message };
	}

	var notZero = function (n) {
        n = +n;  // Coerce to number.
        if (!n) {  // Matches +0, -0, NaN
            throw new Error('División por cero');
        }
        return n;
    }
	var round = function (value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / notZero(multiplier);
    }

	global.splineCuadrado = splineCuadrado;
})(window);