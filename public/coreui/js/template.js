/*****
* CONFIGURATION
*/
  // Active ajax page loader
  $.ajaxLoad = true;

  //required when $.ajaxLoad = true
  //$.defaultPage = 'main.html';
  //$.subPagesDirectory = 'views/';
  //$.page404 = 'views/pages/404.html';
  $.mainContent = $('#ui-view');

  //Main navigation
  $.navigation = $('nav > ul.nav');

  $.panelIconOpened = 'icon-arrow-up';
  $.panelIconClosed = 'icon-arrow-down';

  //Default colours
  $.brandPrimary =  '#20a8d8';
  $.brandSuccess =  '#4dbd74';
  $.brandInfo =     '#63c2de';
  $.brandWarning =  '#f8cb00';
  $.brandDanger =   '#f86c6b';

  $.grayDark =      '#2a2c36';
  $.gray =          '#55595c';
  $.grayLight =     '#818a91';
  $.grayLighter =   '#d1d4d7';
  $.grayLightest =  '#f8f9fa';

'use strict';

/*****
* ASYNC LOAD
* Load JS files and CSS files asynchronously in ajax mode
*/
function loadJS(jsFiles, pageScript) {

  var i;
  for(i = 0; i<jsFiles.length;i++){

    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = jsFiles[i];
    body.appendChild(script);
  }

  if (pageScript) {
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = pageScript;
    body.appendChild(script);
  }

  init();
}

function loadCSS(cssFile, end, callback) {

  var cssArray = {};

  if (!cssArray[cssFile]) {
    cssArray[cssFile] = true;

    if (end == 1) {

      var head = document.getElementsByTagName('head')[0];
      var s = document.createElement('link');
      s.setAttribute('rel', 'stylesheet');
      s.setAttribute('type', 'text/css');
      s.setAttribute('href', cssFile);

      s.onload = callback;
      head.appendChild(s);

    } else {

      var head = document.getElementsByTagName('head')[0];
      var style = document.getElementById('main-style');

      var s = document.createElement('link');
      s.setAttribute('rel', 'stylesheet');
      s.setAttribute('type', 'text/css');
      s.setAttribute('href', cssFile);

      s.onload = callback;
      head.insertBefore(s, style);

    }

  } else if (callback) {
    callback();
  }

}

/****
* AJAX LOAD
* Load pages asynchronously in ajax mode
*/

