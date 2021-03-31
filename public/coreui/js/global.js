
// Funcion para crear Modales Generales
function modalGlobal(url,method,data,titleModal){
    var modal = BootstrapModalWrapperFactory.createModal({
    message: '<div id="div" class="text-center">'+$("#cargador_empresa").html()+'</div>',
    closable: false,
    closeByBackdrop: false
    });

    modal.originalModal.find(".modal-dialog").css({transition: 'all 0.5s'});
    modal.show();
    //setTimeout(function () {
    $.ajax({

        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: method,
        data: {data:data},
        beforeSend: function () {
            $("#div").html($("#cargador_empresa").html());
        },    
        success: function (data,status) {  
			setTimeout(function() {
				modal.updateMessage(data);   
			}, 1000);    
        },
        error: function (data) {           
            modal.updateMessage(data);
        },
    });

    modal.updateSize("modal-lg");
    modal.updateTitle(titleModal);
    modal.addButton({
    label: "Cerrar",
    cssClass: "btn btn-primary",
    action: function (modalWrapper, button, buttonData, originalEvent) {
        return modalWrapper.hide();
    }
});
//}, 10); 
}

function ajaxResult(url,divResult,data){  
    var result = '';
    $("#"+divResult+"").removeClass('alert-danger');    
    $.ajax({
        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: "POST",
        data: data,      
        cache: false,                
        beforeSend: function () {
            $("#" + divResult + "").html($("#cargador_empresa").html());
        },        
        success: function (data) {            
                $("#" + divResult + "").html(data); 
                result = data;                      
        },
        error: function (data) {                        
            $("#"+divResult+"").addClass('alert-danger');
            $("#"+divResult+"").html("Ha ocurrido un error "+data.status); 
            result = data.status;           
        },  
        async:false    
    });      
    return result;
}

// Funcion para crear Modales Generales DOCUMENTOS
function modalGlobalDocumentos(url, method, data, titleModal) {
    var modal = BootstrapModalWrapperFactory.createModal({
        message: '<div id="div" class="text-center">' + $("#cargador_empresa").html() + '</div>',
        closable: false,
        closeByBackdrop: false
    });

    modal.originalModal.find(".modal-dialog").css({ transition: 'all 0.5s' });
    modal.show();
    //setTimeout(function () {
    $.ajax({
        headers: { 'X-CSRF-Token': $('input[name="_token"]').val() },
        url: url,
        type: method,
        data: { data: data },
        beforeSend: function () {
            $("#div").html($("#cargador_empresa").html());
        },
        success: function (data, status) {
            setTimeout(function () {
                // en la variable DATA sólo recibo la URL donde se encuentra ubicado el archivo
                modal.updateMessage("<embed src='" + data + "' " +
                    "frameborder='0' width='100%' height='380px'>");
            }, 1000);
        },
        error: function (data) {
            modal.updateMessage(data);
        },
        async: true,
    });

    modal.updateSize("modal-lg");
    modal.updateTitle(titleModal);
    modal.addButton({
        label: "Cerrar",
        cssClass: "btn btn-primary",
        action: function (modalWrapper, button, buttonData, originalEvent) {
            return modalWrapper.hide();
        }
    });    
}

function ajaxSinResult(url,method,data){  
    $.ajax({
        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: method,
        data: data,      
        cache: false,                
       /* beforeSend: function () {
           // $("#" + divResult + "").html($("#cargador_empresa").html());
        }, */       
        success: function (data) {            
           // console.log(data);                      
        },
        error: function (data) { 
            console.log("Ha ocurrido un error "+data.status);         
        },    async: true,  
    });      
    
}


