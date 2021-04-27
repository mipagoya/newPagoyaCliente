@php $item = $liskLink[0];  
     $direcurl = "http://newformulario.com/form?id=".$item->link; 
    //$direcurl = "https://formulario.pagoya.com.co/form?id=".$item->link; 
@endphp
<div class="row bg-grisCL">
    <div class="col-sm-5">
        <div><strong style="font-size: 20px">PREPARATE!</strong></div>
    </div>            
</div>
<div class="row bg-grisCL">
    <div class="col-sm-12 text-justifai" >
        <div class="p-1">
            <span style="font-size: 14px;">PAGO YA te ayuda con tus transferencias en linea, por eso te proporciona distintos medios de pago para que tus clientes puedan realizar pagos de forma sencilla y segura.</span>
        </div>
    </div>           
</div>
<div class="row bg-grisCL">
    <div class="col-sm-12 text-justifai" >
        <div class="p-1">
            <strong style="font-size: 14px;">ASI DE FACIL ES CON PAGO YA!!</strong>
        </div>
    </div>           
</div>
<div class="row bg-grisCL" style="padding: 40px 0 0 0;">
    <div class="col-sm-11"><strong style="font-size: 18px;">Link de pago: <span class="text-verde">{{$item->producto}}</span></strong></div>
</div>
    <div class="row bg-grisCL" style="padding: 8px 0 0 0">
    <div class="col-sm-10">
        <div class="input-group">
            <input type="text" class="form-control" id="id_linkCop" value="{{$direcurl}}">
            <div class="input-group-append">
                <span class="btn btn-outline-primary icon-copy" title="Copiar Link" id="btn_copy" onclick="copyLink()"></span>
               <span id="message"></span>
            </div>
        </div>
    </div>
</div>
<div class="row bg-grisCL" style="padding: 20px 0 5px 0">
    <div class="col-sm-3"><strong>Crea boton de pago</strong></div>
    <div class="col-sm-2">
        <div class="row bg-grisCL">  
            <div class="col-sm-1">
                <div class="input-group">                    
                    <input type="radio" name="btn-pago" id="btn-largo" onclick="generaBtn(this.id)">&nbsp;                        
                    <span>Largo</span>
                </div>                    
            </div>
        </div>              
        <div class="row bg-grisCL"> 
            <div class="col-sm-1">
                <div class="input-group">
                    <input type="radio" name="btn-pago" id="btn-corto" onclick="generaBtn(this.id)">&nbsp;
                    <span>Corto</span>
                </div>                    
            </div>
        </div>
    </div>                                                         
    <div class="col-sm-2" id="id_divA"><a href="{{$direcurl}}" id="a-btn" class="d-none" style="padding: 7px; text-decoration: none;background:#021d24;font-weight:bold;border-radius:8px;" target="_blank"></a>
    </div>
</div>
<div class="row bg-grisCL"> 
    <div class="col-sm-6">
        <textarea cols="90" rows="8" class="bg-grisCL" style="resize: none" id="id-textarea"></textarea>
    </div>
</div>  

<style>
    #id_linkCop:focus{
        outline: none;
    }
    #id_linkCop::-moz-selection{
        background-color: transparent;
    }
    #id_linkCop::selection{
        background-color: transparent;        
    }
</style>

<script>
    function generaBtn(btn){
        $("#a-btn").html('');
        $("#a-btn").removeClass('d-none');
        if(btn == "btn-largo"){           
            $("#a-btn").html('PAGO<span style="color: #9cbc14"; >YA</span>');            
        }else{           
            $("#a-btn").html('P<span style="color: #9cbc14"; >Y</span>');  
        }
        $("#id-textarea").html($("#id_divA").html());        
    }

    function copyLink(){
        const buttonCopy = document.querySelector("#btn_copy");
        const inputCopy = document.querySelector("#id_linkCop");
        const message = document.querySelector("#message");
        inputCopy.focus();
        document.execCommand('selectAll');
        document.execCommand('copy');
        
        message.innerHTML = "Copiado";
        setTimeout(()=>message.innerHTML = "", 2000);
    }

</script>