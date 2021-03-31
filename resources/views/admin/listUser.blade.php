<div class="container-fluid">    
    <div class="card">
        <div class="card-header">
            <i class="fa fa-align-justify"></i> Lista de Usuarios                    
        </div>
       
        <div class="col-md-9">
        <br>
            <a href="#" class="btn btn-info" onclick="menuDinamico('createUser')">Crear Usuario <i class="fa fa-user"></i></a>         
            <div id="divResultado" class="alert" style="display:none;"></div>         
            <table class="table table-striped" id="task">
                <thead>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>        
                    <th>Asociar Rol</th>        
                    <th>Acción</th>
                </thead>    
            </table>            
<script type="text/javascript">
    $(document).ready(function () {
        oTable = $('#task').DataTable({
            "processing": true,
            "serverSide": true,
            "language": {
                "lengthMenu": "Cantidad de registros por pagina _MENU_",
                "zeroRecords": "No se encontraron registro con los parametros de busqueda",
                "info": "Pagina _PAGE_ de _PAGES_",
                "infoEmpty": "No se encontraron registro con los parametros de busqueda",
                //"infoFiltered": "(filtered from _MAX_ total records)",
                "search": "Buscar"
            },
            "ajax": "/dataTableUser",
            "columns": [
                {data: 'id', name: 'id'},
                {data: 'name', name: 'name'},
                {data: 'email', name: 'email'},
                {data: null, 'searchable': false, "orderable": false, render: function (data, type, row) {
                        return "<a href='#'class='btn btn-success' onclick='cargaVista(" + data.id +",2)' title='Relacionar Rol'><i class='icon-list'></i></a>"
                    }},
                {data: null, 'searchable': false, "orderable": false, render: function (data, type, row) {
                        return "<a href='#' class='btn btn-warning' onclick='cargaVista("+ data.id +",1)' title='Editar Usuario'><i class='icon-pencil'></i></a>\n\
                        <a href='#' class='btn btn-danger' title='Inactivar Usuario' onclick='return disableUser(" + data.id + ")'><i class='icon-user-minus' aria-hidden='true'></i></a>"
                    }}
            ]
        });
    });

    function disableUser(id)
    {                   
        //var id = id;
        var r = confirm("¿Seguro desea inactivar el usuario?");
        if (r == false) { 
            return false;
        }else{
                
            var miurl = 'disableUser';                        
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
                    // $( "#btn-guardar" ).prop( "disabled", true ); 
                    setTimeout(function() {
                    menuDinamico('listUser');     
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
    
