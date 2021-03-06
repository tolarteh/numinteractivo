;(function (global) {


	var splineCubico = function (n, vectorX, vectorY, x) {
		var message = "";
		var result  = [];

		var numVar = (vectorX.length - 1) * 4;
		var answers = [];
		var b = [];
		var temp = [];
		var aux2_1, aux2_2, aux3_1, aux3_2;


        splinePrint("Dado que en la tabla se tienen $" + vectorX.length + "$ puntos, entonces el polinomio cúbico, $p(x)$, definido por tramos, tiene la forma:");
        splinePrint("\\[p(x) = \\begin{cases} ");
        for (var i = 0; i < vectorX.length-1; i++) {
            splinePrint("a_{" + (i + 1) + "}x^{3} + b_{" + (i + 1) + "}x^{3} + c_{" + (i + 1) + "}x + d_{" + (i + 1) + "} && " + vectorX[i] + "\\leq x \\leq" + vectorX[i + 1]+"\\\\");
        }
        splinePrint("\\end{cases}\\]");


		splinePrint("Para determinar el valor de cada polinomio es necesario conocer el valor de todos los coeficientes de los polinomios asociados, para ello se define un sistema de ecuaciones lineales. Dado que son $"+((vectorX.length-1)*4)+"$ variables, se necesitan $"+((vectorX.length-1)*4)+"$ ecuaciones.");
		splinePrint("En la construcción del sistema de ecuaciones lineales se tiene en cuenta que el polinomio resultante debe: pasar por los puntos, ser continuo y en los puntos de conexión preservar el comportamiento (suavidad y concavidad). En total se generan $"+((vectorX.length-1)*4)+"$ ecuaciones.");
		splinePrint("Las siguientes ecuaciones hacen cumplir el requisito de \"pasa por\" y continuidad. Los coeficientes de las ecuaciones cumplen con una ley de formación que se obtiene de la primera componente de cada punto: los de $a_i$ son el cubo de la primera componente, los de $b_i$ son el cuadrado de la primera componente, los de $c_i$ son la primera componente y los de $d_i$ son unos (1). Finalmente cada ecuación se iguala a la segunda componente. Las siguientes $"+((vectorX.length-1)*2)+"$ ecuaciones se obtienen con estos criterios.");

		for (var i = 0, j = 0; i < vectorX.length-1; i++, j = j+2) {
			// Primer punto
			splinePrint((j+1)+". El polinomio resultante pasa por $("+vectorX[i]+","+vectorY[i]+")$, por lo tanto:");
			splinePrint("\\begin{eqnarray}");
			splinePrint("a_{"+(i+1)+"}*("+vectorX[i]+")^3 + b_{"+(i+1)+"}*("+vectorX[i]+")^2 + c_{"+(i+1)+"}*("+vectorX[i]+") & = & "+vectorY[i]+"\\\\");

			var termA = Math.pow(vectorX[i], 3);
			var termB = Math.pow(vectorX[i], 2);
			var termC = vectorX[i];
			if(vectorX[i] != 0){
				if(vectorX[i] == 1) termA = termB = termC = "";

				splinePrint(termA+"a_{"+(i+1)+"} + "+termB+"b_{"+(i+1)+"} + "+termC+"c_{"+(i+1)+"} & = & "+vectorY[i]+"\\\\");
			}else{
				splinePrint("c_{"+(i+1)+"} & = & "+vectorY[i]+"\\\\");
			}
			splinePrint(" \\end{eqnarray}");

			//Segundo punto
			splinePrint((j+2)+". El polinomio resultante pasa por $("+vectorX[i+1]+","+vectorY[i+1]+")$, por lo tanto:");
			splinePrint("\\begin{eqnarray}");
			splinePrint("a_{"+(i+1)+"}*("+vectorX[i+1]+")^3 + b_{"+(i+1)+"}*("+vectorX[i+1]+")^2 + c_{"+(i+1)+"}*("+vectorX[i+1]+") & = & "+vectorY[i+1]+"\\\\");

			termA = Math.pow(vectorX[i+1], 3);
			termB = Math.pow(vectorX[i+1], 2);
			termC = vectorX[i+1];
			if(vectorX[i+1] != 0){
				if(vectorX[i+1] == 1) termA = termB = termC = "";

				splinePrint(termA+"a_{"+(i+1)+"} + "+termB+"b_{"+(i+1)+"} + "+termC+"c_{"+(i+1)+"} & = & "+vectorY[i+1]+"\\\\");
			}else{
				splinePrint("c_{"+(i+1)+"} & = & "+vectorY[i]+"\\\\");
			}

			splinePrint(" \\end{eqnarray}");

		}

		splinePrint("<br>Dado que en los puntos de conexión el polinomio resultante debe preservar el comportamiento (suavidad y concavidad). Para ello se determina el esquema de la derivada la función definida por tramos.");
        splinePrint("\\[p'(x) = \\begin{cases} ");
        for (var i = 0; i < vectorX.length-1; i++) {
            splinePrint("3a_" + (i + 1) + "x^2 + 2b_" + (i + 1) + "x + c_1 && " + vectorX[i] + "\\leq x \\leq" + vectorX[i + 1]+"\\\\");
        }
        splinePrint("\\end{cases}\\]");


		for (var i = 0; i < vectorX.length - 1; i++) {

			temp = [];
			for (var j = 0; j < numVar; j++) {
				temp.push(0);
			}

			aux2_1 = Math.pow(vectorX[i], 2);
			aux2_2 = Math.pow(vectorX[i + 1], 2);
			aux3_1 = Math.pow(vectorX[i], 3);
			aux3_2 = Math.pow(vectorX[i + 1], 3);

			temp[i * 4] = aux3_1;
			temp[i * 4 + 1] = aux2_1;
			temp[i * 4 + 2] = vectorX[i];
			temp[i * 4 + 3] = 1;
			answers.push(temp);
			b.push(vectorY[i]);

			temp = [];
			for (var j = 0; j < numVar; j++) {
				temp.push(0);
			}

			temp[i * 4] = aux3_2;
			temp[i * 4 + 1] = aux2_2;
			temp[i * 4 + 2] = vectorX[i + 1];
			temp[i * 4 + 3] = 1;
			answers.push(temp);
			b.push(vectorY[i + 1]);

		}


		console.log("Solución fase 2:");

		splinePrint("Las siguientes ecuaciones hacen cumplir el requisito de que la derivada exista en los puntos de conexión. Para obtener cada ecuación, el coeficiente de $a_i$ es $3$ veces el $cuadrado$ de la primera componente, mientras que el cofiente de $b_i$ es $2$ veces la primera componente. Las siguientes tres ecuaciones surgen de los tres puntos de empalme entre los intervalos.");
		for (var i = 0; i < vectorX.length - 2; i++) {

			temp = [];
			for (var j = 0; j < numVar; j++) {
				temp.push(0);
			}

			aux3_1 = 3 * Math.pow(vectorX[i + 1], 2);
			aux2_1 = 2 * vectorX[i + 1];

			splinePrint("En $x="+vectorX[i+1]+"$ hay un punto de conexión. Por lo tanto, la ecuación resultante es: ");
			splinePrint("$$"+aux3_1 + "a_{" + (i+1) + "} + "+aux2_1+"b_{" + (i+1) + "} + c_{" + (i+1) +"} = "+aux3_1+"a_{"+(i+2)+"} + "+aux2_1+"b_{" + (i + 2)+"} + c_{"+(i+2)+"}$$");

			console.warn(aux3_1 + "a" + (i + 1) + " + " + aux2_1 + "b" + (i + 1) + " + c" + (i + 1) + " = " + aux3_1 + "a" + (i + 2) + " + " + aux2_1 + "b" + (i + 2) + " + c" + (i + 2));
			temp[i * 4] = aux3_1;
			temp[i * 4 + 1] = aux2_1;
			temp[i * 4 + 2] = 1;
			temp[(i + 1) * 4] = ((-1) * aux3_1);
			temp[(i + 1) * 4 + 1] = ((-1) * aux2_1);
			temp[(i + 1) * 4 + 2] = (-1);
			answers.push(temp);
			b.push(0);
		}

		splinePrint("En los puntos de conexión el polinomio resultante debe preservar el comportamiento (suavidad y concavidad). Para ello se calcula la segunda derivada del polinomio y así se garantiza que se preserve el comportamiento de la concavidad en los puntos de empalme.")

        splinePrint("\\[p''(x) = \\begin{cases} ");
        for (var i = 0; i < vectorX.length-1; i++) {
            splinePrint("6a_" + (i + 1) + "x + 2b_" + (i + 1) + " && " + vectorX[i] + "\\leq x \\leq" + vectorX[i + 1]+"\\\\");
        }
        splinePrint("\\end{cases}\\]");


		splinePrint("Las siguientes ecuaciones hacen cumplir el requisito de que la segunda derivada exista en los puntos de conexión. Para obtener cada ecuación, el coeficiente de $a_i$ es $2$ veces la primera componente, mientras que el cofiente de $b_i$ es $2$. Las siguientes tres ecuaciones surgen de los tres puntos de empalme entre los intervalos.");
		for (var i = 0; i < vectorX.length; i++) {
			temp = [];
			for (var j = 0; j < numVar; j++) {
				temp.push(0);
			}
			aux3_1 = 6 * vectorX[i];
			if (i > 0 && i < vectorX.length - 1) {
				splinePrint("En $x="+vectorX[i]+"$ hay un punto de conexión. Por lo tanto, la ecuación resultante es: ");
				splinePrint("$$"+aux3_1 + "a_{"+i+"} + 2b_{"+i+ "} = "+aux3_1+"a_{"+(i+1)+"} + 2b_{" + (i + 1)+"}$$");
				console.warn(aux3_1 + "a" + i + " + 2b" + i + " = " + aux3_1 + "a" + (i + 1) + " + 2b" + (i + 1));
				temp[(i - 1) * 4] = aux3_1;
				temp[(i - 1) * 4 + 1] = 2;
				temp[(i) * 4] = ((-1) * aux3_1);
				temp[(i) * 4 + 1] = (-2);
				answers.push(temp);
				b.push(0);
			}
		}


		splinePrint("Falta una condición para completar el sistema de ecuaciones. Existen varias opciones que dependen del conocimiento del contexto del problema que se tenga. Por ejemplo se puede determinar el conocimiento de la primera o de la segunda derivada en uno de los extremos del intervalo de interés. En este caso tenemos las ecuaciones:")
		for (var i = 0; i < vectorX.length; i++) {
			temp = [];
			for (var j = 0; j < numVar; j++) {
				temp.push(0);
			}
			aux3_1 = 6 * vectorX[i];
			if (i > 0 && i < vectorX.length - 1) {
			}else if (i == 0) {
				splinePrint("En $x="+vectorX[i]+"$ se supone que la segunda derivada es cero. Por lo tanto, la ecuación resultante es:");
				splinePrint("$$"+aux3_1 + "a_{"+(i+1)+"} + 2b_{"+(i+1)+ "} = 0$$");
				console.warn(aux3_1 + "a" + (i + 1) + " + 2b" + (i + 1) + " = 0");
				temp[i] = aux3_1;
				temp[i + 1] = 2
				answers.push(temp);
				b.push(0);
			} else {
				splinePrint("En $x="+vectorX[i]+"$ se supone que la segunda derivada es cero. Por lo tanto, la ecuación resultante es:");
				splinePrint("$$"+aux3_1 + "a_{"+i+"} + 2b_{"+i+ "} = 0$$");
				console.warn(aux3_1 + "a" + (i) + " + 2b" + (i) + " = 0");
				temp[(i - 1) * 4] = aux3_1;
				temp[(i - 1) * 4 + 1] = 2;
				answers.push(temp);
				b.push(0);
			}
		}

		console.log(answers);

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
        for (var i = 0, j = 0; i < vectorX.length-1; i++, j+=4) {
			var text = "";
			var sign = "";
			var first = true;

			if(ecu[j] != ""){
				text += ecu[j]+"x^{3}";
				first = false;
			}
			if(ecu[j+1] != ""){
				sign = (ecu[j+1] < 0) ? " - " : " + ";
				sign = (first && ecu[j+1] > 0) ? "" : sign;

				text += sign+Math.abs(ecu[j+1])+"x^{2}";
				first = false;
			}
			if(ecu[j+2] != ""){
				sign = (ecu[j+2] < 0) ? " - " : " + ";
				sign = (first && ecu[j+2] > 0) ? "" : sign;

				text += sign+Math.abs(ecu[j+2])+"x";
				first = false;
			}
			if(ecu[j+3] != ""){
				sign = (ecu[j+3] < 0) ? " - " : " + ";
				sign = (first && ecu[j+3] > 0) ? "" : sign;

				text += sign+Math.abs(ecu[j+3])+"";
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

	global.splineCubico = splineCubico;
})(window);