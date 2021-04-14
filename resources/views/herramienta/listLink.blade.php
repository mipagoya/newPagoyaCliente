<div class="row p-2">
    <div class="col-md-6">        
        <table id="task" class="table table-sm table-striped table-bordered">
            <thead class="tbody-style"> 
                <th class="text-center">ID</th>
                <th class="text-center">Link</th>
                <th class="text-center">Producto</th>               
                <th class="text-center">Impuesto</th>               
                <th class="text-center">Valor</th>               
                <th class="text-center">Valor Total</th>               
                <th class="text-center">Estado</th>  
            </thead>   
            <tbody>
                @foreach ($liskLink as $item)
                @php  $checked = ""; $color = "btn-outline-danger"; @endphp
                    @if ($item->estado =="ACTIVO")
                        @php  $checked = "checked"; $color = "btn-outline-success"; @endphp                                 
                     @endif   
                    <tr id="trBody_{{$item->id}}" class="trBody">
                        <td  class="text-center">{{$item->id}}</td>
                        <td  class="text-center">
                            <a href="#" class="{{$color}} icon-coin-dollar" onclick="cargaBtnPago({{$item->id}})" title="Generar link de pago"
                                style="width:28px;height:25px;"></a>
                        </td>
                        <td  class="text-center">{{$item->producto}}</td>
                        <td  class="text-center">{{$item->impuesto}}</td>
                        <td  class="text-center">{{$item->valor}}</td>
                        <td  class="text-center">{{$item->valor_total}}</td>
                        <td  class="text-center">                                                     
                            <input type="checkbox" id="estado_{{$item->id}}" {{$checked}} onclick="inactivarLink({{$item->id}})">                                
                        </td>                          
                    </tr>
                @endforeach
            </tbody>
        </table> 
    </div>  
    <div class="col-sm-6" id="descripcion"></div>
</div>

<script>

    function inactivarLink(idLink){

        let data = {idLink};
        
        resultado = ajaxResultJson('inactivarLink', 'descripcion', data);
        if(resultado == 200){
            setTimeout(function(){
                menuDinamico("listaLink");
            },150);
        }
         
    }

    function cargaBtnPago(idLink){
        $(".trBody").removeClass('bg-verde');
        $("#trBody_"+idLink+"").addClass('bg-verde');
        
        $("#descripcion").html('');
        let data = {idLink};
        resultado = ajaxResultJson('descripcionLinkPago', 'descripcion', data);
    }
</script>


    
   

    