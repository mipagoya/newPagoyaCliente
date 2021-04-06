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
      .fondo2{
        background-color: #CED3CF;
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
      <div class="col-sm-3 p-3 justify-content-center fondo" style="text-align:center">
        <strong class="text-white text-center" id="texto">{{$text}}</strong>
            <div class="p-5">
                <a href="{{('login')}}" class="btn btn-outline-info">Iniciar Sesión</a>
            </div>
      </div>
     
    </div>
  <script src="coreui/js/jquery.min.js"></script>
  <script src="coreui/js/popper.min.js"></script>
  <script src="coreui/js/bootstrap.min.js"></script>
</body>
</html>