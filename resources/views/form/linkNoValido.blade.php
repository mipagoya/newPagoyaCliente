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
    .fondo{ background-color: #021d24;}   
  </style>
</head>
<body style="background-color: #fff">
    <header class="navbar fondo">
        <img src="imagenes_pagoya/logo.jpg">
        {{-- <div>
          <a href="{{('login')}}" class="btn btn-outline-info">Iniciar Sesión</a>
          <a href="{{('register')}}" class="btn btn-outline-success">Registrarse</a>
        </div> --}}
    </header> 
  
    <div class="container mt-5">
        <div class="row justify-content-center ">
            <div class="mt-5">
                <img src="{{'imagenes_pagoya/logo.png'}}" alt="">
            </div>
            <div class="col-lg-12 mt-5">
                <h2 class="text-center mt-5">
                    PAGINA NO ENCONTRADA | 404
                </h2>
                <h4 class="text-center mt-5">
                    Hmmm!
                    No encontramos lo que buscabas...
                </h4>
            </div>
        </div>
    </div>




</body>
</html>