if ($.ajaxLoad) {

  var paceOptions = {
    elements: false,
    restartOnRequestAfter: false
  };

  var url = location.hash.replace(/^#/, '');
  

  if (url != '') {
    setUpUrl(url);
  } else {
    setUpUrl($.defaultPage);
  }

  $(document).on('click', '.nav a[href!="#"]', function(e) {
    if ( $(this).parent().parent().hasClass('nav-tabs') || $(this).parent().parent().hasClass('nav-pills') ) {
      e.preventDefault();
    } else if ( $(this).attr('target') == '_top' ) {
      e.preventDefault();
      var target = $(e.currentTarget);
      window.location = (target.attr('href'));
    } else if ( $(this).attr('target') == '_blank' ) {
      e.preventDefault();
      var target = $(e.currentTarget);
      window.open(target.attr('href'));
    } else {
      e.preventDefault();
      var target = $(e.currentTarget);
      setUpUrl(target.attr('href'));
    }
  });

  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}

function setUpUrl(url) {

  $('nav .nav li .nav-link').removeClass('active');
  $('nav .nav li.nav-dropdown').removeClass('open');
  //$('nav .nav li:has(a[href="' + url.split('?')[0] + '"])').addClass('open');
  //$('nav .nav a[href="' + url.split('?')[0] + '"]').addClass('active');
  loadPage(url);
}

function loadPage(url) {

  $.ajax({
    type : 'GET',
    url : $.subPagesDirectory + url,    
    dataType : 'html',
    cache : false,
    async: false,
    beforeSend : function() {
      $.mainContent.css({ opacity : 0 });
    },
    success : function() {
      Pace.restart();
      $('html, body').animate({ scrollTop: 0 }, 0);
      //$.mainContent.load($.subPagesDirectory + url, null, function (responseText) {
      //  window.location.hash = url;
      //}).delay(250).animate({ opacity : 1 }, 0);
    },
    error : function() {
      //window.location.href = $.page404;
    }

  });
}


/****
* MAIN NAVIGATION
*/

$(document).ready(function($){

  // Add class .active to current link - AJAX Mode off
  $.navigation.find('a').each(function(){

    var cUrl = String(window.location).split('?')[0];

    if (cUrl.substr(cUrl.length - 1) == '#') {
      cUrl = cUrl.slice(0,-1);
    }

    if ($($(this))[0].href==cUrl) {
      $(this).addClass('active');

      $(this).parents('ul').add(this).each(function(){
        $(this).parent().addClass('open');
      });
    }
  });

  // Dropdown Menu
  $.navigation.on('click', 'a', function(e){

    if ($.ajaxLoad) {
      e.preventDefault();
    }

    if ($(this).hasClass('nav-dropdown-toggle')) {
      $(this).parent().toggleClass('open');
      resizeBroadcast();
    }
  });

  function resizeBroadcast() {

    var timesRun = 0;
    var interval = setInterval(function(){
      timesRun += 1;
      if(timesRun === 5){
        clearInterval(interval);
      }
      window.dispatchEvent(new Event('resize'));
    }, 62.5);
  }

  /* ---------- Main Menu Open/Close, Min/Full ---------- */
  $('.sidebar-toggler').click(function(){
    $('body').toggleClass('sidebar-hidden');
    resizeBroadcast();
  });

  $('.sidebar-minimizer').click(function(){
    $('body').toggleClass('sidebar-minimized');
    resizeBroadcast();
  });

  $('.brand-minimizer').click(function(){
    $('body').toggleClass('brand-minimized');
  });

  $('.aside-menu-toggler').click(function(){
    $('body').toggleClass('aside-menu-hidden');
    resizeBroadcast();
  });

  $('.mobile-sidebar-toggler').click(function(){
    $('body').toggleClass('sidebar-mobile-show');
    resizeBroadcast();
  });

  $('.sidebar-close').click(function(){
    $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
  });

  /* ---------- Disable moving to top ---------- */
  $('a[href="#"][data-top!=true]').click(function(e){
    e.preventDefault();
  });

});

/****
* CARDS ACTIONS
*/

$(document).on('click', '.card-actions a', function(e){
  e.preventDefault();

  if ($(this).hasClass('btn-close')) {
    $(this).parent().parent().parent().fadeOut();
  } else if ($(this).hasClass('btn-minimize')) {
    var $target = $(this).parent().parent().next('.card-block');
    if (!$(this).hasClass('collapsed')) {
      $('i',$(this)).removeClass($.panelIconOpened).addClass($.panelIconClosed);
    } else {
      $('i',$(this)).removeClass($.panelIconClosed).addClass($.panelIconOpened);
    }

  } else if ($(this).hasClass('btn-setting')) {
    $('#myModal').modal('show');
  }

});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function init(url) {

  /* ---------- Tooltip ---------- */
  $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement":"bottom",delay: { show: 400, hide: 200 }});

  /* ---------- Popover ---------- */
  $('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();

}

function menuDinamico(url,data){   
  //Elimina el fondo inicial
  $( "main" ).removeClass("fondo");
  var divresul = 'contentAjax';
  $("#"+divresul+"").removeClass('alert-danger');
  $.ajax({

    url: url,     
    type: 'GET', 
    data:data,       
    cache: false,
    contentType: false,
    processData: false,
    //mientras enviamos el archivo
    beforeSend: function(){
      $("#"+divresul+"").html($("#cargador_empresa").html());                
    },    
    success: function(data){
      $("#"+divresul+"").html(data);
      $("#divMain").empty();
    },    
    error: function(data){   
      if(data.status==401)
      {
        document.location.href ="/";
      }else
      {
        $("#"+divresul+"").addClass('alert-danger');
        $("#"+divresul+"").html("Ha ocurrido un error "+data.status);        
      }
           
    }
  });
}

function formCargaArchivos(url){   
  var miurl = url;
  var formu=$(this);
  var nombreform= 'form';
  var divresul = 'divResultado';
  var formData = new FormData($("#"+nombreform+"")[0]);
 
  //console.log(formData);
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
     // $( "#btn-carga" ).prop( "disabled", true );        
    },
    //si ha ocurrido un error
    error: function(data){        
      
      $("#"+divresul+"").html("Ha ocurrido un error "+data.status);
                  
    },
    async: true
  });
}

