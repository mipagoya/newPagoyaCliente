
// Funcion para recargar DIV
function cargarplantNorma(arg){
    if(arg == '1'){ var url = "normatividadAgencia"; var divresul="ListPrincipalNomalidad"; }
    $.get(url,function(resul){
        $("#contentAjax").html(resul);
    });
}

function muestraPdf(nombrePdf)
	{
		//var nombrePdf = nombrePdf;
		//var ext = '.pdf';
		var nameArchivo = nombrePdf;
        var ancho = '1100';
        var alto = '700';
        //var ext = '.pdf'; // Se debe validar la ext para que sea dinamica

        //nameArchivo = nameArchivo + ext;
        var url = "imagenes/" + nameArchivo;
        var posicion_x;
        var posicion_y;
        posicion_x = (screen.width / 2) - (ancho / 2);
        posicion_y = (screen.height / 2) - (alto / 2);
        window.open(url, url, "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");        
    }
    
function cargaNormalidad(){
    var url = "NuevaNormatividad"; 
    $("#formNormatividad").html($("#cargador_empresa").html());         
    $.get(url, function(resul){
        $("#formNormatividad").html(resul);
    });
 }

$("#NewPrincipalNomalidad").click(function() {
    clear_Ente();
    cargar_list_Ente();
    $(".input_clear").val(""); // Limpiar Valores Campos
    $("#nueva_norma_modal").modal("show"); // Abrir Modal
    $("#body_normacreacion").val(); // Abrir Modal
    //setTimeout('cargarplantNorma(1)',2000);
});
 
function enviarCorreo(idRow){
    var url = "EnvioNormatividad"; 
    divresulenvio = "listEnviarCorreo";
    $("#"+divresulenvio+"").html($("#cargador_empresa").html());
    $.get(url,{ idRow: idRow}, function(resul){
        $("#"+divresulenvio+"").html(resul);
    })
}



function verArchivoNorma(url, idRow){
    $.ajax({
        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: 'POST',
        data: {idRow: idRow},
        success: function (datos){
            if( datos != ""){
                $("#adjunto_normas_modal").modal("show");
                var nameArchivo = datos;
                var url = "normatividad_adjuntos/"+idRow+"/"+nameArchivo;
                // Cargar imagen dentro de modal
                $("#body_adjunto_normas").html("<embed src='"+url+"' "+
                    "frameborder='0' width='100%' height='470px'>");
            }else{
                swal({
                    title: "No contiene archivo adjunto",
                    type: "warning",
                    confirmButtonColor: "#DD6B55"
                });
            }
        }
    });
}

function consulta_modal_normas(idRow, url, id_modal, body_modal){
    //alert(idRow+"-"+url+"-"+id_modal+"-"+body_modal);
    $("#"+id_modal+"").modal("show");
     $("#"+body_modal+"").html($("#cargador_empresa").html());
     $.get(url,{ idRow: idRow}, function(resul){
         $("#"+body_modal+"").html(resul);
     })
 }
