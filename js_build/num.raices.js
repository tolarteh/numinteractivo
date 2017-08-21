/**
 * Design by Al-Khwarizmi
 */
num.requirejs.config({
	shim: {
		"jquery.tmpl": ["jquery"]
	}
});

num.require(["math", "jquery", "jquery.tmpl", "MathJax"], function(math, $) {
	// functionPlot
	num.require(["d3"], function() {
		window.d3 = d3;
		num.require(["function-plot"], function(functionPlot) {
			window.functionPlot = functionPlot;
		});
	});

	var metodos = [
		// Name: nombre a mostrar, file: nombre del archivo, sin .js, id: id usado para el data-metodo al cargar con algo por default.
		{name: "Bisección", file: "biseccion", id: "biseccion"},
		{name: "Regla Falsa", file: "reglafalsa", id: "reglafalsa"},
		{name: "Punto Fijo", file: "puntofijo", id: "puntofijo"},
		{name: "Newton", file: "newton", id: "newton"},
		{name: "Secante", file: "secante", id: "secante"}
	];
	var alk_ecuacion;

	function esqueleto(){
		return '<table id="alk-config"><tr><td><h1 id="alk-title" style="margin:0"></h1></td><td id="alk-tdselmetodo">Cambiar método: <select id="alk-selmetodo"></select></td><tr><tr><td style="vertical-align: top;"><form id="alk-options-form" onsubmit="return false;" target="the_iframe" autocomplete="on"><table id="alk-options"></table><input type="submit" id="saveData" style="display:none" /></form><table id="alk-extras"><tbody><tr><td>Tipo de error:</td><td><select id="alk-selerror"><option value="rel">Relativo</option><option value="abs" selected>Absoluto</option></select></td></tr><tr><td colspan="2"><button id="alk-reset">Reiniciar</button><button id="alk-graficar">Graficar</button><button id="alk-calcular">Calcular</button></td></tr></tbody></table><iframe id="the_iframe" name="the_iframe" src="javascript:false" style="display:none"></iframe></td><td style="vertical-align: top;" id="alk-tdextra">AYUDA</td></table><p class="num resaltado" id="msg"></p>';
	}

	function tabs(){
		return '<div id="alk-tabs-container"><ul class="alk-tabs-menu"><li><a href="#tab-ayuda">Ayuda</a></li><li><a href="#tab-simu" class="alk-tab-normal">Simulación</a></li><li><a href="#tab-instrucciones" class="alk-tab-normal">Instrucciones</a></li><li><a href="#tab-close" class="alk-tab-normal alk-tab-close">Cerrar</a></li> </ul>    <div class="tab">        <div id="tab-ayuda" class="tab-content"></div>        <div id="tab-simu" class="tab-content">  </div> <div id="tab-instrucciones" class="tab-content"></div>    </div></div>';
	}

	function tabsSimulacion(text, url){
		return text+'<video width="400" height="400" id="alk-simulacion" controls><source src="'+url+'" type="video/mp4">Tu navegador no soporta vídeos nativos. Actualizalo o prueba con otro.</video> '
	}

	function urlExists(url) {
		try{
		    var http = new XMLHttpRequest();
		    http.open('HEAD', url, false);
		    http.send();
		    return http.status != 404;
		}catch(e){
			return false;
		}
	}

	function renderTabs(info, name){
		var ayuda = "Esta herramienta ayuda a encontrar la raíz de una función utilizando diferentes métodos numéricos. En el lado izquierdo se muestran los campos de entrada del método, incluyendo el tipo de error.<br><br><i>Funciones:</i> recuerde siempre tener solo una variable, puede usar exp(), sin(), cos(), log(), sqrt(), entre otras. Se usa math.js, que tiene muchas <a href= 'http://mathjs.org/docs/reference/functions.html#arithmetic-functions'>funciones permitidas</a>.<br><br><b>Reiniciar:</b> vuelve a poner los valores por defecto de prueba.<br><br><b>Graficar:</b> muestra en la parte inferior un gráfico de la función principal (f(x)), si hay un valor inicial o final ya puesto, la gráfica hará zoom en esa zona.<br><br><b>Calcular:</b> corre el método con los datos de entrada, muestra una tabla con la información en cada iteración y un mensaje de éxito o fracaso.<br><br><i>Recordar datos:</i> la herramienta, cada vez que presiona en calcular guarda sus datos de entrada en la función de autocompletado de su navegador. Dando doble clic en un campo o comenzando a escribir verá sus datos anteriores, así podrá autocompletar sin necesidad de escribir de nuevo los mismos datos.<br><br><i>Simulación:</i> comprenda gráficamente cómo se comporta el método con unos datos de entrada ya establecidos.<br><br>Si obtiene un error del tipo <i>Error: Undefined symbol</i> es porque hay algo mal escrito o invalido en una de las funciones de entrada.";
		$("#alk-tdextra").html(tabs());
		$("#tab-ayuda").html(info.metodo);
		$("#tab-instrucciones").html(ayuda);


		// Simulación
		var SIM_PATH = "http://www1.eafit.edu.co/cursonumerico/interactivo/media/";
		var SIM_URL = SIM_PATH+name+".mp4";
		if(urlExists(SIM_URL)){
			$("#tab-simu").html(tabsSimulacion(info.simulacion, SIM_URL));
		}else{
			$("#tab-simu").html("¡Ups! Aún no hay una simulación para éste método.");
		}

	}

	function renderOptions(options){
        for (var i = 0; i < options.length; i++) {
        	var customTemplate = "";

        	if(options[i].graph === true){
        		alk_ecuacion = options[i].id;
        	}

        	//VALIDACIONES
        	var rules = {};
        	if(options[i].validate){
        		switch(options[i].validate){
        			case "int+":
        				rules = {messsage: "Solo números enteros positivos.", pattern: "[+]?([0-9]+)"};
        				break;
        			case "float+":
        				rules = {messsage: "Solo números reales positivos.", pattern: "[+]?([0-9]+\\.?[0-9]*)"};
        				break;
        			case "float":
        				rules = {messsage: "Solo números reales", pattern: "[-+]?([0-9]+\\.?[0-9]*)"};
        				break;
        			case "int!=0":
        				rules = {messsage: "Solo enteros diferentes de cero.", pattern: "[-+]?([1-9]+[0-9]*)"};
        				break;
        		}

        		if(rules.messsage){
        			customTemplate += ' oninvalid="this.setCustomValidity(\''+rules.messsage+'\')" oninput="setCustomValidity(\'\')" ';
        		}
        		if(rules.pattern){
        			customTemplate += ' pattern="'+rules.pattern+'" ';
        		}

        	}

        	var temp = '<tr><td>${name}</td><td><input id="${id}" name="alk-${id}" title="${title}" type="text" value="${value}" '+customTemplate+' required></td></tr>';
        	var template_options = $.template(temp);
        	$.tmpl( template_options, options[i] ).appendTo("#alk-options");
        }
	}

	function renderSelectMetodos(id){
		if($("#num-raices").attr("data-lista") !== undefined && $("#num-raices").attr("data-lista") == "true"){
		    var template_options = $.template('<option value="${file}">${name}</option>');
		    var template_options_sel = $.template('<option value="${file}" selected="selected">${name}</option>');
		    for (var i = 0; i < metodos.length; i++) {
		    	if(metodos[i].id == id){
		    		$.tmpl( template_options_sel, metodos[i] ).appendTo("#alk-selmetodo");
		    	}else{
		    		$.tmpl( template_options, metodos[i] ).appendTo("#alk-selmetodo");
		    	}

		    }
		}else{
			$("#alk-tdselmetodo").html("");
		}

	}


	function getData(entrada){
		var ret = [];
		for (var i = 0; i < entrada.length; i++) {
        	var value = $("#"+entrada[i].id).val();


        	if(entrada[i].type == "func"){
        		value = math.eval("f(x)=" + value);
        		try{ // Mostrar error si ecuación es incorrecta.
        			value(1); // Evaluar para saber si hay error.
        		}catch(err){
        			renderMessage([err]);
        		}
        	}else if(entrada[i].type == "num"){
        		value = Number(value);
        	}

        	ret.push(value);
        }
        return ret;
	}

	function renderMessage(message){
		for (var i = 0; i < message.length; i++) {
			$("#msg").text(message[i]);
		}
	}

	function niceSNNumber(num) {
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

	function renderTable(data, resultType){
		$("#num-raices" ).append('<table class="num" id="resultado"><thead id="resTitles"><tr></tr></thead><tbody></tbody></table>');

		for (var i = 0; i < resultType.length; i++) {
			$("#resultado thead tr").append("<td>"+resultType[i].name+"</td>");
		}


		for (i = 0; i < data.length; i++) {
			var row = $('<tr></tr>');
			for (var j = 0; j < resultType.length; j++) {
				var res;

				if(resultType[j].exp === true && data[i][j] != ""){
					var dec = (resultType[j].dec > 0) ? resultType[j].dec : undefined;
					res = data[i][j].toExponential(dec);
				}else{
					res = data[i][j];

					if(resultType[j].dec > 0 && data[i][j] !== ""){
						res = +(Math.round(data[i][j] + "e+"+resultType[j].dec)  + "e-"+resultType[j].dec);
					}
				}
				
				res = niceSNNumber(res); // Notación cientifica
				
				row.append("<td>"+res+"</td>");
			}
			$("#resultado tbody").append(row);
		}

	}

	function getDefault(){
		return ($("#num-raices").attr("data-metodo")) ? $("#num-raices").data("metodo") : metodos[0].id;
	}

	function graficar(){
		$("#msg").text("");
		$("#resultado").remove();
		renderTable([],[]);

		var data = $("#"+alk_ecuacion).val();
		var value = math.eval("f(x)=" + data);
		try{
			value(1);
		}catch(err){
			renderMessage([err]);
			return false;
		}

		var plotInstace = functionPlot({
			target: '#resultado',
			grid: true,
			data: [{
				fn: data,
				sampler: 'builtIn',  // this will make function-plot use the evaluator of math.js
				graphType: 'polyline',
				title: data,
				//range: [-2, 2]

			}],

		});


		// Calculamos xi o xs para mostrar la gráfica en esos puntos
		var xi = "";
		var xs = "";
		if($("#xi").length){
			xi = Number($("#xi").val());
		}
		if($("#xs").length){
			xs = Number($("#xs").val());
		}

		var xDomain;
		var yDomain;
		if(xi != "" && xs != ""){
			var y = Math.min(xi, xs);
			xDomain = [xi, xs]
			yDomain = [Math.abs(y), -Math.abs(y)]
		}else if(xi != ""){
			xDomain = [xi-1, xi+1]
			yDomain = [Math.abs(xi), -Math.abs(xi)]
		}else if(xs != ""){
			xDomain = [xs-1, xs+1]
			yDomain = [Math.abs(xs), -Math.abs(xs)]
		}

		if(xDomain || yDomain){
			plotInstace.programmaticZoom(xDomain, yDomain);
		}

	}

	function cargarMetodo(id){
		$("#num-raices" ).html(esqueleto());
		renderSelectMetodos(id);
		var metodo = false;
		for (var i = 0; i < metodos.length; i++) {
        	if(metodos[i].id == id){
        		metodo = metodos[i];
        	}
        }

        if(!metodo){
        	console.error("Metodo solicitado no existe, se procede a cargar el primero de la lista.");
        	metodo = metodos[0];
        }

		require(["raices/"+metodo.file], function() {
			renderOptions(window[metodo.file].getEntrada());
			$("#alk-title").text(metodo.name);


			$( "#alk-calcular" ).unbind();
			$( "#alk-calcular" ).click(function() {

				if(!$("#alk-options-form").get(0).checkValidity()) {
					$("#saveData").click();
					return false;
				};

				$("#resultado").remove();
				var data = getData(window[metodo.file].getEntrada());
				data.push(($("#alk-selerror").val() === "rel"));
				var result = window[metodo.file].execute.apply({math: math}, data);
				renderTable(result.data, window[metodo.file].getResultType());
				renderMessage(result.message);
				MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				$("#saveData").click();
			});


			renderTabs(window[metodo.file].getAyuda(), metodo.file);
			$(".alk-tab-normal").css("display", "none");
			$(".alk-tabs-menu a").unbind();
			$(".alk-tabs-menu a").click(function(event) {
				$(".alk-tab-normal").css("display", "initial");
		        event.preventDefault();
		        if($(this).hasClass( "alk-tab-close" )){
		        	$(".alk-tab-normal").css("display", "none");
		        }

		        $(this).parent().addClass("current");
		        $(this).parent().siblings().removeClass("current");
		        var tab = $(this).attr("href");
		        $(".tab-content").not(tab).css("display", "none");
		        $(tab).fadeIn();
	    	});
			// LaTeX para el render inicial
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		});

		$("#alk-reset").unbind();
		$( "#alk-reset" ).on( "click", function() {
			cargarMetodo(id);
		});

		$("#alk-selmetodo").unbind();
		$( "#alk-selmetodo" ).on( "change", function() {
		  cargarMetodo($("#alk-selmetodo").val());
		});

		$("#alk-graficar").unbind();
		$( "#alk-graficar" ).on( "click", function() {
		  graficar();
		  //$("#saveData").click();
		});


	}

    $(function() {
    	if (!$("#num-raices" ).length) {
			throw "No se encuentra el elemento con id: 'metodo'. Incluya un div con ese ID en el cuerpo de su sitio.";
		}
		MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});

		cargarMetodo(getDefault());
    });
});
