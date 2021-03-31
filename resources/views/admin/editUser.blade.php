<div class="container-fluid">    
        <div class="card">
            <div class="card-header">
                <i class="fa fa-align-justify"></i> Editar Usuario                    
            </div>
            <div class="card-body center-block">           
              
                <div class="card-body">
                    <form action="#" id="form" name="form" class="form-horizontal">                            
                        {{ csrf_field() }}
                        <input type="hidden" id="id" name="id" value="{{$user->id}}">        
                        <div class="form-group">
                                <label for="name" class="col-md-2 control-label">Nombre</label>    
                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" name="name" value=" {{$user->name}} " >    
                                </div>
                        </div>                   
                        <div class="form-group">
                                <label for="email" class="col-md-2 control-label">Correo</label>    
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" value="{{$user->email}}" > 
                                </div>
                        </div>                   
                        {{--  <div class="form-group">
                                <label for="password" class="col-md-2 control-label">Contraseña</label>    
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" value="{{$user->password}}" >
                                </div>
                        </div>      --}}
                        <div class="form-group">
                                <div class="col-md-4 col-md-offset-4">
                                    <button type="submit" id="btn-guardar" class="btn btn-primary">
                                        Guardar
                                    </button>
                                </div>
                        </div>
                        
                    </form>                  
                    <div id="divResultado" class="alert"></div>
                </div> 

            </div>    
        </div>    
    </div>
<script type="text/javascript">
    
    $("#btn-guardar").click(function(){
            
        $("#form").validate({
            errorClass: "my-error-class",
            validClass: "my-valid-class",

            rules: {
                name: { required: true, minlength: 10},               
                email: { required:true, email: true},
                //password: { required: true, minlength: 8},
                //passwordconfirm: { required: true, minlength: 6},                
            },
            messages: {
                name: "Debe introducir su nombre.",                
                email : "Debe introducir un email válido.",
               // password : "Debe introducir una contraseña.",
              //  passwordconfirm : "Debe repetir la contraseña.",               
            },
            submitHandler: function(form){

                var miurl = 'updateUser';
                var formu=$(this);
                var nombreform= 'form';
                var divresul = 'divResultado';
              
                var formData = new FormData($("#"+nombreform+"")[0]);
              
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
                    
                    success: function(data){    
                      $("#"+divresul+"").addClass('alert-success');   
                      $("#"+divresul+"").html(data);        
                      $( "#btn-guardar" ).prop( "disabled", true ); 
                      setTimeout(function() {
                        menuDinamico('listUser');     
                       }, 2000);                        
                    },
                    //si ha ocurrido un error
                    error: function(data){        
                      $("#"+divresul+"").addClass('alert-danger');
                      $("#"+divresul+"").html("Ha ocurrido un error "+data.status);
                      $( "#btn-guardar" ).prop( "disabled", true );              
                    }
                  });   
               
            }
        });
    });
</script>