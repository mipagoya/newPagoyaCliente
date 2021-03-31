<link rel="stylesheet" type="text/css" href="coreui/css/modales-estilos.css" media="screen" />

<div id="modalchangerol" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header modal-header-info">
                <button type="button" class="close" data-dismiss='modal'>
                    <span>&times;</span>
                </button>
                <h2><strong>Elegir Rol</strong></h2>
            </div>
            <div class="modal-body">
                @if (Auth::guest())
                    &nbsp;
                @else
                <?php
                    $id_rol =  Auth::user()->role_id;
                    $id_user = Auth::user()->id;
                    $get_rol = DB::table('tbl_global_user_rol AS UROL')
                        ->join('tbl_global_rol AS ROL', 'UROL.id_rol', '=', 'ROL.id')
                        ->join('users AS US', 'UROL.id_user', '=', 'US.id')
                        ->select(DB::raw('ROL.id as id_rol, ROL.name AS name_rol '))
                        ->where('UROL.id_user', '=', $id_user)
                        ->where('ROL.estado', '=', "1")
                        ->OrderBy('ROL.name', 'ASC')
                        //->toSql();
                        ->get()
                        ->toArray();
                    $rol_users ="";
                    foreach($get_rol as $rol){
                        if($id_rol == $rol->id_rol){
                            $rol_users.= "<input type='radio' name='rdio_rol' class='rol' id=".$rol->id_rol." checked='checked'> ".$rol->name_rol."</input><br>";
                        }else{
                            $rol_users.= "<input type='radio' name='rdio_rol' class='rol' id=".$rol->id_rol."> ".$rol->name_rol."</input><br>";
                        }
                    }
                    echo $rol_users;
                ?>
                @endif
            </div>
            <div class="modal-footer">
                <input type="button" class="btn btn-primary rol_close  modal-close" value='Aceptar'></input>
            </div>
        </div>
    </div>
</div>

<script src="js/jquery.min.js" type="text/javascript"></script>
<script  type="text/javascript">
    $(".rol_close").on("click", function(){
        var rol_selected = $(".rol:checked").attr("id");
        // Comparar si el rol seleccionado es DIFERENTE al que ya tenia
        if( rol_selected != $("#rol_id").val() ){
            $.ajax({
                headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
                type: "POST",
                url: "updaterol",
                data:{
                    idrol: rol_selected
                },
                success: function(datos){
                    location.href="{{ url('/') }}";
                }
            });
        }
        //Cerrar ventana Modal
        $('#modalchangerol').modal('hide');
    });
</script>
