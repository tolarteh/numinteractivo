;(function (global){




    var newton = function(n, vectorX, vectorY, x){
        var result = [];
        var message = "";

        /*PRINT*/
        /*this.print("Dado que el polinomio pasa por los $"+n+"$ puntos dados, entonces existe un polinomio de grado $"+(n-1)+"$ que pasa por dichos puntos dados. El esquema de dicho polinomio por medio del método de Newton con diferencias divididas es:")
        var genEcu = "\\begin{eqnarray} p(x) &= &";
        genEcu += "b_0 + \\nonumber \\\\ & &";
        for(var i = 1; i < n; i++){
            genEcu += "b_"+i;
            for(var j = 0; j < i; j++){
                genEcu += " * (x - x_"+j+")";
            }
            if(i < (n-1)){
                genEcu += "+";
            }
            genEcu += "\\nonumber \\\\ & &";
        }
        genEcu += "\\end{eqnarray}"
        this.print(genEcu);*/
        /*PRINT*/

        var resultados = new Array();
        for (i = 0; i<n; i++) {
            resultados[i] = new Array();
            for (j = 0; j<n; j++) {
                resultados[i][j]= "";
            }
        }

        var aux = 1;
        var resultado = 0;
        for(var i = 0; i < n; i++){

            //this.print("Diferencias divididas #$"+(i+1)+"$:");

            resultados[i][0] = vectorY[i];

            var text = "";
            for (var j = 1; j <= i; j++) {

                resultados[i][j] = (resultados[i][j - 1] - resultados[i - 1][j - 1]) / notZero(vectorX[i] - vectorX[i - j]);
                //splinePrint("$$"+(j+1)+" " + resultados[i][j - 1]+ " - "+resultados[i - 1][j - 1]+" / "+vectorX[i]+" - "+vectorX[i - j]+" = "+resultados[i][j]+"$$");
            }


            result.push([resultados[i].slice()]);
            if (i > 0 ) {
                aux = aux * (x - vectorX[i - 1]);
            }
            resultado = resultado + (resultados[i][i] * aux);

            /*PRINT*/
            //renderTable(result.slice(), vectorX.slice(), vectorY.slice(), i);
            /*PRINT*/
        }




        var polinomio = "\\begin{eqnarray} p(x) &= &";
        polinomio += resultados[0][0];
        var temp = "";
        for (var i = 1; i <n; i++) {
            polinomio += "\\nonumber \\\\ & &";
            temp += "(x-"+vectorX[i-1]+") ";
            polinomio += resultados[i][i] + " * " + temp;
            polinomio += (resultados[i][i] > 0) ? "+" : "-";

        }
        if(x != ""){
            polinomio += "\\\\ p("+x+") &= & "+resultado+" \\nonumber"
        }
        polinomio += "\\end{eqnarray}"
        message = polinomio;

        //printSolucionButton();

        return {data: result, message: message};

    };

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

    global.newton = newton;
})(window);