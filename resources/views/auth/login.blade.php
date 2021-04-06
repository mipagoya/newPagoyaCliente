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
      #div2 {
        background-image: url("imagenes_pagoya/carrito.JPG");        
        width:340px;
        height:310px;        
      }
      #div1 {
        width:340px;
        height:310px;        
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
        <strong class="text-white text-center" id="texto">Inicie sesión en el panel de administración</strong>
      </div>
    </div>
  <div class="container p-1">
    <div class="row justify-content-center" id="form-sesion">
      <div class="col-md-7">
        <div class="card-group" id="divPrincipal">
          <div class="card p-3" id="div1">
              <form class="form-horizontal was-validated" method="POST" action="/login">
                {{ csrf_field() }}
                    <div class="card-body">
                        <div class="form-group mb-3 {{ $errors->has ('email' ? 'is-invalid' : '' ) }}">
                            <span class="input-group-addon"><i class="icon-user"></i></span>
                            <input type="email" name="email" id="email" class="form-control" placeholder="Correo" value="{{ old('email') }}" >    
                            {!! $errors->first('email', '<span class="invalid-feedback">:message</span>') !!}
                        </div>
                        <div class="form-group mb-4 {{ $errors->has('password' ? 'is-invalid' : '' ) }}">
                            <span class="input-group-addon"><i class="icon-lock"></i></span>
                            <input type="password" name="password" id="password" class="form-control" placeholder="Contraseña">
                            {!! $errors->first('password', '<span class="invalid-feedback">:message</span>') !!}
                        </div>
                        <div class="row">
                            <div class="col-6"><button type="submit" class="btn btn-success px-4"><strong>Acceder</strong></button></div>                            
                        </div>
                        <div class="row">                        
                            <div class="col-6 text-right"><button type="button" class="btn btn-link px-0 text-primary">Olvidaste tu contraseña?</button></div>
                        </div> 
                    </div>
              </form>
          </div>          
          <div class="card p-4"  id="div2"  style="padding:0px;margin: 0px;"></div>
        </div>
      </div>
    </div>   
  </div>
  <script src="coreui/js/jquery.min.js"></script>
  <script src="coreui/js/popper.min.js"></script>
  <script src="coreui/js/bootstrap.min.js"></script>
</body>
</html>