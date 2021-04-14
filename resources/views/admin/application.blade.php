<div class="row" style="padding: 2px 5px 0 2px">
    <div class="col-4">
        <table id="task" class="table table-sm table-striped table-bordered">
            <thead class="tbody-style">            
                <tr>
                    <th>ID</th>
                    <th>Nombre</th> 
                    <th>Estado</th>
                    <th>Style</th>
                    <th></th>
                </tr>
            </thead>
            <tbody  style="font-size:11px;">
                @foreach ($applications as $app)
                    <tr>
                        <td>{{$app->id}}</td>
                        <td>{{$app->name}}</td>
                        <td>{{$app->estado}}</td>
                        <td>{{$app->style}}</td> 
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
            <div class="col-sm-2"><label>Aplicación<span class="text-danger">*</span></label></div>
            <div class="col-sm-4"><input type="text" class="form-control" id="aplicacion"></div>  
            <div class="col-sm-2"><label>Style <span class="text-danger">*</span></label></div>       
            <div class="col-sm-4"><input type="text" class="form-control" id="style"></div> 
        </div>
        <div class="row p-2 bg-light">
            <div class="col-sm-2"><label>Módulo <span class="text-danger">*</span></label></div>
            <div class="col-sm-4"><input type="text" class="form-control" id="modulo"></div>  
            <div class="col-sm-2"><label>Sub Módulo <span class="text-danger">*</span></label></div>
            <div class="col-sm-4"><input type="text" class="form-control" id="subModulo"></div>  
            
        </div>
        <div class="row p-2 bg-light">
            <div class="col-sm-2"><button class="btn btn-outline-success" onclick="crearApp()">Guardar</button></div>
            <div class="col-sm-10" id="divResult"></div>
        </div>
    </div>    
</div>
<script>
    function crearApp(){

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
                nameApp:$("#aplicacion").val(),
                style:$("#style").val(),
                modulo:$("#modulo").val(),
                subModulo:$("#subModulo").val(),                
            }            
            let resultado = ajaxResultJson('createApp', 'divResult', data);
    } 
    }
</script>