function cargaVista(id,accion){
  // if( accion == 1){
  //   url = 'editUser';    
  // }

  if( accion == 2 ){
    url = 'relateUser';
  }
  if( accion == 3 ){
    url = 'editRol';
  }
  if( accion == 4 ){
    url = 'relateRol';
  }
  if (accion == 5) { // Editar Tipo Carpeta
    url = 'editTipoCarpeta';
  }

  if (accion == 6) { // Relacionar Tipo Carpeta con Tipos de Documentos
    url = 'adminTipoDocTipCarp';
  }

  if(accion == 7){
    url = 'editCliente';
  }

  // if(accion == 8){
  //   url = 'relacionarUser';
  // }

  // if(accion == 8){
  //   url = 'listarUsuarios';
  // }

  var miurl = url;
  var divresul = 'contentAjax';
  $.ajax({
    url: miurl,  
    type: 'GET',
    //datos del formulario
    data: "id="+id,
    cache: false,
    contentType: false,
    processData: false,    
    beforeSend: function(){
      $("#"+divresul+"").html($("#cargador_empresa").html());
    },    
    success: function(data){
      $("#"+divresul+"").show();
      $("#"+divresul+"").removeClass('alert-danger');
      $("#"+divresul+"").html(data);
      // $( "#btn-guardar" ).prop( "disabled", true );
      /*setTimeout(function() {
        menuDinamico('listUser');
      }, 2000);  */                     
      },
      //si ha ocurrido un error
      error: function(data){
        $("#"+divresul+"").addClass('alert-danger');
        $("#"+divresul+"").html("Ha ocurrido un error "+data.status);
        //$( "#btn-guardar" ).prop( "disabled", true );              
      }
  });  
}

/* Funciones para gestor documental derco */
function ajaxSuccess(url, divResultado, method, data)
    {        
        var result = '';
        //hacemos la petición ajax   
        $.ajax({
            headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
            url: url,
            type: method,
            data: data,
            processData: false,
            contentType: false,
            //necesario para subir archivos via ajax
            cache: false,        
            //mientras enviamos el archivo
            beforeSend: function () {
                $("#" + divResultado + "").html($("#cargador_empresa").html());
            },
            //una vez finalizado correctamente
            success: function (data,status) {                
              if (data == 'C1'){
                $(".my-1").click(); // Cerrar Modal de adjuntar documento
                swal({
                  title: "Archivo ya está cargado previamente.",
                  type: "warning",
                  confirmButtonColor: "#DD6B55"
                });
              }
              else if (data == 'C2'){ // Cargado desde Gestor Documental
                $(".my-1").click(); // Cerrar Modal de adjuntar documento
                swal({
                  title: "Archivo cargado correctamente.",
                  type: "success",
                  confirmButtonColor: "#a3dd82"
                });
              }else{ // Resultado FUERA DE Trazabildiad Modal
                $("#" + divResultado + "").html(data);
                result = data;                     
              }
            },
            error: function (data) {           
               result = data.status;         
            },
            async: false
        });    
        return result;
    }

function formularioTipoDoc(id){  
  
  if(id >= 1 ) {     
      var doc_adjunted = formCargaArchivos('cargaMetadata');
   }else{     
      document.getElementById('cargaDocumentosDuplicados').innerHTML='';
   }
}

