// JavaScript Document

$(document).ready(function(){
// ------------- OBTENER VARIABLES AL CARGAR ------------- // Yojann Tellez
	var indic_select_codcomerc = document.getElementById("codNivelComercial").selectedIndex;
	//alert("Indice seleccionado: "+indic_select_codcomerc);
	var tipo_contrato = $.trim($("#tipoContDoc").val());
	var exist_intermediacion = $("#Eintermediacion").find("option:selected").val();
	var indic_select_codintermed = document.getElementById("codTipoIntermediario").selectedIndex;
	var indic_select_razsocial = document.getElementById("TipoRazonSocial").selectedIndex;
	var indic_select_exrestric = $("#Erestricciones").find("option:selected").val();
	var indic_select_excondic = $("#Econdiciones").find("option:selected").val();
	var indic_select_ecannoes = $("#Ecanones").find("option:selected").val();
	var indic_select_evinc = $("#Evinculacion").find("option:selected").val();
	var indic_select_Ivinc = $("#Ivinculacion").find("option:selected").val();
	var indic_select_evalor = $("#Evalores").find("option:selected").val();
	
// ------------- VALIDAR HBILITAR/INABILITAR CAMPOS AL CARGAR ------------- // Yojann Tellez
	valid_cod_comercial(indic_select_codcomerc);
	valid_tipo_contrato(tipo_contrato);
	valid_exist_intermediacion(exist_intermediacion);
	valid_cod_intermediacion(indic_select_codintermed);
	valid_cod_razsocial(indic_select_razsocial);
	valid_cod_exrestric(indic_select_exrestric);
	valid_cod_excondic(indic_select_excondic);
	valid_cod_ecannoes(indic_select_ecannoes);
	valid_cod_evinc(indic_select_evinc);
	valid_cod_Ivinc(indic_select_Ivinc);
	valid_cod_evalor(indic_select_evalor);
	
// ------------- VALIDAR EVENTOS FORMULARIO ------------- // Yojann Tellez
	$("#codNivelComercial").change(function(){ // Codigo Nivel COmercial evento change
		var indic_select_codcomerc = document.getElementById("codNivelComercial").selectedIndex;
		valid_cod_comercial(indic_select_codcomerc);
	});
	
	$("#tipoContDoc").keyup(function(){
		valid_tipo_contrato($.trim($("#tipoContDoc").val()));
	});
	
	$("#Eintermediacion").change(function(){ // Codigo Nivel COmercial evento change
		var exist_intermediacion = $("#Eintermediacion").find("option:selected").val();
		valid_exist_intermediacion(exist_intermediacion);
	});
	
	$("#codTipoIntermediario").change(function(){ // 57-Cod tipo intermediario
		var indic_select_codintermed = document.getElementById("codTipoIntermediario").selectedIndex;
		valid_cod_intermediacion(indic_select_codintermed);
	});
	
	$("#TipoRazonSocial").change(function(){ // 57-Tipo Razon Social
		var indic_select_razsocial = document.getElementById("TipoRazonSocial").selectedIndex;
		valid_cod_razsocial(indic_select_razsocial);
	});
	
	$("#Erestricciones").change(function(){ // 79-Existen Restricciones?
		var indic_select_exrestric = $(this).find("option:selected").val();
		valid_cod_exrestric(indic_select_exrestric);
	});
	
	$("#Econdiciones").change(function(){ // 81-Existen condiciones o contraprestraciones
		var indic_select_excondic = $(this).find("option:selected").val();
		valid_cod_excondic(indic_select_excondic);
	});
	
	/*$("#Ecanones").change(function(){ 
		var indic_select_ecannoes = $(this).find("option:selected").val();
		valid_cod_ecannoes(indic_select_ecannoes);
	});*/
	
	
	$("#Evinculacion").change(function(){ //  87-Existe vinculación entre comprador y vendedor?
		var indic_select_evinc = $(this).find("option:selected").val();
		valid_cod_evinc(indic_select_evinc);
	});
	
	$("#Ivinculacion").change(function(){ //  // 89-Influye la vinculación en el precio?
		var indic_select_Ivinc = $(this).find("option:selected").val();
		valid_cod_Ivinc(indic_select_Ivinc);
	});
	
	
	$("#Evalores").change(function(){ // 90-Existen valores criterio
		var indic_select_evalor = $(this).find("option:selected").val();
		valid_cod_evalor(indic_select_evalor);
	});
// ------------- FUNCIONES ------------- //
	
	// Valida 28-Cód Nivel comercial comprador	
	function valid_cod_comercial(indic_select_codcomerc){
		if(indic_select_codcomerc != '4'){ // Sí selecciona un INDICE != a 4
			$("#espCodNivelComercial").attr('disabled', 'disabled');
			$("#espCodNivelComercial").val("");
		}else{
			$("#espCodNivelComercial").removeAttr('disabled');
		}
	}
	
	// Validar: 42-Tipo Contrato ó Documento
	function valid_tipo_contrato(tipo_contrato){
		if(tipo_contrato !=''){
			$("#numContrato").removeAttr('disabled');
			$("#fechContrato").removeAttr('disabled');
			$("#valContrato").removeAttr('disabled');
		}
		else{
			$("#numContrato").attr('disabled', 'disabled').val("");
			$("#fechContrato").attr('disabled', 'disabled').val("");
			$("#valContrato").attr('disabled', 'disabled').val("");
		}
	}
	
	// Validar: 56-Existe intermediación
	function valid_exist_intermediacion(exist_intermediacion){
		if( exist_intermediacion == "SI"){
			$("#codTipoIntermediario").removeAttr('disabled');
			$("#especifiIntermediario").val("").attr('disabled', 'disabled');
			$("#TipoRazonSocial").removeAttr('disabled');
			valorIntm = document.getElementById("codTipoIntermediario").value;
			if(valorIntm =='4'){
				$("#especifiIntermediario").removeAttr('disabled');
			}
		}else{
			intermediacion_clear();
		}
	}
	
	// Funcinoes para inhabilitar y limpiar campos
	function intermediacion_clear(){
		document.getElementById("codTipoIntermediario").selectedIndex=0;
		document.getElementById("TipoRazonSocial").selectedIndex=0;
		$("#codTipoIntermediario").attr('disabled', 'disabled');
		$("#especifiIntermediario").val("").attr('disabled', 'disabled');
		$("#TipoRazonSocial").attr('disabled', 'disabled');
		
		deshab_razsocial_jurid();
		$("#nombRazonSocial").val("").attr('disabled', 'disabled');
		$("#direccion").val("").attr('disabled', 'disabled');
	}
	
	// Validar: 57-Cod tipo intermediario
	function valid_cod_intermediacion(indic_select_codintermed){
		if (indic_select_codintermed=='4'){
			$("#especifiIntermediario").removeAttr('disabled');				
		}
		else{
			$("#especifiIntermediario").val("").attr('disabled', 'disabled');			
		}
	}
	
	// Validar: 57-Tipo Razon Social
	function valid_cod_razsocial(indic_select_razsocial){ // 0 = Sel, 1 Jur, 2 Nat
		if(indic_select_razsocial == 0){
			$("#direccion").attr('disabled', 'disabled').val();
			deshab_razsocial_jurid()
		}
		if(indic_select_razsocial == 1){ // JURIDICO
			hab_razsocial_jurid();
			deshab_razsocial_jurid();
		}
		if(indic_select_razsocial == 2){ // NATURAL
			hab_razsocial_nat();
			deshab_razsocial_nat();
		}
	}
	
	function hab_razsocial_jurid(){
		$("#nombRazonSocial").removeAttr('disabled');
		$("#direccion").removeAttr('disabled');
	}
	
	function deshab_razsocial_jurid(){
		$("[name='primerApellido']").val("").attr('disabled', 'disabled');
		$("#SegApellido").val("").attr('disabled', 'disabled');
		$("#primerNomb").val("").attr('disabled', 'disabled');
		$("#otrosNombres").val("").attr('disabled', 'disabled');
	}
	
	function deshab_razsocial_nat(){
		$("#nombRazonSocial").val("").attr('disabled', 'disabled');
	}
	
	function hab_razsocial_nat(){
		$("#primerApellido").removeAttr('disabled');
		$("#SegApellido").removeAttr('disabled');	
		$("#primerNomb").removeAttr('disabled');
		$("#direccion").removeAttr('disabled');
	}
	
	function valid_cod_exrestric(indic_select_exrestric){ // 79-Existen Restricciones?	INDICE
		if(indic_select_exrestric == "SI"){
			$("#CodTipoRestriccion").removeAttr('disabled');
		}else{
			document.getElementById("CodTipoRestriccion").selectedIndex=0;
			$("#CodTipoRestriccion").attr('disabled', 'disabled');
		}
	}
	
	function valid_cod_excondic(indic_select_excondic){ // 81-Existen condiciones o contraprestraciones
		if(indic_select_excondic == "SI"){
			$("#codTipoCondContrap").removeAttr('disabled');
			$("#Pdeterminarse").removeAttr('disabled');
		}else{
			document.getElementById("codTipoCondContrap").selectedIndex=0;
			$("#codTipoCondContrap").attr('disabled', 'disabled');
			contraprestraciones_clear();
		}
	}
	
	function contraprestraciones_clear(){
		document.getElementById("codTipoCondContrap").selectedIndex=0;
		document.getElementById("Pdeterminarse").selectedIndex=0;
		$("#codTipoCondContrap").attr('disabled', 'disabled');
		$("#EspCondicion").val("").attr('disabled', 'disabled');
		$("#Pdeterminarse").attr('disabled', 'disabled');
	}
	
	// 85-Existen canones y derechos de licencia?
	function valid_cod_ecannoes(indic_select_ecannoes){
		if(indic_select_ecannoes == "SI"){
			//$("#Ereversiones").removeAttr('disabled');
		}else{
			document.getElementById("Ereversiones").selectedIndex=0;
			//$("#Ereversiones").attr('disabled', 'disabled');
		}
	}
	$('#codTipoCondContrap').change(function () {
		codtipcont = document.getElementById("codTipoCondContrap").selectedIndex;
		if (codtipcont=='09'){
			$("#EspCondicion").removeAttr('disabled');				
		}
		else{
			$("#EspCondicion").val("").attr('disabled', 'disabled');			
		}
	});
	
	//  87-Existe vinculación entre comprador y vendedor?
	function valid_cod_evinc(indic_select_evinc){
		if(indic_select_evinc == "SI"){
			$("#codTipoVinculacion").removeAttr("disabled");
			$("#Ivinculacion").removeAttr("disabled");
		}else{
			document.getElementById("codTipoVinculacion").selectedIndex=0;
			document.getElementById("Ivinculacion").selectedIndex=0;
			$("#codTipoVinculacion").attr('disabled', 'disabled');
			$("#Ivinculacion").attr('disabled', 'disabled');
			valid_cod_Ivinc("NO");
		}
	}
	
	// 89-Influye la vinculación en  el precio?
	function valid_cod_Ivinc(indic_select_Ivinc){
		valid_cod_evalor(indic_select_Ivinc);
		if( indic_select_Ivinc == "SI" || indic_select_Ivinc == "S" ){
			$("#Evalores").removeAttr('disabled');
		}else{
			document.getElementById("Evalores").selectedIndex=0;
			$("#Evalores").attr('disabled', 'disabled');
			deshab_valores_criterio();
		}
	}
	
	function valid_cod_evalor(indic_select_evalor){
		if( indic_select_evalor == "SI" || indic_select_evalor == "S" ){
			hab_valores_criterio();
		}else{
			deshab_valores_criterio();
		}
	}
	
	// Habilitar Declaración de importación y Fecha
	function hab_valores_criterio(){
		$("#declImportacion").removeAttr('disabled');
		$("#fechImportacion").removeAttr('disabled');
	}
	
	
	// Deshabilitar Declaración de importación y Fecha
	function deshab_valores_criterio(){
		$("#declImportacion").val("").attr('disabled', 'disabled');
		$("#fechImportacion").val("").attr('disabled', 'disabled');
	}
	
	// END Funcinoes
	
});
