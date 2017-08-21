;(function (global){

    var lagrange = function(n, vectorX, vectorY, x){
            var result = [];
            var message = "";

            var resultado = 0; 
            var polinomio = "\\begin{eqnarray} p(x) &= &";
            for(var i = 0; i < n; i++){
                var producto = 1;
                var termino = "";
                for (var j = 0; j < n; j++) {
                    if(j!=i){
                        producto = producto * (x-vectorX[j]) / notZero(vectorX[i]-vectorX[j]);
                        termino += "[(x-"+vectorX[j]+") / ("+vectorX[i]+"-"+vectorX[j]+")]";
                    }
                }
                resultado = resultado + (producto * vectorY[i]);

                if(i > 0){
                    polinomio += "\\nonumber \\\\ & &";
                }
                polinomio += (vectorY[i] > 0 ? "+" : "") + vectorY[i] +" * "+termino;
            }

            if(x != ""){
                polinomio += "\\\\ p("+x+") &= & "+resultado+" \\nonumber"
            }
            polinomio += "\\end{eqnarray}"


            message = polinomio;
            return {data: result, message: message};
    };

    var notZero = function(n) {
      n = +n;  // Coerce to number.
      if (!n) {  // Matches +0, -0, NaN
        throw new Error('División por cero');
      }
      return n;
    }

    global.lagrange = lagrange;
})(window);