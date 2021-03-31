 alert("ASDASDASDASD");
 $('#Inente').change(function(){
   obtenerTipodocu($(this).val());
 });
  function obtenerTipodocu(idCategoria){
    $.ajax({
        type: 'GET',
        data: { metodo : 'obtenerTipodocu' , idCategoria : idCategoria },
        url: 'NivelesNorma',
        dataType: "json",
        success: rendeListaPistos
    });
  }

 function rendeListaPistos(data){
    $('#Intipodocu option').remove();
    var list = data == null ? [] : (data.pistos instanceof Array ? data.pistos : [data.pistos ]);
    if (list.length < 1) {
       alert("NO EXISTEN RESULTADOS");
    } else {
        $('#Intipodocu').append('<option value="0">SELECCIONAR...</option>');
        $.each(list, function(index, pisto) {
            $('#Intipodocu').append('<option value='+pisto.id_tipo_doc+'>'+ $.trim(pisto.tipo_documento)+'</option>');
        });
        $('#Intipodocu').focus();
    }
 }

 $('#Intipodocu ').change(function(){
  // alert("Seleccionaste: "+$(this).val());
  obtenerModalidad($('#Inente').val(), $('#Intipodocu').val());
 });



 function obtenerModalidad(idEnte, idTipoDocu){
    $.ajax({
        type: 'GET',
        data: { metodo : 'obtenerModalidad' , idEnte : idEnte, idTipoDocu : idTipoDocu},
        url: 'NivelesNorma',
        dataType: "json",
        success: rendeListaModalidad
    });
  }

 function rendeListaModalidad(data){
    $('#Inmodalidad option').remove();
    var listM = data == null ? [] : (data.Listmodalidad instanceof Array ? data.Listmodalidad : [data.Listmodalidad ]);
    if (listM.length < 1) {
       alert("NO EXISTEN RESULTADOS");
    } else {
        $('#Inmodalidad').append('<option value="0">SELECCIONAR...</option>');
        $.each(listM, function(index, Listmodalidad) {
            $('#Inmodalidad').append('<option value='+Listmodalidad.id_modalidad+'>'+$.trim(Listmodalidad.modalidad)+'</option>');
        });
        $('#Inmodalidad').focus();
    }
 }

 $('#vigencia').change(function () {
        indice = document.getElementById("vigencia").selectedIndex;
        

        if (indice == 0){
            $("#fechdesde").removeAttr('disabled');
            $("#fechhasta").removeAttr('disabled');               
            }
        else{
            $("#fechdesde").attr('disabled', 'disabled');
            $("#fechhasta").attr('disabled', 'disabled');             
            }

    });

$('#datetimepicker2').datepicker({
                   language: 'es',
                   format: "yyyy-mm-dd",
                   autoclose: true
                });
$('#datetimepicker3').datepicker({
                   language: 'es',
                   format: "yyyy-mm-dd",
                   autoclose: true
                });
$('#datetimepicker4').datepicker({
                   language: 'es',
                   format: "yyyy-mm-dd",
                   autoclose: true
                });

 
       
