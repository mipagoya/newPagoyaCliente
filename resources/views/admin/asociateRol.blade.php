<div class="row" style="padding: 2px 5px 0 2px">
    <div class="col-6 p-3 text-center" style="background-color: #021d24;color:white; font-size:16px">
        <strong>Asociar menu al rol {{$nameRol}}</strong>
    </div>
</div>
<div class="row" style="padding: 2px 5px 0 2px">    
    <div class="col-6">
        <table id="task" class="table table-sm table-striped table-bordered">
            <thead class="tbody-style">       
                <tr>
                    <th class="text-center">ID</th>
                    <th class="text-center">Menu</th> 
                    <th class="text-center">Rol</th>
                    <th class="text-center">Estado</th>
                </tr>
            </thead>
            <tbody  style="font-size:11px;">
                @foreach ($roleMenu as $menu)
                    <tr>
                        <td>{{$menu->idMenu}}</td>
                        <td>{{$menu->menu}}</td>
                        <td>{{$menu->rol}}</td>
                        <td class="text-center">
                            @if ($idRol == $menu->id_rol)
                                <input type="checkbox" id="check_{{$menu->idMenu}}" checked onclick="asociarMenuRol({{$idRol}},'{{$menu->idMenu}}')"> 
                            @else
                                <input type="checkbox" id="check_{{$menu->idMenu}}" onclick="asociarMenuRol({{$idRol}},'{{$menu->idMenu}}')"> 
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="col-6" id="divRolMenu"></div>    
</div>
<script>
    function asociarMenuRol(idRol,idMenu){
        let idCheck ="check_"+idMenu;        
        let isChecked = 'NO';
        if($("#"+idCheck+"").prop('checked')){ isChecked = "SI"; }
        
        let data = {idRol,idMenu,isChecked};
        let resultado = ajaxResultJson('asociarMenuRol', 'divRolMenu', data);
    }
</script>