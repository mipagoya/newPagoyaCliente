<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">   
        <link rel="shortcut icon" href="coreui/img/favicon.png">
        <title>{{config('app.name')}}</title>
        <link href="coreui/icomoon/style.css" rel="stylesheet">
        <link href="coreui/css/bootstrap-datepicker3.css" rel="stylesheet">    
        <link href="coreui/css/style.css" rel="stylesheet">        
        <style>
            .my-error-class {color:#FF0000; }
            .my-valid-class { color:#9cbc14; } 
            /* .fondo { background-image: url("imagenes_pagoya/fondo.jpg"); }  */            
            #breadcrumb { margin: 0; padding: 0;  background-color: #DDDFEB;
                display: block;  padding:6px;}  
        </style>
    </head>
    {{-- <body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden"> --}}
        <body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden pace-done pace-done sidebar-minimized brand-minimized">        
            @include('partials.header')
        <div class="app-body">        
            @include('partials.sidebar') 
            <main class="main fondo"> 
                <ol id="breadcrumb" class="breadcrumb"  style="padding:3px;"></ol>
                <div style="display: none;" id="cargador_empresa" align="center">
                    <label style="color:#FFF; background-color:#73B9FF; text-align:center">&nbsp;&nbsp;&nbsp;Por favor espere ... &nbsp;&nbsp;&nbsp;</label>                
                    <img src="coreui/img/cargando2.gif" align="middle" alt="cargador"> &nbsp;<label style="color:#73B9FF">Realizando tarea solicitada ...</label>                
                    <br>
                    <hr style="color:#003" width="50%">
                    <br>
                </div>  
                    @yield('content') 
                    <div id="divMain"><div class="card-body center-block" id="contentAjax88"></div>  </div>   
            </main>
        </div>        
        @include('partials.footer') 
        <!-- Bootstrap and necessary plugins -->    
        <script src="coreui/js/jquery.min.js"></script>
        <script src="coreui/js/popper.min.js"></script>
        <script src="coreui/js/bootstrap.min.js"></script>
        <script src="coreui/js/pace.min.js"></script>    
        <!-- Plugins and scripts required by all views -->
        <script src="coreui/js/Chart.min.js"></script>
        <!-- GenesisUI main scripts -->    
        <script src="coreui/js/jquery.validate.js"></script>
        <script src="coreui/js/bootstrap-datepicker.js"></script>
        <script src="coreui/js/bootstrap-datepicker.es.js"></script>          
        <script src="coreui/js/bootstrap-modal-wrapper-factory.min.js"></script> 
        <script src="coreui/js/template.js"></script>
        <script src="coreui/js/global.js"></script>
    </body>
</html>