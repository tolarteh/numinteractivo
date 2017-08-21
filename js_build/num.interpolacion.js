/**
 * Design by Al-Khwarizmi
 */

num.require(["jquery", "Sistema", "print"], function($) {
	// MathJax config was disable because is already inside Moodle 3.1 or can be embed before this code in Moodle <2.9
	// MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});

	function read_matrix(num){
		if(!$("#matrix-"+num).length){
			return false;
		}

		var cols = $("#matrix-"+num).attr('data-cols');
		var rows = $("#matrix-"+num).attr('data-rows');


		var mat = [];
		for(var i=0; i<rows; i++){
			for(var j=0; j<cols; j++){
				mat.push(Number($("#matr-"+num+"-"+i+"-"+j).val()));
			}
		}



		return mat;
	}


	function gen_matrix(num, cols, rows, def){
		var html = '<div class="matrix" id="matrix-'+num+'" data-cols="'+cols+'" data-rows="'+rows+'">';

		var value = "";


		if(cols == 5 && !def){
			def = [[1, 3,4, 5, 7], [4.31, 1.5, 3.2, 2.6, 1.8]];
		}


		for(var i=0; i<rows; i++){
		    for(var j=0; j<cols; j++){
		    	if(def){
		    		if(num == 0){
			    		value = def[num][j]
			    	}else{
			    		value = def[num][j];
			    	}
		    	}
		        html += '<input size="6" id="matr-'+num+'-'+i+'-'+j+'" name="matr['+num+']['+i+']['+j+']" value="'+value+'"/>';
		    }
		    html += '<br/>';
		}
		return html;
	}


	function render_input(){
		var inputs = '<div class="inputs" id="inputs">';
		inputs += '<table><tr><td>$n = $ </td><td><input size="2" class="matr-config" id="matr-num" name="matr-num" value="5"/></td><td><button id="save" title="Guardar Xn y f(Xn)">💾</button><button id="load" title="Escribir Xn y f(Xn) guardados">✏️</button></td></tr></table>';
		inputs += '</div><div id="matr-container"></div><br>Método: <select id="alk-selmetodo"></select><input type="button" name="submit" value="Resolver" id="submit"><br><br><div id="alk-desc"></div><div id="results"></div><div id="solution"></div>';
		return inputs;
	}

	function rerender(def){ //def = valores por default matrices
		$( "#matr-container" ).html("");
		var nums = $("#matr-num").val();
		var inputs = "<table><tr><td>$x_n =$<br> $f(x_n) =$</td><td>"+gen_matrix(0,nums,1,def)+gen_matrix(1,nums,1,def)+"</td></tr></table>";
		inputs += '<div id="alk-p-input">Evaluar en $p($<input id="alk-punto" name="alk-punto" title="Punto a evaluar" value="2.5" oninvalid="this.setCustomValidity(\'Solo se admite digitos y un punto.\')" oninput="setCustomValidity(\'\')" pattern="[+]?([0-9]+\\.?[0-9]*)" type="text" size="3">$)$ <i>(Opcional)</i></div>';
		$( "#matr-container" ).append(inputs);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	}


	var metodos = [
		{
			name: "Newton con diferencias divididas",
			file: "newton",
			id: "newton",
			desc: "",
			useP: true
		},
		{
			name: "Lagrange",
			file: "lagrange",
			id: "lagrange",
			desc: "",
			useP: true
		},
		{
			name: "Neville",
			file: "neville",
			id: "neville",
			desc: "",
			useP: true
		},
		{
			name: "Spline Lineal",
			file: "splineLineal",
			id: "splineLineal",
			desc: "",
			useP: false
		},
		{
			name: "Spline Cuadratico",
			file: "splineCuadrado",
			id: "splineCuadrado",
			desc: "",
			useP: false
		},
		{
			name: "Spline Cubico",
			file: "splineCubico",
			id: "splineCubico",
			desc: "",
			useP: false
		}
	];

	function getDefault(){
		return ($("#num-interpolacion").attr("data-metodo")) ? $("#num-interpolacion").attr("data-metodo") : metodos[0].id;
	};

	function renderSelectMetodos(id){
		if($("#num-interpolacion").attr("data-lista") !== undefined && $("#num-interpolacion").attr("data-lista") == "true"){
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
		renderP();

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
	var notZero = function(n) {
      n = +n;  // Coerce to number.
      if (!n) {  // Matches +0, -0, NaN
        throw new Error('División por cero');
      }
      return n;
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
		if(data.length == 0) return;

		var ordinales = ["Primera", "Segunda", "Tercera", "Cuarta", "Quinta", "Sexta", "Séptima", "Octava", "Novena", "Décima"]

		$("#results").append('<table class="num" id="resultado"><thead id="resTitles"><tr></tr></thead><tbody></tbody></table>');

		$("#resultado thead tr").append("<td>$n$</td>");
		$("#resultado thead tr").append("<td>$x_n$</td>");

		for (var i = 0; i < data[0][0].length; i++) {

			if(i < ordinales.length){
				$("#resultado thead tr").append("<td>$"+ordinales[i]+"$</td>");
			}else{
				$("#resultado thead tr").append("<td>$"+(i+1)+".ª$</td>");
			}
		}

		var vA = read_matrix(0);

		for (i = 0; i < data.length; i++) {
			var row = $('<tr></tr>');


			row.append("<td>"+(i+1)+"</td>");


			row.append("<td>"+(vA[i])+"</td>");
			for (var j = 0; j < data[i][0].length; j++) {
				if(data[i][0][j] != ""){
					row.append("<td>" + round(data[i][0][j], 4) + "</td>");
				}else{
					row.append("<td>"+data[i][0][j]+"</td>");
				}

			}
			//row.append("<td>"+niceSNNumber(data[i][1].toExponential(1))+"</td>");
			$("#resultado tbody").append(row);
		}

	}

	var renderTableSpline = function(A, b){
		if(A.length == 0) return;

		var letras = ["A", "B", "C", "D"]

		$("#results").append('<table class="num" id="resultado"><thead id="resTitles"><tr></tr></thead><tbody></tbody></table>');

		var numIt = 0;
		var maxIt = 0;
		if(A.length%3 == 0){
			numIt = A.length/3;
			maxIt = 3;
		}else if(A.length%4 == 0){
			numIt = A.length/4;
			maxIt = 4;
		}else{
			throw new Error('Se esperaba una matriz n*3 x n*3 o n*4 x n*4');
		}

		for (var i = 0; i < numIt; i++) {
			for (var j = 0; j < maxIt; j++) {
				$("#resultado thead tr").append("<td>$"+letras[j]+(i+1)+"$</td>");
			}
		}
		$("#resultado thead tr").append("<td>$Ind$</td>");

		var vA = A;

		for (i = 0; i < A.length; i++) {
			var row = $('<tr></tr>');

			for (var j = 0; j < A[i].length; j++) {
				if(A[i][j] != ""){
					row.append("<td>" + round(A[i][j], 4) + "</td>");
				}else{
					row.append("<td>"+A[i][j]+"</td>");
				}
			}
			row.append("<td>"+b[i]+"</td>");
			//row.append("<td>"+niceSNNumber(data[i][1].toExponential(1))+"</td>");
			$("#resultado tbody").append(row);
		}

	}


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
		data.push(bTmp);

		localStorage.setItem("matriz4", JSON.stringify(data));
	});

	$(document).on('click', '#load', function() {
		if(!localStorage.matriz4){
			alert("No tienes datos guardados para escribir. Primero guarda A y b.");
			return false;
		}
		if(!confirm("¿Seguro deseas escribir el A y b que tenías guardado? El A y b actuales serán eliminados.")){
			return false;
		}

		var data = JSON.parse(localStorage.getItem("matriz4"));
		$("#matr-num").val(data[0].length);
		rerender(data);
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

	function renderP() {
		var metodo = getMetodo();
		if(metodo.useP){
			$("#alk-p-input").show();
		}else{
			$("#alk-p-input").hide();
		}
		//$("#alk-punto").prop('disabled', (!metodo.useP));
	}

	$(document).on('change', '#alk-selmetodo', function() {
		showDescription();
		renderP();
	});

	$(document).on('click', '#showSolution', function() {
		$("#solution").show();
	});
	showDescription();

	$(document).on('click', '#submit', function() {
		var metodo = getMetodo();

		var vA = read_matrix(0);
		var vB = read_matrix(1);
		var n = $("#matr-num").val();
		var punto = $("#alk-punto").val();

        $("#solution").hide();

		$("#results").html("");
		$("#solution").html("");


		$("#solution").append("<h2>"+metodo.name+"</h2>");

		var interpolacionPrint;
		num.require(["funciones", "print", "printSpline", "lineales/eliminacionGaussianaPivoteo", "interpolacion/"+metodo.file], function() {
			for(var prop in Sistema.prototype){ //Limpiamos funciones de print para evitar la salida de lineales/eliminacionGaussianaPivoteo
				if(prop.startsWith("print")){
					Sistema.prototype[prop] = function(){};
				}
				Sistema.prototype["renderTableSpline"] = renderTableSpline;
			}

			try{
			 	var solucion = window[metodo.id](n, vA, vB, punto);
				renderTable(solucion.data);

				 $("#results").append("<div>"+solucion.message+"</div>");

	        }catch(e){
	        	console.log(e);
	        	if(e == 'Error: División por cero'){
		        	$("#results").append("<p style='color:red'><b>Se ha encontrado una división por cero.</b><br>Por favor, revise los datos de entrada y que el tipo de método que está usando sea el adecuado.</p>");
			    	$("#solution").show();
	        	}

	        }
	        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        });


	});



	$( "#num-interpolacion" ).append(render_input());
	renderSelectMetodos(getDefault());
	rerender();


});
