function ajaxResultJsonIni(url,divResult,data){  
    var result = '';
    $("#"+divResult+"").removeClass('alert-danger');    
    $.ajax({
        headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
        url: url,
        type: "POST",
        data: data,      
        cache: false,                
        // beforeSend: function () {
        //     $("#" + divResult + "").html($("#cargador_empresa").html());
        // },        
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

// function formCargaArchivos(url,divResult){   alert('url');
//     var miurl = url;
//     var formu=$(this);
//     var nombreform= 'form';
    
//     var formData = new FormData($("#"+nombreform+"")[0]);
    
//     //console.log(formData);
//     // $.ajax({
//     //   url: miurl,  
//     //   type: 'POST',
//     //   //datos del formulario
//     //   data: formData,
//     //   cache: false,
//     //   contentType: false,
//     //   processData: false,    
//     // //   beforeSend: function(){
//     // //     $("#"+divresul+"").html($("#cargador_empresa").html());                
//     // //   },
      
//     //   success: function(data){             
//     //     $("#"+divResult+"").html(data);        
//     //    // $( "#btn-carga" ).prop( "disabled", true );        
//     //   },
//     //   //si ha ocurrido un error
//     //   error: function(data){        
//     //     $("#"+divResult+"").addClass('alert-danger');
//     //     $("#"+divResult+"").html("Ha ocurrido un error "+data.status);
                  
//     //   },
//     //   async: true
//     // });
//   }

// function ajaxResult22(url,divResult,data){  
//     var result = '';
  
//     $.ajax({
//         headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
//         url: url,
//         type: "POST",
//         data: data,      
//         cache: false,                
//         // beforeSend: function () {
//         //     $("#" + divResult + "").html($("#cargador_empresa").html());
//         // },        
//         success: function (data) {            
//                 $("#" + divResult + "").html(data); 
//                 result = data;                      
//         },
//         error: function (data) {                        
//             $("#"+divResult+"").addClass('alert-danger');
//             $("#"+divResult+"").html("Ha ocurrido un error "+data.status); 
//             result = data.status;           
//         },  
//         async:false    
//     });      
//     return result;
// }

