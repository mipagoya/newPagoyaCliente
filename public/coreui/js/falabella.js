function filters(search,divResultVista,varFilter)
{
    if(search=='anio')
    {
        $("#semana").html('');        
        $("#motonave").html('');        
    }
    if(search=='semana')
    {           
        $("#inputSemana").val(varFilter); //Se carga la semana seleccionana en el input
        $("#motonave").html('');  //Se oculta el div de las motonaves
        $("."+search+"").removeClass("btn-info"); //Se remueve la clase btn-info de las semanas
        $(".get_"+varFilter+"").addClass("btn-info"); //Se agrega clase a la semana seleccionada
    }

        var inputSemana = $('#inputSemana').val();     
        
     if(search=='motonave')
    {        
        var clase = varFilter.replace(/ /g, ""); //Se eliminan los espacios en blanco        
        $("."+search+"").removeClass("btn-info");
        $(".get_"+clase+"").addClass("btn-info");
    }

    var inputSemana = $('#inputSemana').val();
    var inputAnio = $('#inputAnio').val();
    var divResultado = divResultVista;
    var result = '';    
    var url = 'filtersF';    
    var method ='POST';
    var data = {
        name:search,
        field: varFilter,
        inpuAnio:inputAnio,
        inputSemana:inputSemana
    };     
    
    result = ajaxSuccessF(url,divResultado,method,data);
}

function ajaxSuccessF(url, divResultado, method, data)
    {        
        var result = '';
        //hacemos la petición ajax   
        $.ajax({
            headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
            url: url,
            type: method,
            data: data,
            //necesario para subir archivos via ajax
            cache: false,        
            //mientras enviamos el archivo
            beforeSend: function () {                
                $("#"+divResultado+"").html($("#cargador_empresa").html()); 
            },
            //una vez finalizado correctamente
            success: function (data,status) {                
                $("#" + divResultado + "").html(data);
                result = data;                     
            },
            error: function (data) {           
               result = data.status;         
            },
            async:false
        });    
        return result;
    }

function formCargaArchivosF(url)
{  
  
  //alert(url);
  var miurl = url;
  var formu=$(this);
  var nombreform= 'form';
  var divresul = 'divResultado';

  var formData = new FormData($("#"+nombreform+"")[0]);

    $.ajax({
      url: miurl,  
      type: 'POST',
      //datos del formulario
      data: formData,
      cache: false,
      contentType: false,
      processData: false,    
      beforeSend: function(){
        $("#"+divresul+"").html($("#cargador_empresa").html());                
      },
      
      success: function(data){       
        $("#"+divresul+"").html(data);        
        $( "#btn-carga" ).prop( "disabled", true );        
      },
      //si ha ocurrido un error
      error: function(data){        
          console.log(data);
        //$("#"+divresul+"").addClass('alert-danger');
        //$("#"+divresul+"").html("Ha ocurrido un error "+data.status);
       // $( "#btn-carga" ).prop( "disabled", true );              
      }
    });

}

function getNivel(){
    var result = '';
    //hacemos la petición ajax
    $.ajax({
        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: "nivelIncidencia",
        type: "post",
        cache: false,
        success: function(datos){
            // Mostar resultados
            $("#nivel_incidencia").html(datos);
        },
        error: function (data) {
            result = data.status;
        },
        async:false
    });
}  

function ajaxincidencia(url, metodo, data, fieldresult){
    $.ajax({
        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: metodo,
        cache: false,
        data: data,
        success: function(datos){
            $("#"+fieldresult+"").html(datos);
        },
        error: function (data) {
           result = data.status;
        },
        async:false
    });
}

function getTipoIncidente(){
    ajaxincidencia("tipoIncidente", "POST", "", "tipo_incidentes");
}

function ajaxPreSaveIncident(url, method, data){
    $.ajax({
        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: method,
        cache: false,
        data: data,
        success: function(datos){
            // Mostrar Alerta Animada confirmando el SAVE de los registros
            swal({
                position: 'center',
                type: 'success',
                title: 'Registros guardados exitosamente',
                showConfirmButton: false,
                timer: 2500
            })            
            // Cerrar y limpiar la MODAL
            $("#modal_nueva_incidencia").modal('toggle');
        },
        async:false
    });
}

