<link rel="stylesheet" href="coreui/css/menu.css">
<?php
    $aplicacion = "";
    $modulo = "";
    $submodulo = "";
    $menu = "";
    $menu_nav = "";
    
    $menu_nav .= '<div class="sidebar">
                    <nav class="sidebar-nav">
                        <ul class="nav">';
    foreach ($get_menus as $resultado) {        
        if ($aplicacion != $resultado->aplicacion) {
            $menu_nav .= '  <li class="nav-item nav-dropdown">
                                <a class="nav-link nav-dropdown-toggle text_menu" href="#"><i class="text-verde '.$resultado->appStyle.'"></i><strong>'.$resultado->aplicacion.'</strong></a>
                                    <ul class="nav-dropdown-items">';
            foreach ($get_menus as $row_modulo) {
                if ($resultado->aplicacion == $row_modulo->aplicacion) {
                    if ($modulo != $row_modulo->modulo) {
                          $menu_nav .= '<li class="nav-item nav-dropdown">
                                            <a class="nav-link nav-dropdown-toggle moduloclass text_menu" href="#"><i class="icon-circle-right"></i><strong>'.$row_modulo->modulo.'</strong></a>
                                                <ul class="nav-dropdown-items">';  
                        foreach ($get_menus as $row_submodulo) {
                            if ($row_modulo->modulo == $row_submodulo->modulo) {
                                if($submodulo != $row_submodulo->submodulo){
                                    $menu_nav .= '  <li class="nav-item nav-dropdown">
                                                        
                                                        <a class="nav-link  submoduloclass text_menu" href="#" id='.$row_submodulo->id_sumbodulo.'><i class="icon-minus"></i><strong>'.$row_submodulo->submodulo.'</strong></a>';
                                    
                                        $menu_nav .= '</li>';
                                }
                            }
                            $submodulo = $row_submodulo->submodulo;
                        }
                                $menu_nav .= '  </ul>
                                        </li>';
                    }
                }
                $modulo = $row_modulo->modulo;
            }// End Foreach $row_modulo
                        $menu_nav .= '  
                                    </ul>
                            </li>';
            
        }
        $aplicacion = $resultado->aplicacion;
    }
    $menu_nav .= '       </ul>
                    </nav>
                <button class="sidebar-minimizer brand-minimizer" type="button"></button>
                </div>';
    echo $menu_nav;
?>

<script type="text/javascript">
    // Mostrar los menús según el submóludo seleccionado
    $(".submoduloclass").click(function(){
        $( "#contentAjax" ).empty();        
        $.ajax({
            headers: {'X-CSRF-Token': $('input[name="_token"]').val()},
            type: "POST",
            url : "mostrarmenu",
            dataType: "json",
            data:{
                submod_selected: $(this).attr("id")
            },
            success: function(datos){
                var num_rows = datos.length;
                //alert(num_rows);
                var i = 0;
                var menu_submod = "";
                var menu_seleccionado = "";
                while(num_rows != i){
                    /* menu_submod += "<a class='menu_selected btn' id="+datos[i].idmenu+" onclick='menuDinamico("+'"'+datos[i].ruta+'"'+")'  href='#'>"+datos[i].menuname+"  </a>&nbsp"; */
                    menu_submod += "<button style='padding:4px;' class='rounded menu_selected btn btn-info btn-xs' id="+datos[i].idmenu+" onclick='menuDinamico("+'"'+datos[i].ruta+'"'+")'>"+datos[i].menuname+"</button>&nbsp";
                    i++;
                }
                $(".breadcrumb").html(menu_submod);
                
                // Funcionalidad para subrayar el menu seleccionado
                $(".menu_selected").click(function(){
                   // console.log($(this).attr('id') );
                    var id = $(this).attr('id');
                    $(".menu_selected").removeClass("active");
                    $("#"+id+"").addClass(" active");
                    
                    //if(id) #00529B

                    //$(".menu_selected").removeClass("btn-primary");
                    //$(this).addClass();
                    //alert("click "+$(this).attr("id"));
                   // $(".menu_selected").addClass("btn-primary");
//                    $(".menu_selected").css("color", "#FFF");
                  //  $(this).css("background-color", "#CEE3F6");
//$(this).css("color", "#00529B"); 
                    
                });
            },
            error: function(data){
                swal({
                    title: "La sesión ha expirado!",
                    type: "warning",
                    confirmButtonColor: "#DD6B55"
                  });  
                //setTimeout(function() {
                 //   window.location = '/login';  
               // }, 3000);                                    
            }
        });
    });
</script>
