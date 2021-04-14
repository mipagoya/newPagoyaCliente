<div class="row p-2">
    <div class="col-sm-6" style="padding: 0px 4px 0px 10px">
       <div class="bg-grisCL  p-3">      
            <form action="#" id="form" name="form" class="form-horizontal">
                {{ csrf_field() }}
                <input type="hidden" id="tipeDocument" name="tipeDocument">  
                <div class="row p-1">        
                    <div class="col-sm-4"><label>Tipo de documento</label></div>
                    <div class="col-sm-8">
                        <select class="form-control" onchange="selectTipoDoc(this.value)">
                            <option value="">Seleccione tipo de documento</option>
                            @foreach ($tipoDoc as $item)
                                <option value="{{$item->id}}">{{$item->name}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="row p-2">        
                    <div class="col-sm-4"><label>Adjuntar</label></div>
                    <div class="col-sm-8"><input type="file" name="archivo" class="form-control"></div>
                </div>
                <div class="row p-2">        
                    <div class="col-sm-4">
                        <button type="button" class="btn btn-sm btn-success" style="background-color: #9cbc14"
                            onclick="cargaDocForAjax('saveDoc','divResultado','2000')">Guardar
                        </button>
                    </div>
                    <div class="col-sm-8"></div>
                </div>
                <div class="row p-2">        
                    <div class="col-sm-8" id="divResultado"></div>            
                </div>                    
            </form>     
        </div>
    </div>
    <div class="col-sm-6">
        @if (count($exisDocument) >= 1)          
            <table id="task" class="table table-sm table-striped table-bordered">
                <thead class="tbody-style"> 
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo Documento</th>
                        <th>Descargar</th>
                    </tr>
                </thead>
                <tbody  style="font-size:12px;">                            
                        @foreach ($exisDocument as $doc)
                        <tr style="font-size:12px; border: 1px solid black;">
                            <td>{{$doc->idDoc}}</td>
                            <td>{{$doc->name_doc}}</td>
                            <td>{{$doc->name}}</td>
                            <td class="text-center">
                                <a href="{{$doc->ruta}}" download class="btn-outline-success icon-download"
                                    style="width:28px;height:25px;"></a>
                            </td>
                        </tr>        
                        @endforeach                            
                </tbody>
            </table>
              
            </div>
        @endif
    </div>
</div>
<script>
    function selectTipoDoc(tipoDoc){       
        if(tipoDoc ===''){
            $("#tipeDocument").val(tipoDoc);
        }else{ 
            $("#tipeDocument").val(tipoDoc);
        }
    }

</script>
    