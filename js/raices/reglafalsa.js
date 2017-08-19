var reglafalsa = (function() {
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
                    {name: "$f(x)=$", id: "f", title: "Función a encontrar la raíz", value: "exp(3x-12) + x*cos(3x) - x^2 + 4", type: "func", graph: true},
                    {name: "$x_i=$", id: "xi", title: "Valor inferior", value: "2", type: "num", validate: "float"},
                    {name: "$x_s=$", id: "xs", title: "Valor superior", value: "3", type: "num", validate: "float"},
                    {name: "Iteraciones:", id: "ni", value: "11", type: "num", validate: "int+"},
                    {name: "Tolerancia:", id: "tol", value: "0.0005", type: "num", validate: "float+"}
                ];

    // Información de los datos de salida
    // name: Nombre a mostrar en la columna de tablas u otros elementos
    // exp: true muestra el número en formato exponencial (ej. 6.25e-2)
    var resultType = [
                    {name: "$Iter$"},
                    {name: "$x_i$"},
                    {name: "$x_u$"},
                    {name: "$x_m$"},
                    {name: "$f(x_m)$", exp: true, dec: 1},
                    {name: "$Error$", exp: true, dec: 1},
                ];

    // Información a mostrar en la ayuda
    var ayuda = {
            metodo: "El método de <b>regla falsa</b>, aunque conserva las características y condiciones del método de bisección, difiere en la forma como calculan el punto medio. El método de regla falsa traza una recta secante entre los intervalos, la cual intercepta el eje x, siendo esta intersección el punto medio, de esta manera se traza una nueva recta del punto encontrado hasta el otro extremo del intervalo y así se continua hasta encontrar una raíz o un $x_m$ cuyo $f(x_m)$ esté lo suficientemente cerca de $0$. Por lo general, este método es más eficiente que el método de la bisección.",
            simulacion: ""
        };

    /**
     * MÉTODO
     * Función del método, totalemente libre de dependencias.
     * Se debe incluir var math = this.math; para usar mathjs.
     * @return {[type]} Objeto con dos arreglos. Datos de cada iteración y mensajes obtenidos.
     */
    var metodo = function(f, xi, xs, ni, tol, errorRel) {
        var math = this.math; // Obtener libreria Math

        var result = [];
        var msg = [];

        var fi = f(xi);
        var fu = f(xs);

        if (fi === 0) {
            msg.push("$x_i = " + xi + "$ es una raíz");
        } else if (fu === 0) {
            msg.push("$x_u = " + xs + "$ es una raíz");
        } else if (fi*fu < 0) {
            var xaux;
            var xm = xi - fi*(xs-xi)/(fu-fi);
            var fm = f(xm);
            var iter = 1;
            var error = tol + 1;

            result.push([iter, xi, xs, xm, fm, ""]);

            while (error > tol && fm !== 0 && iter < ni) {
                if (fi*fm < 0) {
                    xs = xm;
                    fu = fm;
                } else {
                    xi = xm;
                    fi = fm;
                }
                // Calculo los nuevos valores
                xaux = xm;
                xm = xi - fi*(xs-xi)/(fu-fi);
                fm = f(xm);
                error = math.abs(xm - xaux);

                if(errorRel) error = error/xm; // ERROR RELATIVO

                iter = iter + 1;

                result.push([iter, xi, xs, xm, fm, error]);
            }
            if (fm === 0) {
                msg.push("Aproximación a la raíz $x_m=" + xm + "$ donde $f(x_m)=0$");
            } else if (error < tol) {
                msg.push("Aproximación a la raíz $x_m=" + xm + "$ con error = " + error);
            } else {
                msg.push("Fracaso en " + ni + " iteraciones, hasta el momento $x_m=" + xm + "$");
            }
        } else {
            msg.push("El intervalo es inadecuado, encuentre uno con cambio de signo en $f(x)$");
        }

        return {data: result, message: msg}; // Se retorna los datos en cada iteración y los mensajes
    }

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