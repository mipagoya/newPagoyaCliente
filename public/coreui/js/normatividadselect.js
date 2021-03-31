
    

    function change_funcitons(){
        cargar_list_Ente();
    }

    // ------ LLenar Campos list (Ente, Tipo Documento, Modalidad); ------- //
    // Campo ENTE
    function cargar_list_Ente(){
        clear_TDoc();
        $.ajax({
            headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
            url: "EnteNiveles",
            type: "post",
            cache: false,        
            success: function (datos) {
                //console.log(datos);
                $.each(datos, function(key, value) {
                    $("[name='Inente']").append('<option value='+$.trim(value.id_ente)+'>'+$.trim(value.ente)+'</option>');
                });
            },
            async: false
        });
    }

    // Evento Change para ENTE
    $("[name='Inente']").on("change", function(){
        cargar_TipDoc($(this).val());
    });

    // Evento Change para TIPO DOCUMENTO
    $("[name='Intipodocu']").on("change", function(){
        cargar_Modalidad($(this).val());
    });
    
    // Campo ENTE
    function cargar_TipDoc(ente_selected){
        clear_TDoc();
        $.ajax({
            headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
            url: "NivelesNorma",
            type: "post",
            data: { ente_selected : ente_selected },
            success: function (datos_TipDoc) {
                if(datos_TipDoc == ""){
                    alert("No existe Tipo de Documento asociado");
                    clear_TDoc();
                }else{
                    //console.log(datos_TipDoc);
                    $.each(datos_TipDoc, function(key, value_TipDoc) {
                        $("[name='Intipodocu']").append('<option value='+$.trim(value_TipDoc.id_tipo_doc)+'>'+$.trim(value_TipDoc.tipo_documento)+'</option>');
                    });
                }
            },
            async: false // Detiene la funcion hasta que genere la RTA
        });
    }

    function cargar_Modalidad(id_TipoDoc_selected){
        clear_Modalidad();
        $.ajax({
            headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
            url: "NivelesModalidad",
            type: "post",
            data: { id_ente_selected: $("#Inente").find("option:selected").val(), 
                    id_TipoDoc_selected : id_TipoDoc_selected },
            cache: false,        
            success: function (datos_Modalidad) {
                //console.log(datos_Modalidad);
                $.each(datos_Modalidad, function(key, value_Modalidad) {
                    $("[name='Inmodalidad']").append('<option value='+$.trim(value_Modalidad.id_modalidad)+'>'+$.trim(value_Modalidad.modalidad)+'</option>');
                });
            },
            async: false
        });
    }

    // Funcion para SETEAR TODOS LOS CAMPOS LIST
    function clear_Ente(){ 
        $('#Inente option').remove();
        $("#Inente").append('<option value="0">SELECCIONAR...</option>');
    }

    // Funcion para SETEAR CAMPO TIPO DOCUMENTO
    function clear_TDoc(){ 
        $('[name="Intipodocu"] option').remove();
        $('[name="Intipodocu"]').append('<option value="0">SELECCIONAR...</option>');
        clear_Modalidad();
    }

    // Funcion para SETEAR CAMPO MODALIDAD
    function clear_Modalidad(){
        $('#Inmodalidad option').remove();
        $("#Inmodalidad").append('<option value="0">SELECCIONAR...</option>');
    }

    $('[name="datetimepicker2"]').datepicker({
        language: 'es',
        format: "yyyy-mm-dd",
        autoclose: true
    });
    
    $('[name="datetimepicker3"]').datepicker({
        language: 'es',
        format: "yyyy-mm-dd",
        autoclose: true
    });

    $('[name="datetimepicker4"]').datepicker({
        language: 'es',
        format: "yyyy-mm-dd",
        autoclose: true
    });

    // HTML
    //*$('#observnorma').wysihtml5({
    $('#observnorma').wysihtml5({
        "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
        "emphasis": true, //Italics, bold, etc. Default true
        "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
        "html": true, //Button which allows you to edit the generated HTML. Default false
        "link": true, //Button to insert a link. Default true
        "image": true, //Button to insert an image. Default true,
        "color": true, //Button to change color of font  
        "locale": "es-ES"
    });