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
                            <form class="form-horizontal" role="form" method="POST" action="{{ url('updateRol') }}">
                                {{ csrf_field() }}
                                <input type="hidden" name="idUser" id="idUser" value="{{$user->id}}"/>
                                <div class="form-group">
                                    <label for="name" class="col-md-4 control-label">Nombre Usuario</label>
        
                                    <div class="col-md-6">
                                        <input id="name" type="text" class="form-control" name="name" value="{{ $user->name }}" readonly>
                                        @if ($errors->has('name'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('name') }}</strong>
                                        </span>
                                        @endif
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="name" class="col-md-4 control-label">Correo Usuario</label>
        
                                    <div class="col-md-6">
                                        <input id="name" type="text" class="form-control" name="name" value="{{ $user->email }}" readonly>
                                        @if ($errors->has('email'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('email') }}</strong>
                                        </span>
                                        @endif
                                    </div>
                                </div>
                                <br>
                                  <div class="form-group">
                                    <label for="name" class="col-md-4 control-label">Asociar Roles</label>
                                    <div class="col-md-6">  
                                        @foreach($roles as $rol)
                                        <div class="input-group">
                                            <?php
                                            $rolesUserCheck = DB::table('tbl_GLOBAL_USER_ROL')
                                                    ->where ('id_rol','=',$rol->id)
                                                    ->where('id_user','=',$user->id)
                                                    ->get();
                                            $count= count($rolesUserCheck);
                                            ?>
                                            @if($count > 0)
                                             <span class="input-group-addon">
                                                <input type="checkbox" id="{{$rol->id}}" name="{{$rol->id}}" onclick="inserRolUser(this.id)" checked/>
                                            </span>
                                            @else
                                             <span class="input-group-addon">
                                                <input type="checkbox" id="{{$rol->id}}" name="{{$rol->id}}" onclick="inserRolUser(this.id)"/>
                                            </span>
                                            @endif
                                            <input type="button" class="btn btn-info" value="{{$rol->name}}">
                                        </div>
                                        <hr>                                  
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
    
    function inserRolUser(idRol)
    {
        var idRol = idRol;        
        var idUser = document.getElementById('idUser').value;

        var url = 'updateUserRol';
    
              $.ajax({
                    headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
                    type: "POST",
                    url: url,
                    data:{
                        idR: idRol,
                        idU: idUser
                    },
                    success: function(datos){
                       // alert(datos);
                        //Redireccionar al Loguin
                        //location.href="{{ url('/') }}";
                    }
                });
        }

</script>