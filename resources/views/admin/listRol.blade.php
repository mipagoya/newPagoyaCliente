<div class="container-fluid">    
    <div class="card">
        <div class="card-header">
            <i class="fa fa-align-justify"></i> Lista de Roles                    
        </div>
       
        <div class="col-md-9">
        <br>
            <a href="#" class="btn btn-info" onclick="menuDinamico('createRol')">Crear Rol <i class="fa fa-plus-circle"></i></a>         
            <div id="divResultado" class="alert" style="display:none;"></div>         
            <table class="table table-striped" id="task">
                <thead>
                    <th>ID</th>
                    <th>Nombre</th>                      
                    <th>Descripción</th>                      
                    <th>Relacionar Menus</th>
                    <th>Acción</th>  
                </thead>   
            </table>            
            <script type="text/javascript">
                $(document).ready(function() {
                    oTable = $('#task').DataTable({
                        "processing": true,
                        "serverSide": true,
                        "language": {
                        "lengthMenu": "Cantidad de registros por paginas _MENU_",
                        "zeroRecords": "No se encontraron registro con los parametros de busqueda",
                        "info": "Pagina _PAGE_ de _PAGES_",
                        "infoEmpty": "No se encontraron registro con los parametros de busqueda",
                        //"infoFiltered": "(filtered from _MAX_ total records)",
                        "search":"Buscar"
                        
                    },
                        "ajax": "/dataTableRol",
                        "columns": [
                            {data: 'id', name: 'id'},
                            {data: 'name', name: 'name'},
                            {data: 'description', name: 'description'},
                            {data:null,'searchable':false, "orderable":false,render:function(data,type,row){
                                    return "<a href='#'class='btn btn-success' onclick='cargaVista(" + data.id +",4)' title='Relacionar Menu'><i class='icon-list'></i></a>"
                            }},
                            {data:null,'searchable':false,"orderable":false, render:function(data,type,row){
                                    return "<a href='#' onclick='cargaVista("+ data.id +",3)' class='btn btn-warning' title='Editar Rol'><i class='icon-pencil'></i></a>\n\
                                    <a href='#' class='btn btn-danger' title='Inactivar Rol' onclick='return disableRol("+data.id+")'><i class='icon-warning'></i></a>" 
                            }}
                        ]
                    });
                });
                
    function disableRol(id)
    {                   
        //var id = id;
        var r = confirm("¿Seguro desea inactivar el rol?");
        if (r == false) { 
            return false;
        }else{
                
            var miurl = 'deleteRol';                        
            var divresul = 'divResultado';
            $.ajax({
                url: miurl,  
                type: 'GET',
                //datos del formulario
                data: "id="+id,
                cache: false,
                contentType: false,
                processData: false,    
                beforeSend: function(){
                    $("#"+divresul+"").html($("#cargador_empresa").html());                
                },
                
                success: function(data){
                    $("#"+divresul+"").show();    
                    $("#"+divresul+"").addClass('alert-success');   
                    $("#"+divresul+"").html(data);                            
                    setTimeout(function() {
                    menuDinamico('listRol');     
                    }, 2000);                       
                },
                //si ha ocurrido un error
                error: function(data){        
                    $("#"+divresul+"").addClass('alert-danger');
                    $("#"+divresul+"").html("Ha ocurrido un error "+data.status);
                    //$( "#btn-guardar" ).prop( "disabled", true );              
                }
            });    
        }
    }        

            </script>
        </div>        
        <br>  
    </div> 
    