function cargaDocumentoGD(url,ruta2)
{ 
  if(ruta2=='anexoAjax')
  {
    var url = ruta2;
  }else{    
    var url = 'saveDocument';
  }
  
  var resul_validacion = validateFormularioRequired("form");
  if( resul_validacion != ''){
    alert("Favor validar los campos Obligarotios del formulario (*)");
  }else{
    var nombre_archivo = '';
    $(".nombre_archivo").each(function(){         
        nombre_archivo += $(this).val();
    });
        
    
    var divResultado ='divResult';
    var method ='POST';
    var f = $(this);
    var formData = new FormData(document.getElementById("form"));
        formData.append("nombre_archivo", nombre_archivo);
    
    var data = formData;
    //console.log(formData);
    
    result = ajaxSuccess(url,divResultado,method,data);

    if(result === 'OK') {      
      swal({
        title: "Archivo cargado con exito.",
        type: "success",        
      });
      $(".my-1").click();     
    }

    if(result === 'DUPLICADO') {      
      alert('El archivo ya se encuentra cargado, Favor validar');
    }

  }
}

function ajaxNormal(url, divResultado, method, data)
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
                $("#" + divResultado + "").html($("#cargador_empresa").html());
            },
            //una vez finalizado correctamente
            success: function (data,status) {
                if(data !=''){                   
                    $("#" + divResultado + "").html(data);
                }
                     result = status;
            },
            error: function (data) {           
               result = data.status;         
            },
            async:false
        });    
        return result;
    }

function formularioTipoDoc1(id)
{ 
    document.getElementById('cargaForm').innerHTML='';
    document.getElementById('formBuscar').innerHTML='';
    if (id >= 0) {
       // document.getElementById('cargaForm').style = "display: block;";        
        var data = {id: id};
        //hacemos la petición ajax, llamando la fucntion ajax  que recibe 4 parametros             
            var result = ajaxNormal('buscarTipo', 'cargaForm', 'POST', data);
                if(result != 'success')
                {           
                    alert("Ha ocurrido un error "+ result);
                    return false;
                }       
    } else
    {   
        //Si no selecciona ningun tipo oculta el formlario
        document.getElementById('cargaForm').innerHTML='';
        
    }
}

function formBuscar(id)
{   
    document.getElementById('formBuscar').innerHTML='';
    if (id >= 0) {        
        //document.getElementById('formBuscar').style = "display: block;";
        var data = {id: id};
        //hacemos la petición ajax, llamando la fucntion ajax  que recibe 4 parametros             
            var result = ajaxNormal('formBuscar', 'formBuscar', 'POST', data);
                if(result != 'success')
                {           
                    alert("Ha ocurrido un error "+ result);
                    return false;
                }       
    } else
    {        
        document.getElementById('formBuscar').innerHTML='';        
    }
}

function buscarAjax(value)
{   
   
    var campo = document.getElementById('campo').value;  
    var idMetaData = document.getElementById('idMetaData').value;       
    var idCarpeta = document.getElementById('idCarpeta').value;       
    if(campo=='date')
        {            
            var fechaInicio = document.getElementById('fechaInicio').value;
            var fechaFin = document.getElementById('fechaFin').value;
            
            if(fechaInicio =='')
            {
                alert('Favor ingrese fecha Inicial');  
                return false;
            }
            
            if(fechaFin =='')
            {
                alert('Favor ingrese fecha Final');  
                return false;
            }
            var data = {                
                idMetaData  : idMetaData,
                campo       : campo,    
                fechaInicio : fechaInicio,    
                fechaFin    : fechaFin,  
                idCarpeta   : idCarpeta
            };
            ajaxNormal('resultadoBusqueda', 'resultadoBusqueda', 'POST', data);
        }else
        {
          if(value.length >= 3){
            var buscar =  document.getElementById('buscar').value;
            var data = {
                buscar     :  buscar,
                idMetaData :  idMetaData,
                campo      :  campo,
                idCarpeta  :  idCarpeta   
            };
            ajaxNormal('resultadoBusqueda', 'resultadoBusqueda', 'POST', data);
          }
        }
        
     // var data = data;
        //hacemos la petición ajax, llamando la fucntion ajax  que recibe 4 parametros             
     // ajaxNormal('resultadoBusqueda', 'resultadoBusqueda', 'POST', data);
   // }
}

