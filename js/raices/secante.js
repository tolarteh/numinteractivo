var secante = (function() {
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
                    {name: "$f(x)=$", id: "f", title: "Función a encontrar la raíz", value: "exp(-x^2+1) - 4x^3 + 25", type: "func", graph: true},
                    {name: "$x_0=$", id: "xi", title: "Valor inicial 0", value: "1", type: "num", validate: "float"},
                    {name: "$x_1=$", id: "xs", title: "Valor inicial 1", value: "2", type: "num", validate: "float"},
                    {name: "Iteraciones:", id: "ni", value: "11", type: "num", validate: "int+"},
                    {name: "Tolerancia:", id: "tol", value: "0.0005", type: "num", validate: "float+"}
                ];


    // Información de los datos de salida
    // name: Nombre a mostrar en la columna de tablas u otros elementos
    // exp: true muestra el número en formato exponencial (ej. 6.25e-2)
    var resultType = [
                    {name: "$Iter$"},
                    {name: "$x_n$"},
                    {name: "$f(x_n)$", exp: true, dec: 1},
                    {name: "$Error$", exp: true, dec: 1},
                ];

    // Información a mostrar en la ayuda
    var ayuda = {
            metodo: "El método de la <b>secante</b> se define como una variante del método de Newton, a diferencia de que para el cálculo de la pendiente de la recta que intercepta el eje x se reemplaza el concepto de la derivada por el de diferencias divididas o límites, de forma que se vuelve más sencillo de aplicar ya que hay funciones cuyas derivadas son complejas de calcular; el punto donde interceda la recta secante con el eje x pasa a ser un nuevo valor de aproximación $x_{n+1}$, así que para el próximo cálculo de la recta se partirá del valor inicial $x_n$ y el nuevo valor hallado $x_{n+1}$, así operando sucesivamente hasta una raíz o un $x_n$ cuyo $f(x_n)$ esté lo suficientemente cerca de $0$",
            simulacion: ""
        };

    /**
     * MÉTODO
     * Función del método, totalemente libre de dependencias.
     * Se debe incluir var math = this.math; para usar mathjs.
     * @return {[type]} Objeto con dos arreglos. Datos de cada iteración y mensajes obtenidos.
     */
    var metodo = function(f, x0, x1, ni, tol, errorRel) {
        var math = this.math; // Obtener libreria Math

        var result = [];
        var msg = [];

        var f0 = f(x0);

        if (f0 === 0) {
            msg.push("$x_0 = " + x0 + "$ es una raíz");
        } else {
            var x2;
            var f1 = f(x1);
            var iter = 1;
            var error = tol + 1;
            var den = f1 - f0;

            result.push([iter-1, x0, f0, ""]);
            result.push([iter, x1, f1, ""]);

            while (error > tol && f1 !== 0 && den !== 0 && iter < ni) {
                x2 = x1 - f1 * (x1 - x0) / den;

                error = math.abs(x2 - x1);
                if(errorRel) error = error/x1; // ERROR RELATIVO

                x0 = x1;
                f0 = f1;
                x1 = x2;
                f1 = f(x1);
                den = f1 - f0;
                iter = iter + 1;

                result.push([iter, x1, f1, error]);
            }
            if (f1 === 0) {
                msg.push("Aproximación a la raíz $x_n=" + x1 + "$ donde $f(x_m)=0$");
            } else if (error < tol) {
                msg.push("Aproximación a la raíz $x_n=" + x1 + "$ con error = " + error);
            } else {
                msg.push("Fracaso en " + ni + " iteraciones, hasta el momento $x_n=" + x1 + "$");
            }
        }

        return {data: result, message: msg}; // Se retorna los datos en cada iteración y los mensajes
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