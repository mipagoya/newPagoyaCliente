
    $(".filtroTrazabilidad").click(function () {
        //alert("Filtro: "+$(this).attr('id'));
        filtroTrazabilidad( $(this).attr('id') );
    });

    function filtroTrazabilidad( TipFiltro ){
        var IdCarpeta = $("#IdCarpeta").val();
        var NumCarpeta = $("#NumCarpeta").val();
        var TipCarpeta = $("#TipCarpeta").val();
        //alert(IdCarpeta + "-" + NumCarpeta + "-" + TipCarpeta);
        var data = {
            Id_Carpeta: IdCarpeta,
            num_Carpeta: NumCarpeta,
            tipoCarpeta: TipCarpeta,
            tipo_Filtro: TipFiltro
        };
        ajaxNormal('filtrosTrazabilidad', 'comentario_historico', 'POST', data); // en template.js
    }

    $("#Trazabilidad_Enviar").click(function () {
        // Validar si existe comentario
        if ( $.trim( $("#comentario_text").val() ) != '' ){
            var TrazabilidadForm = 'TrazabilidadForm';
            var data = new FormData($("#" + TrazabilidadForm + "")[0]);
            var crearRegTrazabilidad = ajaxSuccess('guardarTrazabilidad', 'comentario_historico', 'POST', data); // en template.js
            if (crearRegTrazabilidad == '1' ){ // Se creó el registro
                filtroTrazabilidad('');
                $("#comentario_text").val("");
                $("#compartirTrazCliente").prop("checked", false);
                $("#id_input_adjunto").val("");
                $("#Trazabilidad_adjuntar").attr("disabled", false);
                alert("Registro creado exitosamente"); 
            }
        }else{
            alert("Favor diligenciar motivo válido para comentarios");
            $("#comentario_text").focus();
        }
    });

    // 
    $("#Trazabilidad_adjuntar").click(function () {
        var id_tipo_carpeta = $("#idTipCarpeta").val();
        var numero_carpeta = $("#NumCarpeta").val();
        if( $.trim($("#comentario_text").val()) != '' ){
            var data = {
                'id_tipo_carpeta': id_tipo_carpeta,
                'numero_carpeta': numero_carpeta,
                'origen': 'ModalTrazabilidad',
                'trazabilidad' : '0'
            };
            modalGlobal('cargaDocumento', 'POST', data, 'Adjuntar Documento: '+numero_carpeta); // Funcion en GENERAL.js*/
        }else{
            alert("Antes de adjuntar documento, Favor diligenciar motivo válido");
            $("#comentario_text").focus();
        }
    });

    // --------- Funcion para Ver Correo --------- //
    function AbrirCorreo(IdCorreo){
        //alert(IdCorreo+"-"+$("#TipCarpeta").val()+"-"+$("#NumCarpeta").val());
        var data = {
            'id_correo': IdCorreo, // Obtener el ID del Correo.
            'tipo_carpeta': $("#TipCarpeta").val(),// DO, SH ...
            'Num_registro': $("#NumCarpeta").val(),// # DO, SH ...
        };
        // Abrir Modal
        modalGlobal('abrirCorreo', 'POST', data, 'Ver Correo'); // Funcion en GENERAL.js*/
    }
	
	function DescargarCorreo(IdCorreo, NroCarpeta, consmsg){
		var rutaCorreoMSG = '/gestorDocumental/CORREOS_MSG/'+NroCarpeta+'/'+consmsg+'/'+NroCarpeta+"_"+consmsg+'.msg';
		//alert("Descargar Correo: "+NroCarpeta+"_____"+NroMsG+"---RUTA: ----"+rutaCorreoMSG);
		downloadFile(rutaCorreoMSG);
	}

    // --------- Funcion para Reenviar Correo --------- //
    /*function ReenviarCorreo(IdCorreo) {
        var data = {
            Id_Correo: IdCorreo,
            tipo_carpeta: $("#TipCarpeta").val(),// DO, SH ...
            Num_registro: $("#NumCarpeta").val(),// # DO, SH ...
        };
        var EnviarCorreo = ajaxNormal('ReenviarCorreoTraz', 'asdasd', 'POST', data);
        alert("RECIBO: "+EnviarCorreo);
    }*/

    