function buscarSerial()
{   
  var serial =  document.getElementById('serial').value;             

  var data = {
      serial: serial
  };
  
  var data = data;
  //hacemos la petición ajax, llamando la fucntion ajax  que recibe 4 parametros             
  ajaxNormal('busquedaSerial', 'resultadoBusqueda', 'POST', data);
    
}

function buscarPdfDi()
{   
  var vin_serial =  document.getElementById('vin_serial').value;             

  var data = {
      vin_serial: vin_serial
  };
  
  var data = data;
  //hacemos la petición ajax, llamando la fucntion ajax  que recibe 4 parametros             
  ajaxNormal('declaracionpdf', 'divResultado', 'POST', data);
    
}

function cargaModal(url,data)
    {    
        var divResultado = 'divResultado';
        $.ajax({
            headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
            url: url,
            type: 'POST',
            data: data,
            //necesario para subir archivos via ajax
            cache: false,        
            //mientras enviamos el archivo
            beforeSend: function () {
                $("#" + divResultado + "").html($("#cargador_empresa").html());
            },
            //una vez finalizado correctamente
            success: function (data) {                                 
                $("#" + divResultado + "").html(data); 
            },
            error: function (data) {           
                $("#" + divResultado + "").html(data.status);        
            },            
        });    
        
    }

function cargaDocumentoGDModal(url) {
  var resul_validacion = validateFormularioRequired("form");
  if (resul_validacion != '') {
    alert("Favor validar los campos Obligarotios del formulario (*)");
  } else {
    var nombre_archivo = '';
    $(".nombre_archivo").each(function () {
      nombre_archivo += $(this).val();
    });
    
    var url = 'saveDocumentModal';
    var divResultado = 'divResult';
    var method = 'POST';
    var f = $(this);
    var formData = new FormData(document.getElementById("form"));
    formData.append("nombre_archivo", nombre_archivo);
    var data = formData;

    // Validar que el archivo ya esté cargado:
    //if( $("#archivo").val() != '' && $.trim($("#nombre_archivo").val()) != ''  ){
      $.ajax({
        headers: { 'X-CSRF-Token': $('input[name="_token"]').val() },
        url: url,
        type: method,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        //una vez finalizado correctamente
        success: function (data, status) {
          if (data == 'Creado') {
            alert("Ya existe un documento con éste nombre.");
          } else {
            alert("Se ha cargado el documento Adjunto");
            $(".my-1").eq('1').click(); // Cerrar la 2da Modal de adjuntar documento
            $("#id_input_adjunto").val(data); // Asigno el Id del nuevo documento al input que esta en Crear formularioTipoDoc
            rtaCargaDoc_ModelExtra();
          }
        },
        error: function (data) {
          alert("ERROR: " + data);
          console.log(data);
        },
        async: false
      });
    /*}else{
      alert("Favor Diligenciar los campos del formulario")
    }*/
  }
}

function validateFormularioRequired(idFormulario) {
  // Validar los campos esten diligenciados que tengan el atributo required
  var nombre_label = '';
  $("#" + idFormulario + " :required").each(function () {
    if ($.trim($(this).val()) == "") {
      nombre_label += $(this).attr('id'); // almaceno los nombres de los campos que son obligatorios
    }
  });
  return nombre_label;
}

function adjunto_Trazabilidad(id){
  var data = {
    idDocumento: id
  }
  modalGlobalDocumentos('verDocumentoGlobal', 'POST', data, 'Documento Adjunto');
}

function saveGlobalTrazabilidad(data){
  //alert('saveTrazabilidadTempal');
  var url = 'saveGlobalTrazabilidad';
  var method='POST';
  ajaxSinResult(url, method, data);
}

function saveRecoTrazabilidad(data){  
  var url = 'saveRecoTrazabilidad';
  var method='POST';
  ajaxSinResult(url, method, data);
}


