    
    function creaPreguntaMiniso(){
        if($.trim($("#preguntaMin_text").val()) != '') {
            var data_trazab_miniso = {
                IdCarpeta: $("#IdCarpeta").val(),
                comentario: $.trim($("#preguntaMin_text").val()),
                id_menu: '102',
                pregunta_rta: 'Pregunta' 
            };  
            var idTrazabilidad = ajaxSuccessF('crearTrazabilidadMiniso', 'pregunta', 'POST', data_trazab_miniso); // en template.js
            $("#idTrazabilidad").val(idTrazabilidad);
            var PreguntaMinisoForm = 'PreguntaMinisoForm';
            var data = new FormData($("#" + PreguntaMinisoForm + "")[0]);
            var crearPregunta = ajaxSuccess('guardarPreguntaClasificacion', 'pregunta', 'POST', data); // en template.js
            if (crearPregunta == '1') { // Se creó la pregunta
                $("#idTrazabilidad").val("");
                $("#preguntaMin_text").val("");
                alert("Registro creado exitosamente");
            }
        } else {
            alert("Favor diligenciar motivo válido para comentarios");
            $("#preguntaMin_text").focus();
        }
    }

    function creaRespuestaMiniso(IdPregunta){
        var contenido_respuesta = $.trim($("#respuestaMin_text_" + IdPregunta).val());
        if(contenido_respuesta != '') {
            var data_trazab_miniso = {
                IdCarpeta: $("#IdCarpeta").val(),
                comentario: contenido_respuesta,
                id_menu: '104',
                pregunta_rta: 'Respuesta'
            };
            var idTrazabilidad = ajaxSuccessF('crearTrazabilidadMiniso', 'pregunta', 'POST', data_trazab_miniso); // en template.js
            $("#idTrazabilidad").val(idTrazabilidad);
            var data_respuesta = {
                id_pregunta: IdPregunta,
                respuesta_text: contenido_respuesta,
                idTrazabilidad: $("#idTrazabilidad").val(),
                nro_referencia: $("#NroCarpeta").val()
            };
            var crearRespuesta = ajaxSuccessF('guardarRespuestaClasificacion', 'Respuesta', 'POST', data_respuesta); // en template.js
            if (crearRespuesta == '1') { // Se creó la Respuesta
                $("#idTrazabilidad").val("");
                $("#contenido_respuesta").val();
                alert("Respuesta almacenada");
            }
            alert("Respuesta generada");
        } else {
            alert("Favor diligenciar una respuesta válida");
        }
    }