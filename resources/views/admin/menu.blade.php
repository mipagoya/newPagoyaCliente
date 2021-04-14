<div class="row" style="padding: 2px 5px 0 2px">
    <div class="col-6">
        <table id="task" class="table table-sm table-striped table-bordered">
            <thead class="tbody-style">             
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>                    
                    <th>Ruta</th>
                    <th>Sub Modulo</th>
                    <th>Estado</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody  style="font-size:11px;">
                @foreach ($listMenu as $menu)
                    <tr>
                        <td>{{$menu->id}}</td>
                        <td>{{$menu->name}}</td>
                        <td>{{$menu->ruta}}</td>
                        <td>{{$menu->subMod}}</td>
                        <td>{{$menu->estado}}</td>
                        <td>
                            <a href="#" class="icon-pencil text-warning" title="Editar" onclick="acciones('edit')"></a>                            
                        </td>
                        <td>
                            <a href="#" class="icon-cross text-danger" title="Inactivar" onclick="acciones('inac')"></a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="col-6">
        <div class="row p-2 bg-light">
            <div class="col-sm-2"><label>Nombre</label></div>
            <div class="col-sm-4"><input type="text" class="form-control" id="nombre"></div>
            <div class="col-sm-2"><label>Ruta</label></div>
            <div class="col-sm-4"><input type="text" class="form-control" id="ruta"></div>
        </div>
        <div class="row p-2 bg-light">
            <div class="col-sm-2"><label>Sub Modulo</label></div>
            <div class="col-sm-4">
                <select class="form-control" id="subModulo" title="Seleccione sub modulo">
                    <option value="">Seleccione sub modulo</option>
                    @foreach ($subModule as $sub)
                        <option value="{{$sub->id}}">{{$sub->name}}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-sm-2"><button class="btn btn-outline-success" onclick="crearMenu()">Guardar</button></div>
            <div class="col-sm-4"></div>
        </div>
        <div class="row p-2">
            <div id="divResult"></div>
        </div>
    </div>    
</div>
<script>
    function acciones(accion){
        let data = {accion};
        let resultado = ajaxResultJson('accionMenu', 'divResult', data);
    }
    function crearMenu(){
        let obligatorio = 0;
        $(".form-control").removeClass('border border-danger');
        $("#divResult").html('');
        $(".form-control").each(function(){
            let id = this.id;
            let campo = $("#"+id+"").val();
            if(campo == ""){                
                $("#"+id+"").addClass('border border-danger');
                $("#divResult").html('<p class="text-danger">Hay campos en blanco</p>');
                obligatorio++;
            }
        });
        if(obligatorio == 0){
            let data = {
                name:$("#nombre").val(),
                ruta:$("#ruta").val(),
                subModulo:$("#subModulo option:selected").val(),
            }            
            let resultado = ajaxResultJson('createMenu', 'divResult', data);
            if(resultado =='nombre'){
                $("#divResult").html('<p class="text-danger">El nombre de menu ya existe, para el submodulo</p>');
            }else if(resultado =='ruta'){
                $("#divResult").html('<p class="text-danger">La ruta ya existe favor validar.</p>');
            }else if(resultado==200){
                $("#divResult").html('<p class="text-success">Menu creado con exito.</p>');
                setTimeout(function(){
                    menuDinamico('listMenus');
                },2000);
            }
        }
    }
</script>