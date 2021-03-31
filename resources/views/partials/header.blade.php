@include('auth.changerol')
<header class="app-header navbar">
        <input type='hidden' id='rol_id' value='{{ Auth::user()->role_id }}'>
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none mr-auto" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="nav navbar-nav d-md-down-none">
            <li class="nav-item px-3">
                <a class="nav-link" href="#">

                    @if(config('database.default') =='test_sqlsrv')
                        <h6 style='color:red;'>Conectado a TEST</h6>                   
                    @endif 

                </a>
            </li>
            
        </ul>
        <ul class="nav navbar-nav ml-auto">
            <li class="nav-item d-md-down-none">
                <!--    NOTIFICACIONES
                    <a class="nav-link" href="#" data-toggle="dropdown">
                    <i class="icon-bell"></i>
                    <span class="badge badge-pill badge-danger">5</span>
                </a>-->
                <div class="dropdown-menu dropdown-menu-right">
                    <div class="dropdown-header text-center">
                        <strong>Notificaciones</strong>
                    </div>
                    <a class="dropdown-item" href="#">
                        <i class="fa fa-envelope-o"></i> Ingresos
                        <span class="badge badge-success">3</span>
                    </a>
                    <a class="dropdown-item" href="#">
                        <i class="fa fa-tasks"></i> Ventas
                        <span class="badge badge-danger">2</span>
                    </a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    <i class="icon-user"></i>
                    <span class="d-md-down-none"> {{ auth()->user()->name}} </span>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <div class="dropdown-header text-center">
                        <strong>Cuenta</strong>
                    </div>                    
                    <!-- <a class="dropdown-item" href="#"><i class="fa fa-user"></i> Perfil</a> -->

                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#modalchangerol"><i class="fa fa-group"></i> Cambiar Rol</a>
                    <a class="dropdown-item" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" href="#"><i class="fa fa-lock"></i> Cerrar sesión</a>
                    <form id="logout-form" action="/logout" method="POST" style="display:none;">
                        {{ csrf_field() }}
                    </form>
                </div>
            </li>
        </ul>
    </header>