<div class="container-fluid">    
    <div class="card">
    <div class="card-header">
        <i class="fa fa-align-justify"></i> Relacionar Roles y Menus
    </div>
    <div class="card-body center-block"> 
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">                    
                    <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="updateRol">
                            {{ csrf_field() }}
                            <input type="hidden" name="idRol1" id="idRol1" value="{{$rol->id}}"/>
                            <div class="form-group">
                                <label for="name" class="col-md-4 control-label">Nombre Rol</label>
    
                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" name="name" value="{{ $rol->name }}" readonly>
    
                                    @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>
    
                                <div class="form-group">
                                <label for="name" class="col-md-4 control-label">Asociar Menus</label>
                                <div class="col-md-6">                                
                                    @foreach ($applications as $key => $app)
                                    <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo_{{$key}}">{{$app->name}}</button>  <hr>                                  
                                    
                                    <div id="demo_{{$key}}" class="collapse">
                                    
                                    <?php 
                                    // dd($app->id);
                                    $menus = DB::table('tbl_GLOBAL_MODULE as mo')
                                    ->join('tbl_GLOBAL_SUB_MODULE as sub','mo.id','=','sub.id_module')
                                    ->join('tbl_global_menu as menu','sub.id','=','menu.id_sub_module')
                                    ->select(DB::raw('mo.name as modulo,mo.id_application,sub.name as subModulo, menu.id as idMenu, menu.name as menu')) 
                                    ->where('mo.id_application','=',$app->id)
                                    ->where('menu.estado', '=', 1)
                                    ->OrderBy('mo.name','ASC')
                                    ->OrderBy('sub.name','ASC')
                                    ->OrderBy('menu.name','ASC')
                                    ->get();
                                    //->toArray(); 
                                    
                                    
                                    $modulo='';
                                    $submodulo='';
                                    $menu ='';
                                    //   dd($menus);
                                    foreach ($menus as $resultado){
                                        if ($modulo != $resultado->modulo){
                                            echo '<div><label style="text-shadow:0px 0px 0px #000;"><strong>'.$resultado->modulo.'<strong></label>';
                                                foreach ($menus as $result_mod){
                                                    if($resultado->modulo == $result_mod->modulo){
                                                    $validaCheck = DB::table('tbl_global_rol_MENU')
                                                                    ->where('id_rol','=',$rol->id)
                                                                    ->where('id_menu','=',$result_mod->idMenu)
                                                                    ->get();
                                                    $count = count($validaCheck);
                                                        //echo $count;
                                                        
                                                        if($count >0){
                                                            ?>
                                                                <label class="container">{{$result_mod->menu}}                                        
                                                                    <input type="checkbox" checked  name="{{$result_mod->menu}}" id="{{$result_mod->idMenu}}"  onclick="insertMenu(this.id,{{$result_mod->id_application}})" >  
                                                                </label>
                                                            <?php
                                                            }else{ ?>
                                                                <label class="container">{{$result_mod->menu}}
                                                                    <input type="checkbox"  name="{{$result_mod->menu}}" id="{{$result_mod->idMenu}}"  onclick="insertMenu(this.id,{{$result_mod->id_application}})" >  
                                                                </label>
                                                            <?php }
                                                        }
                                                }
                                                echo '</div><hr>';
                                            }                                    
                                        $modulo = $resultado->modulo;
                                    }
                                    
                                    ?>
                                    </div>
                                    @endforeach
    
                                </div>
                            </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>            
</div>
<script type="text/javascript">
    
    function insertMenu(idMenu,idApp)
    {
        var idMenu = idMenu;
        var idApp = idApp;
        var idRol = document.getElementById('idRol1').value;

        var url = 'updateMenuRol';
    
              $.ajax({
                    headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
                    type: "POST",
                    url: url,
                    data:{
                        idM: idMenu,
                        idA: idApp,
                        idR: idRol
                    },
                    success: function(datos){
                       // alert(datos);
                        //Redireccionar al Loguin
                        //location.href="{{ url('/') }}";
                    }
                });
        }

</script>            