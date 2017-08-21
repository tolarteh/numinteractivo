/**
 * Design by Al-Khwarizmi
 */

require(["jquery", "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML"], function($) {
	MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});

	function read_matrix(num){
		if(!$("#matrix-"+num).length){
			return false;
		}

		var cols = $("#matrix-"+num).attr('data-cols');
		var rows = $("#matrix-"+num).attr('data-rows');

		if(cols == 1){
			var mat = [];
		    for(var i=0; i < rows; i++){
		    	mat.push(Number($("#matr-"+num+"-"+i+"-0").val()));
		    }
		}else{
			var mat = [];
			for(var i=0; i<rows; i++){
				var arr = [];
			    for(var j=0; j<cols; j++){
			    	arr.push(Number($("#matr-"+num+"-"+i+"-"+j).val()));
			    }
			    mat.push(arr);
			}

		}

		return mat;
	}


	function gen_matrix(num, cols, rows, def){
		var html = '<div class="matrix" id="matrix-'+num+'" data-cols="'+cols+'" data-rows="'+rows+'">';

		var value = "";


		if(rows == 4 && !def){
			var def = [[[20, -1, 3, 4], [6, 23, 4, 3], [7, 21, 46, 9], [-3, -9, 12, 38]], [30, -10, 20, -14], [0, 0, 0, 0]];
		}


		for(var i=0; i<rows; i++){
		    for(var j=0; j<cols; j++){

		    	//if(rows == 4){
		    	if(def){
		    		if(num == 0){
			    		value = def[num][i][j]
			    	}else{
			    		value = def[num][i];
			    	}
		    	}

		    	//}


		        html += '<input size="6" id="matr-'+num+'-'+i+'-'+j+'" name="matr['+num+']['+i+']['+j+']" value="'+value+'"/>';
		    }
		    html += '<br/>';
		}
		html += '</div><br>';
		return html;
	}


	function render_input(){
		var inputs = '<div class="inputs" id="inputs">';
		inputs += '<br>Columnas/Filas: <input size="2" class="matr-config" id="matr-num" name="matr-num" value="4"/> <button id="save" title="Guardar A y b">💾</button><button id="load" title="Escribir A y b guardados">✏️</button>';
		inputs += '</div><div id="matr-container"></div><br>Método: <select id="alk-selmetodo"></select><input type="button" name="submit" value="Resolver" id="submit"><br><br><div id="alk-desc"></div><div id="results"><div id="solution"></div></div>';
		return inputs;
	}

	function rerender(def){ //def = valores por default matrices
		$( "#matr-container" ).html("");
		var nums = $("#matr-num").val();
		var inputs = "<table><tr><td>A = </td><td>"+gen_matrix(0,nums,nums,def)+"</td><td>b = </td><td>"+gen_matrix(1,1,nums,def)+"</td><td>$x_0$ = </td><td>"+gen_matrix(2,1,nums,def)+"</td></tr></table>";
		inputs += 'Relajación: <select id="alk-relajacion"><option value="1" selected="selected">Sí</option><option value="0">No</option></select>';
		inputs += ' Lambda ($\\lambda$): <input id="alk-lambda" name="alk-lambda" title="Valor de Lambda" value="1.24" oninvalid="this.setCustomValidity(\'Solo se admite digitos y un punto.\')" oninput="setCustomValidity(\'\')" pattern="[+]?([0-1]+\\.?[0-9]*|2)" required="" type="text"></div>';
		inputs += '<br>Tolerancia: <input id="alk-tol" name="alk-tol" title="" value="0.00006" oninvalid="this.setCustomValidity(\'Solo se admite digitos y un punto,  números positivos.\')" oninput="setCustomValidity(\'\')" pattern="[+]?([0-9]+\\.?[0-9]*)" required="" type="text">';
		inputs += '<br>Iteraciones: <input id="alk-ni" name="alk-ni" title="" value="20" oninvalid="this.setCustomValidity(\'Solo se admite números enteros positivos.\')" oninput="setCustomValidity(\'\')" pattern="[+]?([1-9]+)" required="" type="text">';
		$( "#matr-container" ).append(inputs);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	}

	$(document).on('change', '#alk-relajacion', function() {
		$("#alk-lambda").prop('disabled', ($("#alk-relajacion").val() == 0));
	});

	var metodos = [
		{
			name: "Jacobi",
			file: "jacobi",
			id: "jacobi",
			desc: "El método de eliminación Gaussiana simple parte de transforma la matriz original ($Ax = b$), por medio de un proceso de eliminación progresiva de variables que busca tener sólo una ecuación con una incógnita ($Ux = b$), de forma que terminado dicho proceso se proceda hacer sustitución regresiva para así poder hallar todos los valores de $x$; esto se logra a través de operaciones básicas llamadas operaciones de renglón, que son intercambio de filas, multiplicación de una fila por un escalar y  sustitución de una fila."
		},
		{
			name: "Gauss Seidel",
			file: "gaussSeidel",
			id: "gaussSeidel",
			desc: "El método de eliminación Gaussiana con pivoteo parcial permite evitar los errores de redondeo por números cercanos a cero, de forma que busca que el elemento de la diagonal principal sea el mayor posible, en caso de no serlo usa el intercambio de filas hasta hallar el mayor y así convertirlo en el elemento pivote, con el fin de que al realizar la división por dicho término no sea cero o próxima a este.Luego de obtener el elemento pivote se procede con el método de eliminación Gaussiana Simple para obtener los valores de todas las variables."
		}
	];

	function getDefault(){
		return ($("#num-lineales").attr("data-metodo")) ? $("#num-lineales").attr("data-metodo") : metodos[0].id;
	};

	function renderSelectMetodos(id){
		if($("#num-lineales").attr("data-lista") !== undefined && $("#num-lineales").attr("data-lista") == "true"){
		    for (var i = 0; i < metodos.length; i++) {
		    	if(metodos[i].id == id){
		    		$('<option value="'+metodos[i].file+'" selected="selected">'+metodos[i].name+'</option>').appendTo("#alk-selmetodo");
		    	}else{
		    		$('<option value="'+metodos[i].file+'">'+metodos[i].name+'</option>').appendTo("#alk-selmetodo");
		    	}

		    }
		}else{
			$("#alk-tdselmetodo").html("");
		}

	};

	function getMetodo() {
		var metodoID = $("#alk-selmetodo").val();
		var metodo;
		for (var i = 0; i < metodos.length; i++) {
        	if(metodos[i].id == metodoID){
        		metodo = metodos[i];
        	}
        }
        if(!metodo){
        	console.error("Metodo solicitado no existe, se procede a cargar el primero de la lista.");
        	metodo = metodos[0];
        }

        return metodo;
	}

	var round = function (value, precision) {
	    var multiplier = Math.pow(10, precision || 0);
	    return Math.round(value * multiplier) / notZero(multiplier);
	}

	var niceSNNumber = function (num) {
		  try{
		      var sOut = num.toString();
		      if ( sOut.indexOf("e") > 0){
		      	sOut = sOut.replace("e","x10<sup>")+"</sup>";
		      }
		      return sOut;
		  }
		  catch ( e) {
		      return num;
		  }
	}

	var renderTable = function(data){
		$("#results").append('<table class="num" id="resultado"><thead id="resTitles"><tr></tr></thead><tbody></tbody></table>');

		$("#resultado thead tr").append("<td>$n$</td>");
		for (var i = 0; i < data[0][0].length; i++) {
			$("#resultado thead tr").append("<td>$$x_"+(i+1)+"$$</td>");
		}
		$("#resultado thead tr").append("<td>$Error$</td>");

		for (i = 0; i < data.length; i++) {
			var row = $('<tr></tr>');
			row.append("<td>"+(i+1)+"</td>");
			for (var j = 0; j < data[i][0].length; j++) {
				row.append("<td>"+(data[i][0][j])+"</td>");
			}
			row.append("<td>"+niceSNNumber(data[i][1].toExponential(1))+"</td>");
			$("#resultado tbody").append(row);
		}

	}

	var isDED = function (matrizA){ // si es Diagonal Estricta Dominante
        console.log("isDED");
        var n = matrizA.length;
        var sumaFilas = 0;
        for(var i = 0; i < matrizA.length; i++){
            //suma por filas
            for (var j = 1; j < matrizA.length; j++) {
                if (i!=j){
                    sumaFilas = sumaFilas + Math.abs(matrizA[i][j]);
                }
            }
            //verifica que el valor del pivote sea mayor de la fila
            if(Math.abs(matrizA[i][i]) > sumaFilas){
                return true;
            }else{
                return false;
            }
        }
    };

	$(document).on('change', '.matr-config', function() {
		rerender();
	});

	$(document).on('click', '#save', function() {
		if(!confirm("¿Seguro deseas guardar el A y b actuales?\n\nSi ya has guardado otros datos, serán sobreescritos y no se podrán recuperar.\nRecuerda que los datos se guardan en el navegador que estas usando actualmente.")){
			return false;
		}

		var data = [];
		data.push(read_matrix(0));

		var bTmp = read_matrix(1);
		var b = [];
		for (var i = 0; i < bTmp.length; i++) {
			b.push(bTmp[i][0]);
		}
		data.push(b);

		var cTmp = read_matrix(2);
		var c = [];
		for (var i = 0; i < cTmp.length; i++) {
			c.push(cTmp[i][0]);
		}
		data.push(c);

		localStorage.setItem("matriz37", JSON.stringify(data));
		console.log(data);
	});

	$(document).on('click', '#load', function() {
		if(!localStorage.matriz37){
			alert("No tienes datos guardados para escribir. Primero guarda A y b.");
			return false;
		}
		if(!confirm("¿Seguro deseas escribir el A y b que tenías guardado? El A y b actuales serán eliminados.")){
			return false;
		}

		var data = JSON.parse(localStorage.getItem("matriz37"));
		$("#matr-num").val(data[0].length);
		rerender(data);
		console.log(data);
	});


	if (typeof(Storage) == "undefined") {
	} else {
	    $("#save").hide();
	    $("#load").hide();
	}

	function showDescription() {
		/*var metodo = getMetodo();
		$("#alk-desc").html(metodo.desc+"<br><br>");
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);*/
	}

	$(document).on('change', '#alk-selmetodo', function() {
		showDescription();
	});

	showDescription();
	$(document).on('click', '#showSolution', function() {
		$("#solution").show();
	});
	$(document).on('click', '#submit', function() {
		var metodo = getMetodo();

		var matrizA = read_matrix(0);
		var vectorB = read_matrix(1);
		var x0 = read_matrix(2);
		var relajacion = ($("#alk-relajacion").val() != "0");
		var lambda = $("#alk-lambda").val();
		var ite = $("#alk-ni").val();
		var tol = $("#alk-tol").val();

        $("#results").html("<div id='solution'></div>");
        $("#solution").hide();


        if(!isDED(matrizA)){
        	$("#results").append("<p style='color:red'><b>La matriz insertada NO es diagonal estricta dominante</b><br>Por favor, inserte una matriz que lo sea para poder ejecutar el método.</p>");
        	return;
        }


		$("#solution").append("<h2>"+metodo.name+"</h2>");
		require(["lineales/"+metodo.file], function() {
			try{
			 	var solucion = window[metodo.id](matrizA, vectorB, x0, relajacion, lambda, ite, tol);
			 	console.log(solucion);
			 	$("#results").append("<div>"+solucion.message+"</div>");

			 	renderTable(solucion.data);

			 	//$("#results").append('<button id="showSolution">Ver solución paso a paso</button>');

	        }catch(e){
	        	console.log(e);
	        	if(e == 'Error: División por cero'){
		        	$("#results").append("<p style='color:red'><b>Se ha encontrado una división por cero.</b><br>Por favor, revise los valores de la matriz y que el tipo de método que está usando sea el adecuado.</p>");
			    	$("#solution").show();
	        	}

	        }
	        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        });


	});



	$( "#num-lineales" ).append(render_input());
	renderSelectMetodos(getDefault());
	rerender();


});
