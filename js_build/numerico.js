/// <reference path="jquery.min.js" />
$(document).ready(function () {
    /****************************************
     *     JAVASCRIPT PARA PREGUNTAS RAPIDAS      *
     ****************************************/
    $('input[type="text"].num').keydown(function(event) {
        if (event.keyCode == 13) {
            var correcta = String($(this).data("correcta")).toLowerCase();
            var texto = "";
            if (correcta === this.value.toLowerCase() ) {
                texto = "";
            } else {
                texto = $(this).data("comentario");
            }
            tooltip(this, texto);
            return false;
         }
    });

    function tooltip(item, texto) {
        var pos = $(item).position();
        var tip = $('<p class="tooltip"></p>').text(texto);
        // Position the tooltip below the item
        tip.css("top", pos.top+10);
        tip.css("left", pos.left);
        // Add the correct icon
        if (texto === "") {
            tip.prepend('<div class="icono correcta"></div>');
            tip.css("background-color", "#DBFFDB");
        }
        // Appear until you click on tooltip
        tip.insertAfter(item).fadeIn("slow");
        tip.click(function() {
            $(this).fadeOut("slow", function() {
                $(this).remove();
            });
        });
    }


    /****************************************
     *     JAVASCRIPT PARA SUGERENCIAS      *
     ****************************************/
    
    /**
     * Muestra las sugerencias disponibles en el botón de sugerencias
     */
    $("form.pregunta, section.sugerencias").each(function () {
        var pendientes = $("section.sugerencia", this).length;
        $("button.sugerencia", this).html("Sugerencias (" + pendientes + ")");
    });
    
    
    /**
     * Muestra las sugerencias dependiendo si son de "proceso" o no
     */
    $("button.sugerencia").click(function () {
        var sugerencias = $(this).closest("section.sugerencias");
        if (sugerencias.length === 0) {
            sugerencias = $(this).closest("form.pregunta").find("section.sugerencias");
        }
        
        // Para sugerencias tipo "proceso" se muestra una a la vez
        // mientras que para el resto se muestran una debajo de la otra
        if ($(this).hasClass("proceso")) {
            $("section.sugerencia", sugerencias).filter(":hidden").first().show();
            $(this).html("Sugerencias (" + $("section.sugerencia", sugerencias).filter(":hidden").length + ")");
        } else {
            $("section.sugerencia", sugerencias).filter(":hidden").first().show();
            $(this).html("Sugerencias - " + $("section.sugerencia", sugerencias).filter(":hidden").length);
        }
    });
    
    
     /****************************************
     *      JAVASCRIPT PARA PREGUNTAS        *
     ****************************************/
    
    /**
     * Califica preguntas con unica respuesta
     */
    function calificarUnica(pregunta) {
        var icono = $(".icono", pregunta),
            escogida = $("input:checked", pregunta),
            respuesta;
        
        // Escondo todas las retroalimentaciones
        icono.removeClass("correcta incorrecta");
        $(".retroalimentacion", pregunta).hide();
        $(".respuesta", pregunta).removeClass("correcta incorrecta");
        
        if (escogida.length > 0) {
            respuesta = escogida.closest('section.respuesta');
            $(".retroalimentacion", respuesta).show();
            if (respuesta.data("correcta")) {
                respuesta.addClass("correcta");
                icono.addClass("correcta");
            } else {
                respuesta.addClass("incorrecta");
                icono.addClass("incorrecta");
            }
        }
    }
    
    /**
     * Califica preguntas con multiples respuestas
     */
    function calificarMultiple(pregunta) {
        var icono = $(".icono", pregunta),
            todoCorrecto = true;
        
        // Escondo todas las retroalimentaciones
        icono.removeClass("correcta incorrecta");
        $(".retroalimentacion", pregunta).hide();
        $(".respuesta", pregunta).removeClass("correcta incorrecta");
        
        // Para cada respuesta reviso si es correcta o no
        $(".respuesta", pregunta).each(function () {
            var correcta = !!$(this).data("correcta"),
                escogida = $("input", this).is(":checked");
            
            if (escogida) {
                $(".retroalimentacion", this).show();
                if (correcta) {
                    $(this).addClass("correcta");
                } else {
                    $(this).addClass("incorrecta");
                    todoCorrecto = false;
                }
            } else {
                if (correcta) {
                    todoCorrecto = false;
                }
            }
        });
        
        // Pongo el icono si todo esta bien
        if (todoCorrecto) {
            icono.addClass("correcta");
        } else {
            icono.addClass("incorrecta");
        }
    }
    
    /**
     * Califica preguntas de rellenar espacio
     */
    function calificarRellena(pregunta) {
        var icono = $(".icono", pregunta),
            todoCorrecto = true;
        
        // Escondo todas las retroalimentaciones
        icono.removeClass("correcta incorrecta");
        $(".retroalimentacion", pregunta).hide();
        $(".respuesta", pregunta).removeClass("correcta incorrecta");
        
        // Para cada respuesta reviso si el campo coincide
        $(".respuesta", pregunta).each(function () {
            var correcta = $(this).data("correcta").toLowerCase(),
                valor = $("input", this).val().toLowerCase();
            
            // Si escribe algo en el campo
            if (valor !== "") {
                $(".retroalimentacion", this).show();
                if (valor === correcta) {
                    $(this).addClass("correcta");
                } else {
                    $(this).addClass("incorrecta");
                    todoCorrecto = false;
                }
            } else {
                todoCorrecto = false;
            }
        });
        
        // Pongo el icono si todo esta bien
        if (todoCorrecto) {
            icono.addClass("correcta");
        } else {
            icono.addClass("incorrecta");
        }
    }
    
    /**
     * Califica preguntas de relacion afirmacion-razon
     */
    function calificarRelacion(pregunta) {
        var icono = $(".icono", pregunta),
            todoCorrecto = true;
        
        // Escondo todas las retroalimentaciones
        icono.removeClass("correcta incorrecta");
        $(".retroalimentacion", pregunta).hide();
        $(".respuesta", pregunta).removeClass("correcta incorrecta");
        
        // Para cada respuesta reviso si el campo coincide
        $(".respuesta", pregunta).each(function () {
            var correcta = $(this).data("correcta").toLowerCase(),
                valor = $("select option:selected", this).html().toLowerCase();
            
            // Si escribe algo en el campo
            if (valor !== "") {
                $(".retroalimentacion", this).show();
                if (valor === correcta) {
                    $(this).addClass("correcta");
                } else {
                    $(this).addClass("incorrecta");
                    todoCorrecto = false;
                }
            } else {
                todoCorrecto = false;
            }
        });
        
        // Pongo el icono si todo esta bien
        if (todoCorrecto) {
            icono.addClass("correcta");
        } else {
            icono.addClass("incorrecta");
        }
    }
    
    /****************************************
     * Califica el formulario de evaluacion *
     ****************************************/
    $("form.pregunta").submit(function (event) {
        
        if ($(this).hasClass("unica")) {
            // PREGUNTA: Unica respuesta
            calificarUnica(this);
            
        } else if ($(this).hasClass("multiple")) {
            // PREGUNTA: Multiple respuesta
            calificarMultiple(this);
            
        } else if ($(this).hasClass("rellena")) {
            // PREGUNTA: Rellena espacio
            calificarRellena(this);
        } else if ($(this).hasClass("relacion")) {
            // PREGUNTA: Relacion afirmacion-razon
            calificarRelacion(this);
        }
        return false;
    });
});