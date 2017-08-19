; (function (global) {

    var splineLineal = function (n, vectorX, vectorY) {

        splinePrint("Dado que en la tabla se tienen $" + vectorX.length + "$ puntos, entonces un polinomio lineal, $p(x)$, definido por tramos, tiene la forma:");
        splinePrint("\\[p(x) = \\begin{cases} ");
        for (var i = 0; i < vectorX.length - 1; i++) {
            splinePrint("p_" + (i + 1) + "(x) && " + vectorX[i] + "\\leq x \\leq " + vectorX[i + 1] + "\\\\");
        }
        splinePrint("\\end{cases}\\]");


        splinePrint("Note que hay un error en los empates pues cada $x$ se evalúa en ambas funciones. Este error es intencional, asegura el hecho de que la función a obtener sea continua.<br>");

        var aux;
        var aux2;
        var ecuaciones = [];
        for (var i = 0; i < vectorX.length - 1; i++) {
            splinePrint("Para determinar el polinomio $p_{" + (i + 1) + "}(x)$ se utilizan los puntos $(" + vectorX[i] + "," + vectorY[i] + ")$ y $(" + vectorX[i + 1] + "," + vectorY[i + 1] + ")$, para hallar la recta que pasa por ellos:");


            aux = (vectorY[i + 1] - vectorY[i]) / notZero((vectorX[i + 1] - vectorX[i]));
            aux2 = vectorY[i + 1] + (aux * (vectorX[i + 1] * -1));

            var sign = (aux2 < 0) ? " - " : " + ";
            ecuaciones.push(round(aux, 3) + "x" + sign + round(Math.abs(aux2), 3));

            splinePrint("\\begin{eqnarray} y - f(x_{" + (i + 1) + "}) & = & m (x -x_{" + (i + 1) + "}) \\nonumber \\\\ y & = & f(x_{" + (i + 1) + "}) + \\frac{f(x_{" + (i + 1) + "})-f(x_{" + i + "})}{x_{" + (i + 1) + "} - x_{" + i + "}}(x-x_{" + (i + 1) + "}) \\nonumber \\\\");
            splinePrint("& = & " + vectorY[i + 1] + " + \\frac{" + vectorY[i + 1] + " - " + vectorY[i] + "}{" + vectorX[i + 1] + " - " + vectorX[i] + "}(x-" + vectorX[i + 1] + ")\\nonumber \\\\ p_1 (x) & = & " + ecuaciones[i] + "  \\nonumber");
            splinePrint(" \\end{eqnarray}");


        }


        splinePrintSolucion("<h3>Resultado:</h3>");
        splinePrintSolucion("\\[p(x) = \\begin{cases} ");
        for (var i = 0; i < vectorX.length - 1; i++) {
            splinePrintSolucion(ecuaciones[i] + " && " + vectorX[i] + "\\leq x \\leq" + vectorX[i + 1] + "\\\\");
        }
        splinePrintSolucion("\\end{cases}\\]");

        printSolucionButton();
        return {data: [], message: ""};
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

    global.splineLineal = splineLineal;
})(window);