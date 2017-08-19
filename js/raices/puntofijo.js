var puntofijo = (function() {
    /**
     * CONFIGURACIÓN
     * Información sobre datos de entrada y salida para uso en met2.js
     */

    // Parámetros de la función, con su respectiva información y orden adecuado.
    // name: Nombre a mostrar en el formulario de datos
    // id: nombre para uso interno
    // value: valor por defecto
    // type: func | num (func: convierte el texto en una función usable, num: convierte a un objeto númerico)
    // validate: float | float+ | int+ | int!=0 valida que los datos sean real, real positivo, entero positivo, entero != 0 respectivamente
    var datosEntrada = [
                    {name: "$f(x)=$", id: "f", title: "Función a encontrar la raíz", value: "x*exp(x) - x^2 - 5x - 3", type: "func", graph: true},
                    {name: "$g(x)=$", id: "g", title: "x = g(x) a partir de f(x)", value: "(x*exp(x) - x^2 - 3) / 5", type: "func"},
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
            metodo: "El método de <b>punto fijo</b> genera una ecuación $g(x) = 0$ a partir de $f(x) = 0$ de forma que se busca un valor $x$ que al reemplazarlo en $g(x)$ se obtenga el mismo valor de $x$, esta $x$ sería entonces una raíz de la función $f(x)$. Este método no parte de un intervalo sino de aproximación inicial $x_0$ el cual es evaluado en la función $g(x)$ y este resultado vuelve y se evalúa de forma que dichos resultados se estabilicen hacia un único valor, entre más pequeño sea el margen de diferencia más próximo a la raíz se encuentra el método. Al ser un método abierto no siempre converge, pero cuándo lo hace converge más rápido que los métodos por intervalos.",
            simulacion: ""
        };

    /**
     * MÉTODO
     * Función del método, totalemente libre de dependencias.
     * Se debe incluir var math = this.math; para usar mathjs.
     * @return {[type]}     Objeto con dos arreglos. Datos de cada iteración y mensajes obtenidos.
     */
    var metodo = function(f, g, xi, ni, tol, errorRel) {
        var math = this.math; // Obtener libreria Math
        var result = [];
        var messsage = [];


        var xn = xi;
        var fn = f(xn);
        var iter = 0;
        var error = tol + 1;
        result.push([iter, xn, fn, ""]);
        while (fn !== 0 && error > tol && iter < ni) {
            xn = g(xi);
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

        return {data: result, message: messsage}; // Se retorna los datos en cada iteración y los mensajes.

    };

    // Variables públicas para su uso en el met2.js
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