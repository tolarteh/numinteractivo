var newton = (function() {
    /**
     * CONFIGURACIÓN
     * Información sobre datos de entrada y salida para uso en num.raices.js
     */

    // Parámetros de la función, con su respectiva información y orden adecuado.
    // name: Nombre a mostrar en el formulario de datos
    // id: nombre para uso interno
    // value: valor por defecto
    // type: func | num (func: convierte el texto en una función usable, num: convierte a un objeto númerico)
    // validate: float | float+ | int+ | int!=0 valida que los datos sean real, real positivo, entero positivo, entero != 0 respectivamente
    var datosEntrada = [
                    {name: "$f(x)=$", id: "f", title: "Función a encontrar la raíz", value: "exp(-x) - x^2*cos(2x-4) + 6x + 3", type: "func", graph: true},
                    {name: "$df(x)=$", id: "g", title: "df(x) es la derivada de f(x)", value: "-exp(-x) - 2x*cos(2x-4) + 2x^2*sin(2x-4) + 6", type: "func"},
                    {name: "$x_i=$", id: "xi", title: "Valor inicial", value: "-0.5", type: "num", validate: "float"},
                    {name: "Iteraciones:", id: "ni", value: "11", type: "num", validate: "int+"},
                    {name: "Tolerancia:", id: "tol", value: "0.0005", type: "num", validate:"float+"}
                ];

    // Información de los datos de salida
    // name: Nombre a mostrar en la columna de tablas u otros elementos
    // exp: true muestra el número en formato exponencial (ej. 6.25e-2)
    var resultType = [
                    {name: "$n$"},
                    {name: "$x_n$"},
                    {name: "$f(x_n)$", dec: 1},
                    {name: "$Error$", exp: true, dec: 1},
                ];

    // Información a mostrar en la ayuda
    var ayuda = {
            metodo: "El método de <b>Newton</b> para encontrar raíces de una función es un método abierto también conocido como el método de las tangentes, debido a que gráficamente se trazan rectas tangentes a la función $f(x) = 0$ partiendo desde un valor inicial $x_0$, donde la tangente se extiende hasta interceptar el eje x, en este punto donde se da la intersección pasa a ser el nuevo valor de $x$ y así opera sucesivamente hasta acercarse a la raíz. Es uno de los métodos más utilizados debido a su rapidez y efectividad.",
            simulacion: ""
        };

    /**
     * MÉTODO
     * Función del método, totalemente libre de dependencias.
     * Se debe incluir var math = this.math; para usar mathjs.
     * @return {[type]}     Objeto con dos arreglos. Datos de cada iteración y mensajes obtenidos.
     */
    var metodo = function(f, df, xi, ni, tol, errorRel) {
        var math = this.math; // Obtener libreria Math
        var result = [];
        var msg = [];


        var xn = xi;
        var fn = f(xn);
        var iter = 0;
        var error = tol + 1;
        result.push([iter, xn, fn, ""]);
        while (fn !== 0 && error > tol && iter < ni) {
            dfn = df(xn);
            xn = xn - fn / dfn;
            fn = f(xn);
            error = math.abs(xn - xi);
            if(errorRel) error = error/xn; // ERROR RELATIVO
            xi = xn;
            iter = iter + 1;

            result.push([iter, xn, fn, error]);
        }

        if (fn === 0) {
            msg.push("Aproximación a la raíz $x_n=" + xn + "$ donde $f(x_m)=0$");
        } else if (error < tol) {
            msg.push("Aproximación a la raíz $x_n=" + xn + "$ con error = " + error);
        } else {
            msg.push("Fracaso en " + ni + " iteraciones, hasta el momento $x_n=" + xn + "$");
        }

        return {data: result, message: msg}; // Se retorna los datos en cada iteración y los mensajes.

    };

    // Variables públicas para su uso en el num.raices.js
    return {
        getEntrada: function() {
            return datosEntrada;
        },
        getResultType: function() {
            return resultType;
        },
        getAyuda: function () {
            return ayuda;
        },
        execute: metodo,
    };

})();