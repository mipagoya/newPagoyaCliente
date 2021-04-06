<div class="row p-2">
    <div class="col-sm-5">
      <div class="card">
        <div class="card-body">
            <form action="#" id="form" name="form" class="form-horizontal">
                {{ csrf_field() }}
                <input type="hidden" id="tipeDocument" name="tipeDocument">  
                <div class="row p-2">        
                    <div class="col-sm-3"><label>Tipo de documento</label></div>
                    <div class="col-sm-6">
                        <select class="form-control" onchange="selectTipoDoc(this.value)">
                            <option value="">Seleccione tipo de documento</option>
                            @foreach ($tipoDoc as $item)
                                <option value="{{$item->id}}">{{$item->name}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="row p-2">        
                    <div class="col-sm-3"><label>Adjuntar</label></div>
                    <div class="col-sm-6"><input type="file" name="archivo" class="form-control"></div>
                </div>
                <div class="row p-2">        
                    <div class="col-sm-3"></div>
                    <div class="col-sm-6">
                        <button type="button" class="btn btn-sm btn-success" onclick="fomrAddDocum('saveDoc')">Guardar</button>
                    </div>
                </div>
                <div class="row p-2">        
                    <div class="col-sm-8" id="divResultado"></div>            
                </div>                    
            </form>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
        @if (count($exisDocument) >= 1)
            <div class="card">
                <div class="card-body">
                    <table id="task" class="table table-sm table-striped table-bordered">
                        <thead style="color:White;font-size:12px; border: 1px solid black; background-color: #67BFEB">
                            <tr style="border: 1px solid black;">
                                <th style="border: 1px solid black;">ID</th>
                                <th style="border: 1px solid black;">Nombre</th>
                                <th style="border: 1px solid black;">Descargar</th>
                            </tr>
                        </thead>
                        <tbody  style="font-size:12px;">
                            
                                @foreach ($exisDocument as $doc)
                                <tr style="font-size:12px; border: 1px solid black;">
                                    <td style="border: 1px solid black;">{{$doc->id}}</td>
                                    <td style="border: 1px solid black;">{{$doc->name_doc}}</td>
                                    <td style="border: 1px solid black;">
                                        <a href="{{$doc->ruta}}" download class="btn btn-sm btn-outline-success icon-download"
                                            style="width:28px;height:25px;"></a>
                                        </td>
                                </tr>        
                                @endforeach                            
                        </tbody>
                    </table>
                </div>
            </div>
        @endif
    </div>
</div>



  <script>
    function selectTipoDoc(tipoDoc){ 
        console.log(tipoDoc);
        if(tipoDoc ===''){
            $("#tipeDocument").val(tipoDoc);
        }else{ console.log(tipoDoc);
            $("#tipeDocument").val(tipoDoc);
        }
    }

function fomrAddDocum(url){   
  var miurl = url;
  var formu=$(this);
  var nombreform= 'form';
  var divresul = 'divResultado';
  var formData = new FormData($("#"+nombreform+"")[0]);
 
  //console.log(formData);
  $.ajax({
    url: miurl,  
    type: 'POST',
    //datos del formulario
    data: formData,
    cache: false,
    contentType: false,
    processData: false,    
    beforeSend: function(){
      $("#"+divresul+"").html($("#cargador_empresa").html());                
    },
    
    success: function(data){    console.log(data);
        if(data=='duplicado'){
            $("#"+divresul+"").html("<p class='text-danger'>Documento duplicado favor validar</p>");  
        } else if(data==200){ 
            $("#"+divresul+"").html("<p class='text-success'>Documento cargado con exito!</p>"); 
            setTimeout(function() {
                menuDinamico('datadjDoc');   
                }, 5000); 
        } 
    },
    //si ha ocurrido un error
    error: function(data){        
      
      $("#"+divresul+"").html("Ha ocurrido un error "+data.status);
                  
    },
    async: true
  });
}
  </script>
    