// Función para ver los documentos adjuntos sin abrir Modal
function VerDocAdjuntos_SinModal(url, method, data, titleModal) {
  var id_div_result = data['Id_Div'];
  $.ajax({
    headers: { 'X-CSRF-Token': $('input[name="_token"]').val() },
    url: url,
    type: method,
    data: { data: data },
    beforeSend: function () {
      $("#" + id_div_result + "").html($("#cargador_empresa").html());
    },
    success: function (data, status) {
      //alert(data);
      setTimeout(function () {
        // en la variable DATA sólo recibo la URL donde se encuentra ubicado el archivo
        $("#" + id_div_result + "").html("<embed src='" + data + "' " +
          "frameborder='0' width='100%' height='380px'>");
      }, 1000);
    },
    error: function (data) {
      alert("Error al Abrir el documento adjunto");
    },
    async: true,
  });
}

  function rtaCargaDoc_ModelExtra(data){
    var infoProveniente = $("#id_input_adjunto").attr("info-proveniente"); // Se usa para saber de donde se esta cargando el documento y recargar DIV según cada caso
    //alert(infoProveniente);
    if (infoProveniente != ''){
      if (infoProveniente == 'ListaChequeo_Modal') { // Funcion en el archivo modalSelectOpt.balde.php
        consultInfoDo();
        alert("Documento asociado con éxito en la Lista de Chequeo");
      }else if (infoProveniente == 'Trazabilidad_Modal') { // Trazabilidad.balde.php
        $("#Trazabilidad_adjuntar").attr("disabled", true); // Bloquear el boton Adjuntar  
        $("#Trazabilidad_Enviar").click();
      }
    }
  }

  // Comparar fechas, la cual la fecha a validar NO debe ser MAYOR a la actual
  function validarFechaMenActual(FechaValidar){
    var d = new Date();
    var fechaActual = d.getFullYear() + "-" + ((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1)) + "-" + (d.getDate()<10?'0'+d.getDate():d.getDate()) ;
    var flagFechaMenor = true;
    if( (new Date( FechaValidar ).getTime() > new Date(fechaActual).getTime() ) ) {
      alert("La Fecha seleccionada ("+FechaValidar+") no puede ser mayor a la actual: "+fechaActual);
      flagFechaMenor = false;
    }
    return flagFechaMenor;
  }

  /*function adjuntos_SinModal(url, data, divResultado) {     
    $.ajax({
          headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
          url: url,
          type: "POST",
          data: data,      
          cache: false,                
          beforeSend: function () {
              $("#" + divResultado + "").html($("#cargador_empresa").html());
          },        
          success: function (data) {            
                  $("#" + divResultado + "").html(data); 
                  result = data;                      
          },
          error: function (data) {                                    
              result = data.status;           
          },  
          async:true    
      });   
  }*/

  function formCargaArchivosDos(url,arrayDO){   
    var resultado = 0;
    var miurl = url;
    var formu=$(this);
    var nombreform= 'form';
    var divresul = 'divResultado';
    var formData = new FormData($("#"+nombreform+"")[0]);
    formData.append('arrayDO',JSON.stringify(arrayDO));
  
    if ($("#origen").val() == 'ModalTrazabilidad' || $("#origen").val() == 'ModalListaChequeo') {
      miurl = 'cargaMetadataModal';
    }
    //console.log(formData);
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
       // $( "#btn-carga" ).prop( "disabled", true );    
        resultado = data;    
      },
      //si ha ocurrido un error
      error: function(data){        
        $("#"+divresul+"").addClass('alert-danger');
        $("#"+divresul+"").html("Ha ocurrido un error "+data.status);
        $( "#btn-carga" ).prop( "disabled", true );     
         resultado = data.status;         
      },
      async: false
    });
    return resultado;
  }


  function formCargaArchivosAsync(url,arrayDO,divresul){   
    var resultado = 0;
    var miurl = url;
    var formu=$(this);
    var nombreform= 'form';    
    var formData = new FormData($("#"+nombreform+"")[0]);
    formData.append('arrayDO',JSON.stringify(arrayDO));  
    
    $.ajax({
      url: miurl,  
      type: 'POST',      
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
        resultado = data;    
      },
      //si ha ocurrido un error
      error: function(data){        
       $("#"+divresul+"").addClass('alert-danger');
        $("#"+divresul+"").html("Ha ocurrido un error "+data.status);
        $( "#btn-carga" ).prop( "disabled", true );     
         resultado = data.status;         
      },
      async: true
    });
    return resultado;
  }  