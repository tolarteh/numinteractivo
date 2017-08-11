;(function (global){

    var neville = function(n, vectorX, vectorY, x){
            var result = [];
            var message = "";

            var tabla = new Array();
            for (i = 0; i<n; i++) {
                tabla[i] = new Array();
                for (j = 0; j<n; j++) {
                    tabla[i][j]= "";
                }
            }

            var aux = 1;
            var resultado = 0;
            for(var i = 0; i < n; i++){
                tabla[i][0] = vectorY[i];
                for (var j = 1; j <= i; j++) {
                    tabla[i][j] = ((x-vectorX[i-j])*tabla[i][j-1] - 
                        ((x-vectorX[i])*tabla[i-1][j-1]))/(vectorX[i]-vectorX[i-j])
                }
                result.push([tabla[i].slice()]);
            }
            
            if(x != ""){
                message = "$$ p("+x+") = "+tabla[n-1][n-1]+" $$"
            }
            return {data: result, message: message};
    };

    var notZero = function(n) {
      n = +n;  // Coerce to number.
      if (!n) {  // Matches +0, -0, NaN
        throw new Error('División por cero');
      }
      return n;
    }

    global.neville = neville;
})(window);