// Funcion para crear Modales Generales
function modalGeneral(url,data,titleModal){

    var modal = BootstrapModalWrapperFactory.createModal({
    message: '<div id="div" class="text-center">'+$("#cargador_empresa").html()+'</div>',
    closable: false,
    closeByBackdrop: false
    });

    modal.originalModal.find(".modal-dialog").css({transition: 'all 0.5s'});
    modal.show();
    //setTimeout(function () {
    $.ajax({

        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: 'POST',
        data: data,
        beforeSend: function () {
            $("#div").html($("#cargador_empresa").html());
        },    
        success: function (data,status) {  
			setTimeout(function() {
				modal.updateMessage(data);   
			}, 1000);    
        },
        error: function (data) {           
            modal.updateMessage(data);
        },
    });

    modal.updateSize("modal-lg");
    modal.updateTitle(titleModal);
    modal.addButton({
    label: "Cerrar",
    cssClass: "btn btn-primary",
    action: function (modalWrapper, button, buttonData, originalEvent) {
        return modalWrapper.hide();
    }
    });
}

function ajaxResultJson(url,divResult,data){  
    var result = '';
    $("#"+divResult+"").removeClass('alert-danger');    
    $.ajax({
        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: "POST",
        data: data,      
        cache: false,                
        beforeSend: function () {
            $("#" + divResult + "").html($("#cargador_empresa").html());
        },        
        success: function (data) {            
                $("#" + divResult + "").html(data); 
                result = data;                      
        },
        error: function (data) {                                    
            result = data.status;           
        },  
        async:false    
    });      
    return result;
}

//Se crea funcion para pasar formulario con archivos para cargar por ajax
function ajaxFormulario(url,divresul,formData){
	var result = '';
	$.ajax({
		headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
		url: url,  
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
		   result = data;
		},
		//si ha ocurrido un error
		error: function(data){     
			result = data.status;   
		},
		async: false
	  });
	  return result;
}


function ajaxAsincrono(url,data){  
   // var result = '';
    //$("#"+divResult+"").removeClass('alert-danger');    
    $.ajax({
        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: "POST",
        data: data,      
        cache: false,                
        beforeSend: function () {
           // $("#" + divResult + "").html($("#cargador_empresa").html());
        },        
        success: function (data) {            
            //    $("#" + divResult + "").html(data); 
               // result = data;                      
        },
        error: function (data) {                                    
            //result = data.status;           
        },  
        async:true    
    });      
    //return result;
}


