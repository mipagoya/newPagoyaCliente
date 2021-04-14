function modalGlobal(url,method,data,titleModal){
    var modal = BootstrapModalWrapperFactory.createModal({
    message: '<div id="div" class="text-center">'+$("#cargador_empresa").html()+'</div>',
    closable: false,
    closeByBackdrop: false
    });
    modal.originalModal.find(".modal-dialog").css({transition: 'all 0.5s'});
    modal.show();   
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

function ajaxSinResult(url,method,data){  
    $.ajax({
        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: method,
        data: data,      
        cache: false, 
        success: function (data) {  
        },
        error: function (data) { 
            console.log("Ha ocurrido un error "+data.status);         
        },    async: true,  
    });   
}

function modalGeneral(url,data,titleModal){

    var modal = BootstrapModalWrapperFactory.createModal({
    message: '<div id="div" class="text-center">'+$("#cargador_empresa").html()+'</div>',
    closable: false,
    closeByBackdrop: false
    });

    modal.originalModal.find(".modal-dialog").css({transition: 'all 0.5s'});
    modal.show();   
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
		error: function(data){     
			result = data.status;   
		},
		async: false
	  });
	  return result;
}

function ajaxAsincrono(url,data){        
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

  function cargaDocForAjax(url,divresul,tiempo){  
    //let formu = $(this);       
    let formData = new FormData($("#form")[0]); 
    $.ajax({
      url: url,  
      type: 'POST',    
      data: formData,
      cache: false,
      contentType: false,
      processData: false,    
      beforeSend: function(){
        $("#"+divresul+"").html($("#cargador_empresa").html());                
      },    
      success: function(data){    console.log(data);
          if(data=='duplicado'){
              $("#"+divresul+"").html("<p class='text-danger'>Documento duplicado favor validar</p>");  
          } else if(data==200){ 
              $("#"+divresul+"").html("<p class='text-success'>Documento cargado con exito!</p>"); 
              setTimeout(function() {
                  menuDinamico('datadjDoc');   
                  }, tiempo); 
          } 
      },    
      error: function(data){  
        $("#"+divresul+"").html("Ha ocurrido un error "+data.status);
      },
      async: true
    });
  }  