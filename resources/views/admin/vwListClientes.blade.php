<div class="row p-1">
    <div class="col-sm-1">
        <select id="cantRegistro" class="form-control" onchange="acciones('filtro',this.value)">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
    </div>
        &nbsp;&nbsp;    
    <div class="col-sm-3">
        <div class="input-group">
            <input type="text" class="form-control" id="search" placeholder="Buscar" autocomplete="off">
            <div class="input-group-append">
                <button class="btn btn-outline-success icon-search" type="button" onclick="buscarTablero()" title="Buscar"></button>
                <button class="btn btn-outline-warning icon-eraser" type="button" onclick="acciones('inicial',10)" title="Limpiar"></button>
            </div>
        </div>
    </div>
</div>
<div class="row p-1">          
    <div class="col-sm-12">
        <div class="table-responsive"> 
            <table id="tablaOperacGeneral" class="table table-sm table-striped table-bordered">        
                <thead class="bg-azulME" style="color:White;font-size:12px;">
                    <tr>
                        <th class="text-center">ID</th>
                        <th class="text-center">NOMBRE</th>
                        <th class="text-center">CORREO</th>
                        <th class="text-center">IDENTIFICACIÓN</th>
                        <th class="text-center">FECHA VALIDACION</th>
                        <th class="text-center">ESTADO</th>
                        <th class="text-center"></th>
                        <th class="text-center"></th>
                    </tr>
                </thead>        
                <tbody id="tbodylistCliente" style="font-size:12px;"></tbody> 
            </table>
            </div> 
    </div> 
</div>

<script>
    $(document).ready(function(){
        var data = { 'accion':'inicial','cantRegistro':10 };
        var url='tbdyListClientes'
        ajaxResultDos(url,'tbodylistCliente',data)    
    });
    
    function acciones(accion,cantRegistro){
        if(accion=='inicial'){
            $("#cantRegistro").prop('selectedIndex',0);
            $("#search").val('');
        }
            var data = {'accion':accion,'cantRegistro':cantRegistro};
            var url='tbdyListClientes';  
            $("#pFiltro").html(cantRegistro);
            ajaxSuccessF(url, 'tbodylistCliente', 'POST', data);
    }

    function buscarTablero(){
    
    var search = $("#search").val();
    var cantidad = search.length;
    var filtro = 50; //$("#cantRegistro option:selected").val(),
    if(search !=""){
        if(cantidad >=3){
            var data = {
              'cantRegistro':filtro,
              'search':$("#search").val(),
              'accion':'buscar'
          };
          $("#pFiltro").html(filtro);
          var url='tbdyListClientes'
          ajaxResultDos(url,'tbodylistCliente',data)          
        }
    }
}
</script>