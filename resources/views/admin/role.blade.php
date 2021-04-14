<div class="row" style="padding: 2px 5px 0 2px">
    <div class="col-4">
        <table id="task" class="table table-sm table-striped table-bordered">
            <thead class="tbody-style">       
                <tr>
                    <th class="text-center">ID</th>
                    <th class="text-center">Nombre</th> 
                    <th class="text-center">Estado</th>
                    <th class="text-center">Descripción</th>
                    <th class="text-center">Rol - Menu</th>
                    {{-- <th>Rol - Usuario</th> --}}
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody  style="font-size:11px;">
                @foreach ($roles as $rol)
                    <tr>
                        <td>{{$rol->id}}</td>
                        <td>{{$rol->name}}</td>
                        <td>{{$rol->estado}}</td>
                        <td>{{$rol->description}}</td> 
                        <td class="text-center"><a href="#" class="icon-cogs btn-outline-success" title="Asociar Menus" onclick="asociarRol({{$rol->id}},'{{$rol->name}}')"></a></td> 
                        {{-- <td class="text-center"><a href="#" class="icon-cogs btn-outline-success" title="Asociar Usuario" onclick="asociarRol({{$rol->id}},'{{$rol->name}}')"></a></td>  --}}
                        <td class="text-center">
                            <a href="#" class="icon-pencil text-warning" title="Inactivar" onclick="acciones('inac')"></a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="col-8" id="divAsociar">

    </div>
    {{-- <div class="col-6">
        <div class="row p-2 bg-light">
            <div class="col-sm-3"><label>Nombre Rol <span class="text-danger">*</span></label></div>
            <div class="col-sm-4"><input type="text" class="form-control" id="rol"></div> 
        </div>       
        <div class="row p-2 bg-light">
            <div class="col-sm-2"><button class="btn btn-outline-success" onclick="crearRol()" title="Crear Rol">Guardar</button></div>
            <div class="col-sm-9" id="divResult"></div>
        </div>
    </div>     --}}
</div>

<script>
    function asociarRol(id,name){        
        let data = { id,name };
        ajaxResult('asociarRol','divAsociar',data);
    }

    // function crearRol(){
    //     $("#divResult").html('');
    //     let rol = $("#rol").val();
    //     $("#rol").removeClass('border border-danger');
    //     if(rol == "" ){
    //         $("#rol").addClass('border border-danger');
    //         $("#divResult").html("<p class='text-danger'>El campo rol es obligatorio</p>")
    //     }else{
    //         let data = {
    //             rol:rol
    //         };
    //         let resultado = ajaxResultJson('createRol', 'divResult', data);
    //     }
    // }
</script>