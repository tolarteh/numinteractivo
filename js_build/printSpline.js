;(function (global) {


	var splinePrint = function(text) {
		$("#solution").append(text+"<br><br>");
	}


	var printSolucionButton = function () {

		$("#results").append('<button id="showSolution">Ver solución paso a paso</button>');

	}

	var splinePrintSolucion = function (text) {
		splinePrint(text);
		$("#results").append(text);
	}

	var renderTable = function(data, vectorX, vectorY, ite){
		console.log(data);
		if(data.length == 0) return;

		var ordinales = ["Primera", "Segunda", "Tercera", "Cuarta", "Quinta", "Sexta", "Séptima", "Octava", "Novena", "Décima"]

		$("#solution").append('<table class="num" id="resultado'+ite+'"><thead id="resTitles"><tr></tr></thead><tbody></tbody></table>');

		$("#resultado"+ite+" thead tr").append("<td>$n$</td>");
		$("#resultado"+ite+" thead tr").append("<td>$x_n$</td>");
		$("#resultado"+ite+" thead tr").append("<td>$f(x_n)$</td>");

		for (var i = 0; i < data[0][0].length-1; i++) {

			if(i < ordinales.length){
				$("#resultado"+ite+" thead tr").append("<td>$"+ordinales[i]+"$</td>");
			}else{
				$("#resultado"+ite+" thead tr").append("<td>$"+(i+1)+".ª$</td>");
			}
		}

		var vA = vectorX;

		for (i = 0; i < data.length; i++) {
			var row = $('<tr></tr>');


			row.append("<td>"+(i)+"</td>");
			row.append("<td>"+(vA[i])+"</td>");
			//row.append("<td>"+(vectorY[i])+"</td>");

			for (var j = 0; j < data[i][0].length; j++) {
				if(data[i][0][j] != ""){
					row.append("<td>" + round(data[i][0][j], 4) + "</td>");
				}else{
					row.append("<td>"+data[i][0][j]+"</td>");
				}

			}
			//row.append("<td>"+niceSNNumber(data[i][1].toExponential(1))+"</td>");
			$("#resultado"+ite+" tbody").append(row);
		}

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


	global.splinePrint = splinePrint;
	global.splinePrintSolucion = splinePrintSolucion;
	global.printSolucionButton = printSolucionButton;
	global.renderTable = renderTable;



})(window);