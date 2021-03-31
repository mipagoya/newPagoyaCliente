

$(document).ready(function(){
    /*var dialogInstance = new BootstrapDialog()
		.setTitle('Declaraci&oacute;n Andina de Valor')
		.setMessage('Por favor diligenciar el presente formulario, imprimirlo, firmarlo y adjuntarlo al final del proceso. En el bot&oacute;n ubicado en la parte inferior del formulario (cargar archivio).')
		.setType(BootstrapDialog.TYPE_INFO)
		.open(); */
    
    $('#datetimepicker2').datepicker({
	   language: 'es'
    });
    
	$('#datetimepicker3').datepicker({
	   language: 'es'
	});
		
	$("#salvar").click(function (){
		var data = $("#form_declaracion").serialize();
		$.ajax({
			headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
			type: "POST",
			url: "save_premliminar", 
			data: data,
			success : function(datos) {
				//mostrarRespuesta(datos, true);
				//alert(datos);
				if(datos == "OK"){
					swal({
						type:'success',
						title:'Informacion almacenada Exitosamente!'
					});
				}
			},
			async: false,
		});
	});
			
	$("#codNivelComercial, #codNaturaTran, #codTipoIntermediario, #TipoRazonSocial, #ciudad, #codPais, #codTipoCondContrap, #Pdeterminarse, #Ereversiones, #codTipoVinculacion, #Ivinculacion, #tipoResp ").change(function(){
		if( $(this).val() != "" ){
			$(".error2").fadeOut();
			return false;
		}
	});

	$('input[name="Eintermediacion"], input[name="Erestricciones"], input[name="Econdiciones"], input[name="Ecanones"], input[name="Evinculacion"]').click(function(){	
		if( $(this).val() != "" ){
			$(".error2").fadeOut();
			return true;
		}
	});	
		
	// Cambios Yojann Téllez
	$(".numerico").on("keypress", function(){
		var id_campo = $(this).attr("id");
		return Solo_Numeros(event, id_campo);
	});
	
	function Solo_Numeros(e, id_campo){
		var key = window.event ? e.which : e.keyCode;
		if (key < 48 || key > 57) {
			//Usando la definición del DOM level 2, "return" NO funciona.
			e.preventDefault();
		}
	}// end Solo_Numeros
	
	// Selecciona otro país consultar las ciudades asociadas
	$("#codPais").on("change", function(){
		$("#ciudad").val("");
		document.getElementById('ciudad').innerHTML = "";
		var cod_pais = $(this).val();
		$.ajax({
			headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
			type: "POST",
			url: "ciudad_dav", 
			data: {codigo_pais: cod_pais },
			success: function(datos) {
				$("#ciudad").append("<option value=''selected>Seleccionar</option>");
				for(var i=0;i<datos.length;i++){
					$("#ciudad").append("<option value="+datos[i]['id']+" >"+datos[i]['ciudad']+"</option>");
				}
			},
			async: false,
		});
	}); // END CIUDAD

	// Validar el estado del formulario
	var estado_form = $("#estado_registro").val();
	if(estado_form == '2'){
		// Inhabilitar campos del formulario
		$(".container-fluid :input").attr("readonly", true); 
		$('.btn-info').attr("disabled", true).hide();
		$('.form-control').attr("disabled", true);
		$('.option_si_no').attr("disabled", true).css("background-color", "#ced4da");
		$('#archivo').attr("disabled", true).hide();
	}else{
		
	}


	// Cargar Acrhivo
	$("#cargar_archivo_dav").on("submit", function(e){
		e.preventDefault();
		var formData = new FormData($(this)[0]); // Obtengo los datos del formulario
		var divresul ='messages';
		$.ajax({
			headers: { 'X-CSRF-Token': $('input[name="_token"]').val() },
			type:"POST",
			url:"cargar_dav_archivo",
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(datos){
				//alert(datos);
				if( datos == "OK" ){
					swal({
						title: 'Éxito!',
						text:  "Archivo cargado Correctamente",
						type:  'success'
					});
					location.reload(true); // Recargar Página
				}
			}
		});
	});

	// Cargar ayuda tooltip
	$(".mensaje").click(function(){
		var tooltip = $(this).attr("tooltip");
		$.ajax({
			headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
			type: "POST",
			url: "help_dav", 
			data: {tooltip: tooltip },
			success: function(datos) {
				swal("", datos)
			},
			async: false,
		});
	});

	// Impimir Formulario
	$("[name='imprimir']").click(function (){
		$(".error2").remove();
		var optionprint = 0;
		codNivelComercial2 = document.getElementById("codNivelComercial").selectedIndex;
		codNaturaTran2 = document.getElementById("codNaturaTran").selectedIndex;
		confirmar=(confirm('Advertencia!!!  Una vez impreso el formulario este no podra ser editado. Desea continuar?'));
		Eintermediacion = $("#Eintermediacion").find("option:selected").val();
		if (confirmar) {
			if( codNivelComercial2 == "0" ){
			$("#codNivelComercial").focus().after("<span class='error2'>* </span>");
				return false;
			}else if( codNaturaTran2 == "0" ){
				$("#codNaturaTran").focus().after("<span class='error2'>* </span>");
				return false;
			}else if ( Eintermediacion != "") {
				if ( Eintermediacion == 'SI'){
					codTipoIntermediario2 = document.getElementById("codTipoIntermediario").selectedIndex;
					TipoRazonSocial2 = document.getElementById("TipoRazonSocial").selectedIndex;
					ciudad2 = document.getElementById("ciudad").selectedIndex;
					codPais2 = document.getElementById("codPais").selectedIndex;
					if( codTipoIntermediario2 == "0" ){
						$("#codTipoIntermediario").focus().after("<span class='error2'>* </span>");
						return false;
					}else if( TipoRazonSocial2 == "0" ){
						$("#TipoRazonSocial").focus().after("<span class='error2'>* </span>");
						return false;
					}else if( ciudad2 == "0" ){
						$("#ciudad").focus().after("<span class='error2'>* </span>");
						return false;
					}else if( codPais2 == "0" ){
						$("#codPais").focus().after("<span class='error2'>* </span>");
						return false;
					}
				}
			}else{
				$('[name="Eintermediacion"]').focus().after("<span class='error2'>* </span>");
				return false;
			}
			
			var Econdiciones = $('[name="Econdiciones"]').find("option:selected").val();
			if (Econdiciones != "") {
				if (Econdiciones == 'SI' || Econdiciones == '1'){
					codTipoCondContrap2 = document.getElementById("codTipoCondContrap").selectedIndex;
					Pdeterminarse2 = document.getElementById("Pdeterminarse").selectedIndex;
					if(codTipoCondContrap2 == "0" ){
						$("#codTipoCondContrap").focus().after("<span class='error2'>* </span>");
						return false;
					}else if(Pdeterminarse2 == "0" ){
						$("#Pdeterminarse").focus().after("<span class='error2'>* </span>");
						return false;
					}
				}
			}else{
				$('[name="Econdiciones"]').focus().after("<span class='error2'>* </span>");
				return false;
			}
			
			var Ecanones = $('[name="Ecanones"]').find("option:selected").val();
			/*if (Ecanones != "") {
				if ( Ecanones == 'SI' || Ecanones == '1'){
					Ereversiones2 = document.getElementById("Ereversiones").selectedIndex;
					if(Ereversiones2 == "0" ){
						$("#Ereversiones").focus().after("<span class='error2'>* </span>");
						return false;
					}
				}
			}else{
				$('[name="Ecanones"]').focus().after("<span class='error2'>* </span>");
				return false;
			}*/	
			
			var Evinculacion = $('[name="Evinculacion"]').find("option:selected").val();
			if ( Evinculacion != "" ) {
				if ( Evinculacion == 'SI' ){
					codTipoVinculacion2 = document.getElementById("codTipoVinculacion").selectedIndex;
					Ivinculacion2 = document.getElementById("Ivinculacion").selectedIndex;
					if(codTipoVinculacion2 == "0" ){
						$("#codTipoVinculacion").focus().after("<span class='error2'>* </span>");
						return false;
					}else if(Ivinculacion2 == "S" ){
						$("#Ivinculacion").focus().after("<span class='error2'>* </span>");
						return false;
					}else if(Ivinculacion2 == "N" ){
						Evalores2 = document.getElementById("Evalores").selectedIndex;
						if(Evalores2 == "0" ){
							$("#Evalores").focus().after("<span class='error2'>* </span>");
							return false;
						}
					}
				}
				
			}else{
				$('[name="Evinculacion"]').focus().after("<span class='error2'>* </span>");
				return false;
			}
			
			tipoResp = document.getElementById("tipoResp").selectedIndex;
			if(tipoResp == "0" ){
				$("#tipoResp").focus().after("<span class='error2'>* </span>");
				return false;
			}
			
			$('#imprimir').attr('disabled', true);
			$('#salvar').attr('disabled', true);
			
		}
		else{
			return false;
		}
		//	dialogInstance1.open();
	});// END Imprimir
});
