<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{ config('app.name') }}</title>
  <!-- Icons -->
  <link href="coreui/css/font-awesome.min.css" rel="stylesheet">
  <link href="coreui/css/simple-line-icons.min.css" rel="stylesheet">
  <!-- Main styles for this application -->
  <link href="coreui/css/style.css" rel="stylesheet">
  <style>
      .fondo{
        background-color: #021d24;
      }     
      #div1 {
        background-image: url("imagenes_pagoya/registroTj.JPG");        
        width:40px;
        height:450px; 
        background-color: #021d24;       
        margin: 0;
        padding: 0;       
      }
      #div2 {
        width:340px;
        height:450px;   
        background-color: #CED3CF;   
        /* color: #fff  */
      }      
  </style>
</head>
<body style="background-color: #fff">
    <header class="navbar fondo">
        <img src="imagenes_pagoya/logo.jpg">
        <div>
          <a href="{{('login')}}" class="btn btn-outline-info">Iniciar Sesión</a>
          <a href="{{('register')}}" class="btn btn-outline-success">Registrarse</a>
        </div>
    </header> 
    <div class="row justify-content-center p-1">
      <div class="col-sm-3 fondo p-3 justify-content-center " style="text-align:center">
        <strong class="text-white text-center" id="texto">Regístrese gratis en su pasarela de pagoya</strong>
      </div>
    </div>
  <div class="container p-1"> {{ csrf_field() }} 
    <div class="row justify-content-center" id="form-sesion">
      <div class="col-md-8">
        <div class="card-group" id="divPrincipal" style="background-color:#CED3CF">
          <div class="card p-3" id="div1" style="border: none"></div>    

            <div class="card p-3 "  id="div2"  style="padding:0px;margin: 0px; border: none">
                
                <div class="card-body" style="background-color:#CED3CF">
                    <div class="row">
                      <div class="col-sm-3"> <label>Nombres<strong class="p-2 text-danger">*</strong></label></div>
                      <div class="col-sm-9"> <input type="text" class="form-control requerido" id="nombre"></div>                       
                    </div>
                    <div class="row">
                      <div class="col-sm-3"> <label>Apellidos<strong class="p-2 text-danger">*</strong></label></div>
                      <div class="col-sm-9"> <input type="text" class="form-control requerido" id="apellido"></div>                       
                    </div>
                    <div class="row">
                      <div class="col-sm-3"> <label>Tipo Documento<strong class="p-1 text-danger">*</strong></label></div>
                      <div class="col-sm-9"> 
                        <select class="form-control requerido2" id="tipoDoc">
                            <option id='1'value="1">Cédula Ciudananía</option>
                            <option id='2'value="2">Cédula Extrangería</option>                           
                            <option id='3'value="3">NIT</option>
                        </select>
                      </div>                       
                    </div>
                    <div class="row">
                      <div class="col-sm-3"><label>Número Documento<strong class="p-1 text-danger">*</strong></label></div>
                      <div class="col-sm-9"><input type="number" class="form-control requerido" id="numDoc"></div>                       
                    </div>                    
                    <div class="row">
                      <div class="col-sm-3"><label>Número Teléfono<strong class="p-1 text-danger">*</strong></label></div>
                      <div class="col-sm-9"><input type="text" class="form-control requerido" id="telefono"></div>                       
                    </div>
                    <div class="row">
                        <div class="col-sm-3"><label>Código País<strong class="p-1 text-danger">*</strong></label></div>
                        <div class="col-sm-9"> 
                          <select class="form-control requerido2" id="codPais">
                              <option id="57" value="57">(57) Colombia</option>                              
                          </select>
                        </div>                       
                    </div>
                    <div class="row">
                        <div class="col-sm-3"> <label>Correo Electronico<strong class="p-1 text-danger">*</strong></label></div>
                        <div class="col-sm-9"> <input type="email" class="form-control requerido" id="correo" onblur="validaEmail()"></div>                       
                    </div>
                    <div class="row">
                        <div class="col-sm-3"> <label>Contraseña<strong class="p-1 text-danger">*</strong></label></div>
                        <div class="col-sm-9"> <input type="password" class="form-control requerido" id="contrasena" onblur="validaPass()"></div>                       
                    </div>
                    <div class="row">
                        <div class="col-sm-3"> <label>Confirmar Contraseña<strong class="p-1 text-danger">*</strong></label></div>
                        <div class="col-sm-9"> <input type="password" class="form-control requerido" id="contrasena2" onblur="comparePass()"></div>                       
                    </div> 
                    <div id="divRest"></div>              
                </div>
            </div>
        </div>
        <div id="3">
            <div class="row p-1">     
                <div class="col-sm-1"> </div>                  
                <div class="col-sm-11" id="checkTerminos"> 
                    <input name="group" type="checkbox" id="terminos" class="requerido2">        
                    <small>Al registrarme, declaro que he leído y acepto los <a href="https://mipagoya.com/wp/wp-content/uploads/2020/03/Pol%c3%adticas-Pasarela-Agregadora.pdf">Términos y Condiciones</a>
                        y <a href="https://mipagoya.com/wp/wp-content/uploads/2020/03/5-Poli%cc%81tica-de-Tratamiento-de-Datos-Personales-Colombia.pdf">la Política de Privacidad</a> y <a href="https://mipagoya.com/wp/wp-content/uploads/2020/03/5-Poli%cc%81tica-de-Tratamiento-de-Datos-Personales-Colombia.pdf">Tratamientos de datos*</a></small>               
                </div>                       
            </div>
            <div class="row">
                <div class="col-sm-5"> <label for=""></label></div>
                <div class="col-sm-6"> <button class="btn btn-success" onclick="crearCuenta()">Crear Cuenta</button>
                    </div>                       
            </div>
        </div>
      </div>
    </div>
  </div>
  <script src="coreui/js/jquery.min.js"></script>
  <script src="coreui/js/popper.min.js"></script>
  <script src="coreui/js/bootstrap.min.js"></script>
  <script src="coreui/js/funtionInitial.js"></script>

  <script>

    function validaPass(){
       
        let valor = $("#contrasena").val();
        var expreg = new RegExp(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/);
        
        if(expreg.test(valor)){
            $("#divRest").html('');
            $("#contrasena").removeClass('border border-danger');
            return 0;
        }else{
            $("#contrasena").addClass('border border-danger');  
            $("#divRest").html('<p class="text-danger">La contraseña debe contener 8 caracteres como mínimo alfanumérico y caracteres especiales</p>');
            return 1;
        }
    }
    
    function comparePass(){
      
        let contrasena = $("#contrasena").val();
        let contrasena2 = $("#contrasena2").val();
        
        if(contrasena !== contrasena2){
            $("#divRest").html('<p class="text-danger">Las contraseñas no coinciden por favor validar</p>');
            $("#contrasena2").addClass('border border-danger');
            return 1;
        }    
        $("#contrasena2").removeClass('border border-danger');       
        return 0;
    }

    function validaEmail(){        
        $("#correo").removeClass('border border-danger'); 
        let correo = $("#correo").val();
        var expreg = new RegExp(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
        if(expreg.test(correo)){
            let data = {correo:correo};
            let result = ajaxResultJsonIni('validaMail','divRest',data);
            
               if(result == 1){
                $("#correo").addClass('border border-danger');  
                $("#divRest").html('<p class="text-danger">El correo '+correo+', ya se encuentra registrado. Favor validar!! </p>');
                return 1;
               }
           return 0;
        }else{
            $("#correo").addClass('border border-danger');   
            $("#divRest").html('<p class="text-danger">Formato de correo no valido, favor validar</p>');
            return 1;
        }
    }

    function crearCuenta(){

        let validaCorreo = validaEmail();

        if(validaCorreo === 1){
            validaEmail();
            return 0;
        }

        let validaContrasena = validaPass();
        if(validaContrasena ===0){
            let comparePassword = comparePass();
            if(comparePassword === 0){
                let divRest = $("#divRest").html('');
                let obligatorio = 0;
    
                $(".requerido").each(function(){
                    let id = this.id;
                    $("#"+id+"").removeClass('border border-danger');                    
                    //validar campos tipo select Cod Pais
                
                    if($("#"+id+"").val().trim() ===""){ 
                        $("#"+id+"").addClass('border border-danger');
                        $("#divRest").html('<strong class="text-danger">Los campos marcados con * son obligatorios</strong>');
                        obligatorio++;
                    }
                });    

                if($("#terminos").prop('checked')){
                    $("#checkTerminos").removeClass('border border-danger');
                    check = 0;
                }else{       
                    $("#checkTerminos").addClass('border border-danger');
                    $("#divRest").html('<strong class="text-danger">Los campos marcados con * son obligatorios</strong>');
                    check = 1;
                }


                if(obligatorio ===0 && check ===0){
                    let nombre = $("#nombre").val();
                    let apellido = $("#apellido").val();    
                    let tipoDoc = $("#tipoDoc option:selected").attr('id');
                    let numDoc = $("#numDoc").val();
                    let telefono = $("#telefono").val();
                    let codPais = $("#codPais option:selected").attr('id');
                    let correo = $("#correo").val();
                    let contrasena = $("#contrasena").val();
                    //let contrasena2 = $("#contrasena2").val();
                    

                    let data = {
                        nombre:nombre,
                        apellido:apellido,
                        tipoDoc:tipoDoc,
                        numDoc:numDoc,
                        telefono:telefono,
                        codPais:codPais,
                        correo:correo,
                        contrasena:contrasena                        
                    };
                        console.log(data);
                        let result = ajaxResultJsonIni('saveRegister','divRest',data);

                        if(result==200){
                            $("#divRest").html('<strong class="text-success">Usuario '+correo+' creado con exito!</strong>');
                            $("#texto").html('<strong class="text-success">Se envio una notificacion al correo '+correo+' favor realizar la activación de la cuenta</strong>');
                            setTimeout(function() {
                                location.reload();   
			                }, 6000);
                              
                        }
                }
            }else{  comparePass(); }
        }else{validaPass();}    
    }
  </script>

</body>
</html>