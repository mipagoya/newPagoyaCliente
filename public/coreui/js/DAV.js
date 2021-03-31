
function cargarpldav(arg){
    if(arg=='1'){ var url = "formenvioDAV"; var divresul="formenvio"; }
    if(arg=='2'){ var url = "ListaDAV"; var divresul="DivListaDAV";  }
    $("#"+divresul+"").html($("#cargador_empresa").html());
      $.get(url,function(resul){
        $("#"+divresul+"").html(resul);
      })
  }

  // Autocomplete Nombre Cliente
  $('#nombCliente').keyup(function(){
    numc = $('#nombCliente').val().length;
    token = $('#_token').val();
    if (numc>=3){
      $('#nombCliente').typeahead({
        source:  function (query, result) {
          $.ajax({
            url: 'autocompleteClienteDav',
            method:"POST",
            data:{query:query, _token: token },
            //dataType:"json",
            success:function(data){
              console.log(data);
              result($.map(data, function(item){
                Nombre = "-"+item['Nombre'];
                ID = item['CLIIDXXX'];
                Cadena = ID.concat(Nombre);
                return Cadena;
              }));
            }
          })
        }
      })
    }
  });

  // Autocomplete Proveedor
  $('#nombProvee').keyup(function(){
    numc = $('#nombProvee').val().length;
    token = $('#_token').val();
    if (numc>=3){
      $('#nombProvee').typeahead({
        source:  function (query, result) {
          $.ajax({
                url: 'autocompleteProveedorDav',
                method:"POST",
                data:{query:query, _token: token },
                dataType:"json",
                success:function(data){
                  result($.map(data, function(item){
                    Nombre = "-"+item['Nombre'];
                    ID = item['PIEIDXXX'];
                    Cadena = ID.concat(Nombre);
                    return Cadena;
                  }));
                }
            })
        }
      })
    }
  });

  // Enviar correo con formulario
  $("#bEnviar").click(function(){
    //idCliente = document.getElementById("idCliente").value;
    InombCliente = document.getElementById("nombCliente").value;
    InombProvee = document.getElementById("nombProvee").value;
    correoe = $("#correoe").val();
    Iuser = $("#Iuser").val();
    _token = $("#_token").val();
    if (nombProvee != "") {
      $("#msg").html($("#cargador_empresa").html());
        $.post("envioCorreoClienteDAV", { InombCliente: InombCliente,  InombProvee: InombProvee, Correoe: correoe, _token: _token, Iuser: Iuser}, function(mensaje) {
          $("#msg").html(mensaje);
      }); 
    }
  });

  $('#inputBusqueda').keyup(function(){
    var url = 'autocompleteClienteDav';
    numc = $('#inputBusqueda').val().length;
    token = $('#_token').val();
      if (numc>=3){
        $('#inputBusqueda').typeahead({
          source:  function (query, result) {
            $.ajax({
              url:url,
              method:"POST",
              data:{query:query, _token: token },
              dataType:"json",
              success:function(data){
                result($.map(data, function(item){
                  Nombre = "-"+item['Nombre'];
                  ID = item['CLIIDXXX'];
                  Cadena = ID.concat(Nombre);
                  return Cadena;
                }));
              }
            })
          }
        })
      }
  });

  
  $("#buscarList").click(function(){
    //idCliente = document.getElementById("idCliente").value;
    inputBusqueda = document.getElementById("inputBusqueda").value;    
    _token = $("#_token").val();
    if(inputBusqueda != ''){
      $.post("consultCliDav", { inputBusqueda: inputBusqueda,  _token: _token}, function(mensaje) {
        $("#grillabusqueda").html(mensaje);
      }); 
    }
  });

  // Consultar archivo Adjunto
  function verAdjuntoDAV(url,idRow){
    $.ajax({
      headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
      url: url,
      type: 'POST',
      data: {idRow: idRow},
      success: function (datos){
        var Nit_Cliente = $.trim(datos[0]);
        var nameArchivo = $.trim(datos[1]);
        //Validar si hay archivo cargado:
        if( nameArchivo != ""){
          $("#adjunto_dav_modal").modal("show");
          var url = "archivos_pdfdav/"+Nit_Cliente+"/"+nameArchivo;
          // Cargar imagen dentro de modal
          $("#body_adjunto_dav").html("<embed src='"+url+"' "+
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