function validateSaveIncidencia(){
    var continuar = true;
    if($("#nivel_incidencia option:selected").val() == ""){
        //MSN Alerta con Error
        swal({
            type: 'error',
            title: 'Debe indicar el Nivel Incidente',
        })
        //alert("Debe indicar el Nivel");
        $("#nivel_incidencia").focus();
        continuar = false;
        return true;
    }
    if($("#tipo_incidente option:selected").val() == ""){
        swal({
            type: 'error',
            title: 'Debe indicar el Tipo Incidente',
        })
        $("#tipo_incidente").focus();
        continuar = false;
        return true;
    }
    if($("#tipo_incidentes_detalle option:selected").val() == ""){
        swal({
            type: 'error',
            title: 'Debe indicar el Detalle Incidente',
        })
        $("#tipo_incidente").focus();
        continuar = false;
        return true;
    }
    if($("#fechaincidente").val() == ""){
        swal({
            type: 'error',
            title: 'Debe indicar la Fecha del Incidente',
        })
        $("#fechaincidente").focus();
        continuar = false;
        return true;
    }
    
    // Validar Sí Detalle Incidente = OTRO el nuevo campo no puede estar vacío
    var detalleOtroIncidente = $("#tipo_incidentes_detalle option:selected").val();
    if(detalleOtroIncidente == "9"){
        if($("#dellate_otro").val().trim() == "" && $("#otra_opcion option:selected").val() == ""){
            swal({
                type: 'error',
                title: 'Debe indicar detalle del incidente',
            })
            $("#dellate_otro").focus();
            continuar = false;
            return true;
        }
    }
    else if(detalleOtroIncidente == "18" || detalleOtroIncidente == "21"){
        if($("#dellate_otro").val().trim() == ""){
            swal({
                type: 'error',
                title: 'Debe indicar detalle del incidente',
            });
            $("#dellate_otro").focus();
            continuar = false;
            return true;
        }
    }
    
    //Validar que hubiese seleccionado algún item opciones de nivel (Seleccione)
    var element_checked = 0;
    var elementos_seleccionados = [];
    $(".detallenivel input").each(function(){
        if($(this).is(":checked")){
            elementos_seleccionados.push($(this).val());
            element_checked = parseInt(element_checked + 1);
        }
    });
    
    // Validar que hubiese seleccionado almenos 1 elemento
    //alert("Num Elementos seleccionados: "+element_checked);
    if(element_checked >= 1 && continuar == true){
       // Validacion para motonave... Se hacen tantos INSERTS como los que contenga el # de carpetas.
        var name_incidencia = $("#nivel_incidencia option:selected").val().trim();
        var data = { 
            anio_selected: $('#inputAnio').val(), 
            semana_selected: $('#inputSemana').val(),
            motonaveid: $('#inputMotonave').val(),
            id_tipoincidente: $('#tipo_incidentes_detalle option:selected').val(),
            desc_otro: $('#dellate_otro').val(),
            desc_otros_registros: $('#otra_opcion option:selected').val(),
            incidencia_selected: name_incidencia,
            fecha_incidente: $("#fechaincidente").val(),
            elementos_seleccionados: elementos_seleccionados
        };
        // Ejecuto la funcion para GUARDAR
        ajaxPreSaveIncident("saveTipificacion", "POST", data);
    }else{
        swal({
            type: 'error',
            title: 'No ha seleccionado ningún elemento',
        })
    }
}

function getopcionesNivel(nivel_seleccionado){
    //alert("NIVEL SELECCIONADO: "+nivel_seleccionado);
    var data = {
        nivelseleccionado: nivel_seleccionado,
        anio_selected: $('#inputAnio').val(), 
        semana_selected: $('#inputSemana').val(),
        motonaveid: $('#inputMotonave').val()
    };
    ajaxincidencia("opcionesniveles", "POST", data, "opciones_incidencias");
}

function tipif_tipIncidente(tipoincidente){
    var data = {tipo_incidente: tipoincidente};
    ajaxincidencia("tipoIncidenteDetalle", "POST", data, "tipo_incidentes_detalle");
}

function getopcionesNivel(nivel_seleccionado){
    //alert("NIVEL SELECCIONADO: "+nivel_seleccionado);
    var data = {
        nivelseleccionado: nivel_seleccionado,
        anio_selected: $('#inputAnio').val(), 
        semana_selected: $('#inputSemana').val(),
        motonaveid: $('#inputMotonave').val()
    };
    ajaxincidencia("opcionesniveles", "POST", data, "opciones_incidencias");
}