function tablaDinamica(divResult,resultadoConsulta,cabeceras){

    //  console.log(cabeceras);
    
      var cantidadRegistros = Object.keys(resultadoConsulta).length;
      //var cantidadClaves    = Object.keys(resultadoConsulta[0]).length;
      var nombreClaves      = Object.keys(resultadoConsulta[0]);
        
    //  console.log('can '+cantidadRegistros+ ' caCL '+cantidadClaves + ' nomc '+nombreClaves);
        document.getElementById(divResult).innerHTML='';
        // Obtener la referencia del elemento body
        var body = document.getElementById(divResult);
      
        // Crea un elemento <table> y un elemento <tbody>
        var tabla   = document.createElement("table");
        tabla.setAttribute("class", "table table-striped table-sm table-responsive");
    
    
        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
    
        var cantCabeceras = Object.keys(cabeceras).length;
        for (var k = 0; k < cantCabeceras; k++) {
    
          var nombreCabecera = cabeceras[k]['nombre'];  
          
          var th = document.createElement("th");  
          var textoCelda = document.createTextNode(nombreCabecera);
          th.appendChild(textoCelda);      
          tr.appendChild(th);
        }    
        thead.appendChild(tr);
    
        var tblBody = document.createElement("tbody");
      
        // Crea las celdas
        for (var i = 0; i < cantidadRegistros; i++) {
    
          /*resultadoConsulta[i]['Algo'] = {
            "class":'clas'+j,
            "id":'id'+j,
          };  */
        //  console.log(resultadoConsulta);
          // Crea las filas de la tabla
          var fila = document.createElement("tr");
      
          for (var j = 0; j < cantCabeceras; j++) {                         
            fila.setAttribute("id",'tr_'+id);
            var celda = document.createElement("td");
            
            var atributos = cabeceras[j]['atributos'];
            
            if(atributos==0){            
              //Si no tiene atributos se crea solo el td            
              var id = resultadoConsulta[i][nombreClaves[0]];
              celda.setAttribute("id",nombreClaves[j]+'_'+id);
              var textoCelda = document.createTextNode(resultadoConsulta[i][nombreClaves[j]]);
              celda.appendChild(textoCelda);
            }else{
              
              var id = resultadoConsulta[i][nombreClaves[0]];
                  //tipoEtiqueta = atributos['tipoEtiqueta'];
                  etiqueta = etiquetasDinamicas(id,atributos,i,j,nombreClaves,resultadoConsulta);
                  celda.appendChild(etiqueta);
            }          
          
            fila.appendChild(celda);
          }  
          // agrega la fila al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(fila);
        }
      
        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(thead);
        tabla.appendChild(tblBody);
        
        // appends <table> into <body>
        body.appendChild(tabla);
        // modifica el atributo "border" de la tabla y lo fija a "2";
      //tabla.setAttribute("border", "2");
    }
    
    function etiquetasDinamicas(id,atributos,i,j,nombreClaves,resultadoConsulta){
    var tipoEtiqueta = atributos['tipoEtiqueta'];
    //console.log(j);
    
    if(tipoEtiqueta=='a'){    
      var href = atributos['href'];
      var clase = atributos['clase'];
      var stilo = atributos['clase'];
      var funcion = atributos['funcion'];
      var nombreFuncion = atributos['nombreFuncion'];
      
    
      var etiqueta = document.createElement(tipoEtiqueta);
               
        etiqueta.setAttribute("id",nombreClaves[j]+'_'+id);          
        etiqueta.setAttribute(funcion, nombreFuncion+"("+id+")");
        etiqueta.setAttribute("href", href);
        etiqueta.setAttribute("style", stilo);
        etiqueta.setAttribute("class", "text-dark "+clase+"");
          var textoCelda = document.createTextNode(resultadoConsulta[i][nombreClaves[j]]);        
          etiqueta.appendChild(textoCelda);
       
    }else if(tipoEtiqueta=='button'){
      /*  var texto = '';
        if(resultadoConsulta[i]==''){
            texto='';
        }else{
            texto = resultadoConsulta[i];
        }*/

        //var href = atributos['href'];
        var clase = atributos['clase'];
        var stilo = atributos['style'];
        var title = atributos['title'];
        var funcion = atributos['funcion'];
        var nombreFuncion = atributos['nombreFuncion'];
        
      
        var etiqueta = document.createElement(tipoEtiqueta);
                 
          etiqueta.setAttribute("id",'btn_'+id);          
          etiqueta.setAttribute(funcion, nombreFuncion+"("+id+")");
         // etiqueta.setAttribute("href", href);
          etiqueta.setAttribute("style", stilo);
          etiqueta.setAttribute("title", title);
          etiqueta.setAttribute("class", "btn "+clase+"");
           /* var textoCelda = document.createTextNode(texto);        
            etiqueta.appendChild(textoCelda);*/
    }else if(tipoEtiqueta=='input'){

        //console.log(resultadoConsulta[i]);
        var type = atributos['type'];
        var clase = atributos['clase'];
        var stilo = atributos['stilo'];
         
        
        var nombreFuncion = atributos['nombreFuncion'];
        
      
        var etiqueta = document.createElement(tipoEtiqueta);
                 
          etiqueta.setAttribute("id",type+'_'+id);  
          etiqueta.setAttribute("name",type+'_'+id);  

          var funcion = atributos['funcion'];
          if(funcion !=''){
            etiqueta.setAttribute(funcion, nombreFuncion+"("+id+")");
        }

        var type = atributos['type'];
        if(type !='radio'){
            var textoCelda = document.createTextNode(resultadoConsulta[i]);        
            etiqueta.appendChild(textoCelda);
        }          
          
          etiqueta.setAttribute("type", type);
          etiqueta.setAttribute("style", stilo);
          etiqueta.setAttribute("class", clase);
          
    }
    
    return etiqueta;
    
    }

	function ImprimirPDF_Reporte( Id_parametro, nameArchivo ){
		//alert(Id_parametro+"-----------"+nameArchivo);
		var ancho = '1100';
		var alto = '700';
		var ext = '.pdf'; // Se debe validar la ext para que sea dinamica
		
		nameArchivo = nameArchivo + ext;
		var url = "Report/" + nameArchivo;
		var posicion_x;
		var posicion_y;
		posicion_x = (screen.width / 2) - (ancho / 2);
		posicion_y = (screen.height / 2) - (alto / 2);
		window.open(url, url, "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
    }
    
    function crearTrazabilidad_global(TipoCarpeta, NroCarpeta, comentario, nombre_campo, contenido_antes, contenido_nuevo ){
        //alert(NroCarpeta+"\n"+comentario+"\n"+nombre_campo+"\n"+contenido_antes+"\n"+contenido_nuevo );
        var info_ClasifTrazab = {
            'Tipo_carpeta': TipoCarpeta,
            'carpeta': NroCarpeta,
            'id_origen_traz': '6',
            'comentario': comentario,
            'public_cliente': '0',
            'id_doc_adjunto': '0',
            'id_menu': $(".active").attr("id"),
            'nombre_campo': nombre_campo,
            'contenido_antes': contenido_antes,
            'contenido_nuevo': contenido_nuevo,
            'email': '0'
        }
        ajaxSinResult('saveGlobalTrazabilidad', 'POST', info_ClasifTrazab);                
    }

    function newTabla(divResult,resultadoConsulta,cabeceras,idTabla){

        var cantidadRegistros = Object.keys(resultadoConsulta).length;    
        var nombreClaves      = Object.keys(resultadoConsulta[0]);  
    
        document.getElementById(divResult).innerHTML='';
        // Obtener la referencia del elemento body
        var body = document.getElementById(divResult);
    
        // Crea un elemento <table> y un elemento <tbody>
        var tabla   = document.createElement("table");
        tabla.setAttribute("class", "table table-striped table-sm table-responsive");
        tabla.setAttribute("id",idTabla);
    
        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
    
        var cantCabeceras = Object.keys(cabeceras).length;
        for (var k = 0; k < cantCabeceras; k++) {
    
          var nombreCabecera = cabeceras[k]['nombre'];  
          
          var th = document.createElement("th");  
          var textoCelda = document.createTextNode(nombreCabecera);
          th.appendChild(textoCelda);      
          tr.appendChild(th);
        }    
        
        thead.appendChild(tr);
    
        var tblBody = document.createElement("tbody"); 
            tblBody.setAttribute("id",idTabla);
      
      for (var i = 0; i < cantidadRegistros; i++) {
       
        var fila = document.createElement("tr");
    
        for (var j = 0; j < cantCabeceras; j++) {                         
          fila.setAttribute("id",id);
          var celda = document.createElement("td");
          
          var atributos = cabeceras[j]['atributos'];
          
          if(atributos==0){            
            //Si no tiene atributos se crea solo el td            
            var id = resultadoConsulta[i][nombreClaves[0]];
            celda.setAttribute("id",nombreClaves[j]+'_'+id);
            celda.setAttribute("name",nombreClaves[j]);
            var textoCelda = document.createTextNode(resultadoConsulta[i][nombreClaves[j]]);
            celda.appendChild(textoCelda);
          }else{
            
            var id = resultadoConsulta[i][nombreClaves[0]];            
                etiqueta = newEtiqueta(id,atributos,i,j,nombreClaves,resultadoConsulta);
                celda.appendChild(etiqueta);
          }         
        
          fila.appendChild(celda);
        }  
        // agrega la fila al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(fila);
      }
    
      // posiciona el <tbody> debajo del elemento <table>
      tabla.appendChild(thead);
      tabla.appendChild(tblBody);  
      
      body.appendChild(tabla);
    
}  

function newEtiqueta(id,atributos,i,j,nombreClaves,resultadoConsulta){

    var tipoEtiqueta = atributos['tipoEtiqueta'];
    var type = atributos['type'];
    var clase = atributos['clase'];
    var stilo = atributos['stilo'];
    var title = atributos['title'];
    var idAtributo = atributos['id'];
    var nombreFuncion = atributos['nombreFuncion'];
    var funcion = atributos['funcion'];
    
    var etiqueta = document.createElement(tipoEtiqueta);
    if(funcion !=''){        
        etiqueta.setAttribute(funcion, nombreFuncion+"("+id+")");
    }
  
    if(idAtributo ===undefined){        
        etiqueta.setAttribute("id",nombreClaves[j]+'_'+id);        
    }else{
        etiqueta.setAttribute("id",idAtributo+'_'+id);  
    }       
        etiqueta.setAttribute("style", stilo);
        etiqueta.setAttribute("title", title);        
    
    if(tipoEtiqueta=='a'){    
    
        var href = atributos['href']; 
            etiqueta.setAttribute("href", href); 
            etiqueta.setAttribute("class", "text-dark "+clase+"");      
        var textoCelda = document.createTextNode(resultadoConsulta[i][nombreClaves[j]]);        
        etiqueta.appendChild(textoCelda);
    
    }else if(tipoEtiqueta=='button'){             
      etiqueta.setAttribute("id",'btn_'+id);
      etiqueta.setAttribute("class", "btn "+clase+"");       
  }else if(tipoEtiqueta=='input'){
  
    if(idAtributo ===undefined){ 
        etiqueta.setAttribute("id",type+'_'+id);  
        etiqueta.setAttribute("name",type+'_'+id);  
    }else{        
        etiqueta.setAttribute("type",type);  
        etiqueta.setAttribute("id",idAtributo+'_'+id);  
        etiqueta.setAttribute("name",idAtributo);
    }
        etiqueta.setAttribute("class",clase);  
  }else if(tipoEtiqueta=='select'){
  
    etiqueta.setAttribute("class",clase);
    etiqueta.setAttribute("name",idAtributo);
    var cantOptions= Object.keys(atributos['data']).length; 
    var option0 = document.createElement('option');
        option0.setAttribute('value',0); 
  
    var texto0 = document.createTextNode('Seleccione...'); 
        option0.appendChild(texto0);
        etiqueta.appendChild(option0);
  
  //Validamos si se crea una la funcion Onchange con el nombre y los parametros enviados        
    if(atributos['nombreFuncion'] != 0){
    var fn = atributos['funcion'];
    var nombreFuncion = atributos['nombreFuncion'];         
    etiqueta.setAttribute('onchange',nombreFuncion); 
    }        
  
    for(var i=0;i < cantOptions;i++){
  
        var option = document.createElement('option');
            option.setAttribute('value',atributos['data'][i]['clave']);
        
            var valor = atributos['data'][i]['valor'];
            var texto = document.createTextNode(valor);
            option.appendChild(texto);        
        etiqueta.appendChild(option);
    }
  }
    return etiqueta;
  }

  

  function crearTablaDinamica(divResult,resultadoConsulta,cabeceras){

    //  console.log(cabeceras);

    var cantidadRegistros = Object.keys(resultadoConsulta).length;
    
    //var cantidadClaves    = Object.keys(resultadoConsulta[0]).length;
    var nombreClaves      = Object.keys(resultadoConsulta[0]);
        
    //  console.log('can '+cantidadRegistros+ ' caCL '+cantidadClaves + ' nomc '+nombreClaves);
        document.getElementById(divResult).innerHTML='';
        // Obtener la referencia del elemento body
        var body = document.getElementById(divResult);
    
        // Crea un elemento <table> y un elemento <tbody>
        var tabla   = document.createElement("table");
        tabla.setAttribute("class", "table table-striped table-sm table-responsive");


        var thead = document.createElement("thead");
        var tr = document.createElement("tr");

        var cantCabeceras = Object.keys(cabeceras).length;
        for (var k = 0; k < cantCabeceras; k++) {

        var nombreCabecera = cabeceras[k]['nombre'];  
        
        var th = document.createElement("th");  
        var textoCelda = document.createTextNode(nombreCabecera);
        th.appendChild(textoCelda);      
        tr.appendChild(th);
        }    
        thead.appendChild(tr);

        var tblBody = document.createElement("tbody");
    
        // Crea las celdas
        for (var i = 0; i < cantidadRegistros; i++) {

        /*resultadoConsulta[i]['Algo'] = {
            "class":'clas'+j,
            "id":'id'+j,
        };  */
        //  console.log(resultadoConsulta);
        // Crea las filas de la tabla
        var fila = document.createElement("tr");
    
        for (var j = 0; j < cantCabeceras; j++) {                         
            
            var celda = document.createElement("td");
            
            var atributos = cabeceras[j]['atributos'];
            
            if(atributos==0){            
            //Si no tiene atributos se crea solo el td            
            celda.setAttribute("id",nombreClaves[j]+'_'+id);
            var textoCelda = document.createTextNode(resultadoConsulta[i][nombreClaves[j]]);
            celda.appendChild(textoCelda);
            }else{
            
            var id = resultadoConsulta[i][nombreClaves[0]];
                //tipoEtiqueta = atributos['tipoEtiqueta'];
                etiqueta = newEtiqueta(id,atributos,i,j,nombreClaves,resultadoConsulta);
                celda.appendChild(etiqueta);
            }          
        
            fila.appendChild(celda);
        }  
        // agrega la fila al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(fila);
        }
    
        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(thead);
        tabla.appendChild(tblBody);
        
        // appends <table> into <body>
        body.appendChild(tabla);
        // modifica el atributo "border" de la tabla y lo fija a "2";
    //tabla.setAttribute("border", "2");
} 

function tablaContactos(nit){

    var data = {'Nit':nit};
  
    var rtaController = ajaxResultJson('listarContacto','tablaContacto',data);    
    //console.log(rtaController);
  
    if(rtaController==0){
      //alert("vacio");
      $("#tablaContacto").hide();
    }else{    
      $("#tablaContacto").show();
  
      var cabeceras =[
        {
          'nombre':'ID',
          'atributos':0,
        },{
          'nombre':'Nombre',
          'atributos':0,          
        },{ 
          'nombre':'Correo',
          'atributos':0,                           
        },{
          'nombre':'Tipo contacto',
          'atributos':0,
        },{
          'nombre':'Inactivar',
          'atributos':{ //setAttribute
            'tipoEtiqueta':'button',
            'clase':'btn btn-danger icon-warning',
            'title':'Inactivar contacto',               
            'funcion':'onclick',
            'nombreFuncion':'inactivarContacto',                              
          }
        },{
          'nombre':'Editar',
          'atributos':{ //setAttribute
            'tipoEtiqueta':'button',
            'clase':'btn btn-warning icon-pencil',
            'title':'Editar contacto',               
            'funcion':'onclick',
            'nombreFuncion':'editarContacto',                              
          }
        }                 
      ];
  
      crearTablaDinamica('tablaContacto',rtaController,cabeceras);
    } 
  }

  function inactivarContacto(id){
    //alert(id);
    var data = {'IdContacto':id}
  
    var alertaInactivacion = confirm("¿Seguro que desea inactivar el contacto?");
    
    if(alertaInactivacion == true){
        
      rtaController = ajaxResultJson('inactivaContacto','tablaContacto',data);
      if(rtaController == "inactivaContacto"){
  
        $("#divRespuesta").addClass('alert-success');
        $("#divRespuesta").html('Se inactivo el contacto exitosamente');
        $("#tablaContacto").hide();
        setTimeout(function(){
            $(".my-1").click();//CierraModal
          //ajaxSuccessF('listarContacto','divRespuesta','POST','');
        }, 3000);
      }
    }
  }
  
  function downloadFile(UrlArchivo){
    var link=document.createElement('a');
    link.href = UrlArchivo;
    link.download = UrlArchivo.substr(UrlArchivo.lastIndexOf('/') + 1);
    link.click();
  }

  function ajaxResultDos(url,divResult,data){  
    var result = '';
    $("#"+divResult+"").removeClass('alert-danger');    
    $.ajax({
        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: "POST",
        data: data,      
        cache: false,                
        beforeSend: function () {
            $("#" + divResult + "").html($("#cargador_empresa").html());
        },        
        success: function (data) {            
                $("#" + divResult + "").html(data); 
                result = data;                      
        },
        error: function (data) {                        
            $("#"+divResult+"").addClass('alert-danger');
            $("#"+divResult+"").html("Ha ocurrido un error "+data.status); 
            result = data.status;           
        },  
       // async:false    
    });      
    return result;
}

function buscarCliente(search,divResult){        
  
  $("#"+divResult+"").removeClass('col-sm-12');
  $("#"+divResult+"").html('');
  

  if(search.length >= 3){  
      $("#"+divResult+"").addClass('col-sm-5');                      
      var url = 'buscarCliente';
      var data = {
          'search':search             
      };

      var resultadoConsulta = ajaxResultJson(url,divResult,data);            
      
      if(resultadoConsulta == 0){
          $("#"+divResult+"").addClass('alert-warning');
          $("#" + divResult + "").html('No se encontraron resultados para : <strong>'+search+'</strong>');
      }else if(resultadoConsulta == 'ERROR'){
          $("#"+divResult+"").addClass('alert-danger');
          $("#" + divResult + "").html(errorSistema);
      }else{
          $("#"+divResult+"").removeClass('alert-warning');
          var cabeceras =[
                    {
                      'nombre':'ID',
                      'atributos':0,          
                    },{
                      'nombre':'NIT',
                      'atributos':{ //setAttribute
                                'tipoEtiqueta':'a',
                                'href':'#',
                                'clase':'',
                                'title':'Seleccione Cliente',
                                'stilo':'text-decoration:none',                            
                                'funcion':'onclick',                            
                                'nombreFuncion':'selectClienteId',                              
                                }            
                    },{
                      'nombre':'DV',
                      'atributos':0,          
                    },{
                      'nombre':'Nombre',
                      'atributos':{ //setAttribute
                                'tipoEtiqueta':'a',
                                'href':'#',
                                'clase':'',
                                'title':'Seleccione Cliente',
                                'stilo':'text-decoration:none',                            
                                'funcion':'onclick',                            
                                'nombreFuncion':'selectClienteId',                              
                                }                              
                    },{
                      'nombre':'Linea',
                      'atributos':0,          
                    }
   
          ];            
          var idTabla = 'cliente';
          newTabla(divResult,resultadoConsulta,cabeceras,idTabla);
      }            
  }
}

function checkboxDo(doEnOperacion,divResultado){
  var div = [];
    var checkbox = [];            
    var label = [];
    for(var i=0; i<doEnOperacion.length;i++){
        var DO = doEnOperacion[i]['DO'];

        div[i] = document.createElement("div");
        div[i].setAttribute("id", "div_"+DO);
        //div[i].setAttribute("class", "border border-dark col-xs-3");
        div[i].setAttribute("style", "float:left; padding:2px 2px 2px 2px");

        checkbox[i] = document.createElement("input");
        checkbox[i].type='checkbox';                
        checkbox[i].setAttribute('class','check');
        checkbox[i].setAttribute('id',DO);                
        //checkbox[i].setAttribute('name',DO);                
        // checkbox[i].setAttribute('onclick',"seleccionaDO("+DO+")");
        
        label[i] = document.createElement("label");                
        var text = document.createTextNode(DO);
        label[i].appendChild(text);

        div[i].appendChild(checkbox[i]);    
        div[i].appendChild(label[i]);
    }

    $("#"+divResultado+"").html(div); 
    $("#"+divResultado+"").addClass('col-sm-12');
}


function nuevaModal(url,data,titleModal){
  var modal = BootstrapModalWrapperFactory.createModal({
  message: '<div id="div" class="text-center">'+$("#cargador_empresa").html()+'</div>',
  closable: false,
  closeByBackdrop: false
  });

  modal.originalModal.find(".modal-dialog").css({transition: 'all 0.5s'});
  modal.show();
  //setTimeout(function () {
  $.ajax({

      headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
      url: url,
      type: 'POST',
      data: data,
      beforeSend: function () {
          $("#div").html($("#cargador_empresa").html());
      },    
      success: function (data,status) {  
    setTimeout(function() {
      modal.updateMessage(data);   
    }, 1000);    
      },
      error: function (data) {           
          modal.updateMessage(data);
      },
  });

  modal.updateSize("modal-lg");
  modal.updateTitle(titleModal);
  modal.addButton({
  label: "Cerrar",
  cssClass: "btn btn-primary",
  action: function (modalWrapper, button, buttonData, originalEvent) {
      return modalWrapper.hide();
  }
});
//}, 10); 
}

function generarReporteUnParametro(nombreform,divresul,nombreArchivo){
    //var nombreform = "form1";            
    var miurl = "descargRepoExcel_UnParametro";
    //var divresul = "divCriticidad"  
    var formData = new FormData($("#" + nombreform + "")[0]);
            
    //hacemos la petición ajax   
    $.ajax({
        headers: { 'X-CSRF-Token': $('input[name="_token"]').val() },
        url: miurl,
        type: 'POST',                
        data: formData,                
        cache: false,
        contentType: false,
        processData: false,
        //mientras enviamos el archivo
        beforeSend: function () {
          $("#" + divresul + "").html($("#cargador_empresa").html());
        },            
        success: function (data) {                
          $("#" + divresul + "").html("");
          //e.preventDefault();
          setTimeout(() => {
            downloadFile("./Report/"+nombreArchivo+".xls");
          }, 1000);

        },
        //si ha ocurrido un error
        error: function (data) {
          $("#"+divresul+"").addClass('alert-danger');
          $("#"+divresul+"").html("Ha ocurrido un error "+data.status);
        }
    });
}

function nuevoContactoCliente(IDCliente, EqModal, Origen) {
    var info_Cliente = {
        'IDCliente': IDCliente,
        'EqModal': EqModal, //  Nro Modal que apertura para cerrar sólo esa
        'Origen': Origen
    }
    var CrearContacto = modalGlobal('crearContactoCliente', 'POST', info_Cliente, 'Crear Contacto');
}

function FechaYHoraActual(){
	var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
		+ (currentdate.getMonth()+1)  + "/" 
		+ currentdate.getFullYear() + " - "  
		+ currentdate.getHours() + ":"  
		+ currentdate.getMinutes() + ":" 
		+ currentdate.getSeconds();
		
	return datetime;
}

	function validarFormatoFecha(Fecha, IdCampo) {
        // Validar que fecha exista. Debe venir en Formato AAAA - MM - DD. Importante el (-)
        var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
        if ((Fecha.match(RegExPattern)) && (Fecha!='')) {
            //return true;
        } else {
            alert("Fecha Nó valida");
            //return false;
            $("#"+IdCampo+"").val("");
        }
    }