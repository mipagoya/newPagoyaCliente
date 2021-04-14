<div class="row p-2 bg-grisCL">
    <div class="col-sm-5 text-center">
        <div class="p-3"><strong style="font-size: 24px">Cobra por internet.</strong></div>
    </div>
    <div class="col-sm-7 text-center" >
        <div class="p-3">
            <span style="font-size: 16px;">Crea un link de pago para vender en redes sociales, email o a través de tu página web.</span>
        </div>
    </div>
</div>
<div class="row p-2">
    <div class="col-sm-5">
        <div class="bg-grisCL">
            <div class="row p-2">
                <div class="col-sm-5"><label>¿Que vas a cobrar? <strong class="text-danger">*</strong></label></div>
                <div class="col-sm-7"><input type="text" class="form-control requerido" id="producto" onfocus="ayuda(this.id)" onkeyup="resumen(this.value,this.id)"></div>            
            </div>       
            <div class="row p-2">
                <div class="col-sm-5"><label>¿Costo del producto? <strong class="text-danger">*</strong></label></div>
                <div class="col-sm-7"><input type="number" class="form-control requerido" id="costo" onfocus="ayuda(this.id)" onkeyup="resumen(this.value,this.id)"></div>
            </div> 
            <div class="row p-2">
                <div class="col-sm-5"><label>¿Cobra impuestos? <strong class="text-danger">*</strong></label></div>
                <div class="col-sm-5" id="checkImp">
                    <span class="p-1">SI</span><input type="radio" class="requerido" name="impuesto" id="si">
                    <span class="p-1">NO</span><input type="radio" class="requerido" name="impuesto" id="no">
                </div>
            </div> 
            <div class="row p-2">
                <div class="col-sm-3">
                    <button class="btn btn-sm btn-success p-2" id="idBtn" style="background-color: #9cbc14;border: none;" onclick="crearLink()">
                        Crear Producto</button>
                </div>
                <div class="col-sm-9">
                    <div class="" id="divCobra"></div>
                    <div class="alert alert-warning alert-dismissible fade" role="alert" id="alert">
                        <span id="idAyuda"></span>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    <div class="col-sm-6 ">
        <div class="bg-grisCL">
            <div class="row p-3">
                <div class="col-sm-10">
                    <strong style="font-size: 24px">Resumen de la venta</strong>
                </div>
                <div class="col-sm-4" style="padding: 10px 0px 0px 35px">
                    <span style="font-size: 16px">Descripción producto</span> 
                </div>
                <div class="col-sm-7" style="padding: 10px 0px 0px 35px">
                    <strong id="des_producto"></strong>
                </div>
                <div class="col-sm-4" style="padding: 10px 0px 0px 35px">
                    <span style="font-size: 16px" style="padding: 5px ">Valor Producto</span> 
                </div>
                <div class="col-sm-7" style="padding: 10px 0px 0px 35px">
                    <strong id="des_costo"></strong>
                </div>
                <div class="col-sm-4" style="padding: 10px 0px 0px 35px">
                    <span style="font-size: 16px" style="padding: 5px ">Valor Total</span> 
                </div>
                <div class="col-sm-7" style="padding: 10px 0px 0px 35px">
                    <strong id="total"></strong>                    
                </div>
            </div>
        </div>
    </div> 
</div>
<script>
    function ayuda(idCampo){        
        $("#alert").addClass('show');
            $("#idAyuda").html('Descripción del producto o servicio');        
        if(idCampo == 'producto'){
        }else if(idCampo == 'costo'){
            $("#idAyuda").html('Indica el valor del producto o servicio con iva incluido (si aplica)');
        }        
    }

    function resumen(valor,idCampo){        
        if(!isNaN(valor)){
            valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
            valor = valor.split('').reverse().join('').replace(/^[\.]/,'');
            $("#total").html(valor);            
        }        
        $("#des_"+idCampo+"").html(valor);
    }

    function crearLink(){
        let obligatorio = 0;
        let check  = "";
        $("#divCobra").html('');
        $("#alert").removeClass('show');
        $(".requerido").removeClass('border border-danger');
        $("#checkImp").removeClass('border border-danger');
        $(".requerido").each(function(){
            let id = this.id;
            //console.log(this.name);
            if($("#"+id+"").val() == ""){
                $("#"+id+"").addClass('border border-danger');
                $("#divCobra").html("<p class='text-danger'>Hay campos en blanco favor validar</p>");
                obligatorio++;
            }  
            if(this.name == "impuesto"){
                if($("#"+id+"").is(':checked')){
                    check = $("#"+id+"").attr("id");                   
                }   
            }     
        });

        if(check ==""){
            $("#checkImp").addClass('border border-danger');
            $("#divCobra").html("<p class='text-danger'>Hay campos en blanco favor validar</p>");
        }
                
        if( obligatorio ==0 && check != ""){
            let data = {
                producto:$("#producto").val(),
                costo:$("#costo").val(),
                impuesto:check
            }
            let resultado = ajaxResultJson('crearLinkPro', 'divCobra', data);
                if(resultado == "200"){
                    $("#divCobra").html("<strong class='text-success'>Producto creado con exito.</strong>");
                    $("#idBtn").prop('disabled',true);
                    setTimeout(function(){
                        menuDinamico('generaLink');
                    },3000);
                }else if(resultado == 'existe'){
                    $("#divCobra").html("<strong class='text-warning'>El nombre de producto ya existe, favor validar</strong>");
                }else{
                    $("#divCobra").html("<strong class='text-danger'>Ocurrio un error favor comuniquese con el administrador del sistema, Gracias.</strong>");
                    $("#idBtn").prop('disabled',true);
                }
            }     
    }
</script>