function estadoContenedor(estado){   
    var result = '';
    var anio = $("#inputAnio").val(); 
    var semana = $("#inputSemana").val(); 
    var motonave = $("#inputMotonave").val(); 
    var contenedor = $('input:radio[name=contenedor]:checked').val();
    
    var url = 'estadoContenedorF';  
    var divResultado ='resultContenedor';
    var method ='POST';
        var data = {estado: estado,
                    anio:anio,
                    semana:semana,
                    motonave:motonave,
                    contenedor:contenedor
        };      
    
    if(contenedor == null) {
        swal({
            type: 'error',
            title: 'Favor seleccione un contenedor'
            });
            var limpiarSelect = $('#estadoContenedor').val('');
            return;
    }
    
    if(estado == 'inactivar')
    {        
        swal({
            title: 'Desea inactivar el contenedor? '+contenedor,
            text: "Los cambios no se pueden revertir!",
            type: 'warning',            
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, inactivar!'
          }).then((result) => {
            if (result.value) {
                result = ajaxNormal(url,divResultado,method,data);  
                if(result=='success'){
                        swal({
                               type:'success',
                               title:'Contenedor inactivado con exito!'
                        }).then((result)=>{
                            location.reload(); //Recargamos la pagina   
                        });                   
                }else{
                    swal({
                            type: 'error',
                            title: 'A ocurrido un error al inactivar el contenedor '+contenedor+' Error '+result
                        });
                }
            }else
            {
                var limpiarSelect = $('#estadoContenedor').val('');
            }
          });        
    } 
    
    if(estado=='cambiar')
    {        
        ajaxSuccessF(url,divResultado,method,data); 
    } 
    
    if(estado=='update')
    {
        var nuevaMotonave = $("#cambioMotonave").val();
        
        if(nuevaMotonave == 0){
                swal({
                    type: 'error',
                    title: 'Favor seleccione una motonave'
                    });                    
                    return;
        }else{
            var nuevaData = nuevaMotonave.split(";");

        swal({
            title: 'Desea cambiar el contenedor N° '+contenedor+' a la motonave '+nuevaData[0],
            text: "Los cambios no se pueden revertir!",
            type: 'warning',            
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cambiar!'
              }).then((result) => {
                    if (result.value) {                                
                        var data = {
                                    estado: estado,
                                    anio:anio,
                                    semana:semana,
                                    motonave:motonave,
                                    contenedor:contenedor,
                                    destinoMotonave:nuevaData[0],
                                    destinoAnio:nuevaData[1],
                                    destinoSemana:nuevaData[2]
                                };
                         result = ajaxNormal(url,divResultado,method,data); 
                         if(result=='success')
                         {
                            swal({
                                    type:'success',
                                    title:'Contenedor cambiado con exito!'
                            }).then((result)=>{
                                location.reload(); //Recargamos la pagina   
                            }); 
                         }else
                         {
                            swal({
                                type: 'error',
                                title: 'A ocurrido un error al inactivar el contenedor '+contenedor+' Error '+result
                            });
                         }
                        
                    }else{
                        var limpiarSelect = $('#cambioMotonave').val('');
                    }
              });                
            }
    }
}

    function filtFalAer(search,divResultVista,varFilter){
        if(search == 'anio'){
            $("#mes").html('');        
            $("#motonave").html('');
        }
        if(search == 'mes'){
            $("#inputMes").val(varFilter); //Se carga la semana seleccionana en el input
            $("."+search+"").removeClass("btn-info"); //Se remueve la clase btn-info de las semanas
            $(".get_"+varFilter+"").addClass("btn-info"); //Se agrega clase a la semana seleccionada
        }    
            
        if(search=='fecLevante'){
            var clase = varFilter.replace(/ /g, ""); //Se eliminan los espacios en blanco        
            $("."+search+"").removeClass("btn-info");
            $(".get_"+clase+"").addClass("btn-info");
        }

        
        var inputMes = $('#inputMes').val();
        var inputAnio = $('#inputAnio').val();
        var divResultado = divResultVista;
        var result = '';    
        var url = 'filtersReportAer';    
        var method ='POST';
        var data = {
            name:search,
            field: varFilter,
            inputAnio:inputAnio,
            inputMes:inputMes
        };     
        
        result = ajaxSuccessF(url,divResultado,method,data);
    }

    function opcNivInc_ImpAereo(nivel_seleccionado){
        var anio = $('#inputAnio').val();
        var mes = $('#inputMes').val();
        if( anio == "Faltantes"){
            anio = "1900"; mes = "1";
        }
        //alert("NIVEL SELECCIONADO: "+nivel_seleccionado+"-"+anio+"-"+mes);
        var data = {
            nivelseleccionado: nivel_seleccionado,
            anio_selected: anio, 
            mes_selected: mes
        };
        ajaxincidencia("opcNivIncImpAereo", "POST", data, "opciones_incidencias");
    }
    
    function tipiftipIncidente(url, method, data,  div_resultado){
        var tipo_incidente = {data: data};
        ajaxincidencia(url, method, tipo_incidente, div_resultado);
    }