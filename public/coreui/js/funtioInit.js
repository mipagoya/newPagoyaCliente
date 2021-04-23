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
