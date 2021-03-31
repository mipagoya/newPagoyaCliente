
	$("#imprimir").click(function (){
        $(".error2").remove();
		codNivelComercial2 = document.getElementById("codNivelComercial").selectedIndex;
		codNaturaTran2 = document.getElementById("codNaturaTran").selectedIndex;
        if( codNivelComercial2 == "0" ){
            $("#codNivelComercial").focus().after("<span class='error2'>* </span>");
            return false;
        }else if( codNaturaTran2 == "0" ){
            $("#codNaturaTran").focus().after("<span class='error2'>* </span>");
            return false;
        }else if ($('input[name="Eintermediacion"]').is(':checked')) {
			if ($('input:radio[name=Eintermediacion]:checked').val()=='S'){
			codTipoIntermediario2 = document.getElementById("codTipoIntermediario").selectedIndex;
			TipoRazonSocial2 = document.getElementById("TipoRazonSocial").selectedIndex;
			ciudad2 = document.getElementById("ciudad").selectedIndex;
			codPais2 = document.getElementById("codPais").selectedIndex;
				if( codTipoIntermediario2 == "0" ){
			            $("#codTipoIntermediario").focus().after("<span class='error2'>* </span>");
			            return false;
			       }else if( TipoRazonSocial2 == "0" ){
				            $("#TipoRazonSocial").focus().after("<span class='error2'>* </span>");
				            return false;
					}else if( ciudad2 == "0" ){
				            $("#ciudad").focus().after("<span class='error2'>* </span>");
				            return false;
					}else if( codPais2 == "0" ){
				            $("#codPais").focus().after("<span class='error2'>* </span>");
				            return false;
						}
				}
	
				
				}else{
					$('input[name="Eintermediacion"]').focus().after("<span class='error2'>* </span>");
					return false;
					}
				if ($('input[name="Erestricciones"]').is(':checked')) {	
					if ($('input:radio[name=Erestricciones]:checked').val()=='S'){
					CodTipoRestriccion2 = document.getElementById("CodTipoRestriccion").selectedIndex;
					if(CodTipoRestriccion2 == "0" ){
				            $("#CodTipoRestriccion").focus().after("<span class='error2'>* </span>");
				            return false;
				       }
					}
				
					}else{
						$('input[name="Erestricciones"]').focus().after("<span class='error2'>* </span>");
						return false;
					}
				if ($('input[name="Econdiciones"]').is(':checked')) {	
					if ($('input:radio[name=Econdiciones]:checked').val()=='S'){
						codTipoCondContrap2 = document.getElementById("codTipoCondContrap").selectedIndex;
						Pdeterminarse2 = document.getElementById("Pdeterminarse").selectedIndex;
						if(codTipoCondContrap2 == "0" ){
				            $("#codTipoCondContrap").focus().after("<span class='error2'>* </span>");
				            return false;
				      	 }else if(Pdeterminarse2 == "0" ){
				            $("#Pdeterminarse").focus().after("<span class='error2'>* </span>");
				            return false;
						}
					}
				
					}else{
					$('input[name="Econdiciones"]').focus().after("<span class='error2'>* </span>");
					return false;
					}		
				
				
					if ($('input[name="Ecanones"]').is(':checked')) {	
						if ($('input:radio[name=Ecanones]:checked').val()=='S'){
						Ereversiones2 = document.getElementById("Ereversiones").selectedIndex;
					
							if(Ereversiones2 == "0" ){
				            $("#Ereversiones").focus().after("<span class='error2'>* </span>");
				            return false;
				       }
					}
				
				}else{
				$('input[name="Ecanones"]').focus().after("<span class='error2'>* </span>");
				return false;
				}	
				
				if ($('input[name="Evinculacion"]').is(':checked')) {	
					if ($('input:radio[name=Evinculacion]:checked').val()=='S'){
					codTipoVinculacion2 = document.getElementById("codTipoVinculacion").selectedIndex;
					Ivinculacion2 = document.getElementById("Ivinculacion").selectedIndex;
					
						if(codTipoVinculacion2 == "0" ){
				            $("#codTipoVinculacion").focus().after("<span class='error2'>* </span>");
				            return false;
				      	 }else if(Ivinculacion2 == "0" ){
				            $("#Ivinculacion").focus().after("<span class='error2'>* </span>");
				            return false;
				      	 }else if(Ivinculacion2 == "N" ){
							Evalores2 = document.getElementById("Evalores").selectedIndex;
							if(Evalores2 == "0" ){
								$("#Evalores").focus().after("<span class='error2'>* </span>");
				            	return false;
								}
							}
				}
				
				}else{
				$('input[name="Evinculacion"]').focus().after("<span class='error2'>* </span>");
				return false;
				}
				
    });
    	$("#codNivelComercial, #codNaturaTran, #codTipoIntermediario, #TipoRazonSocial, #ciudad, #codPais, #codTipoCondContrap, #Pdeterminarse, #Ereversiones, #codTipoVinculacion, #Ivinculacion ").change(function(){
	        if( $(this).val() != "" ){
	            $(".error2").fadeOut();
	            return false;
	        }
		});

		$('input[name="Eintermediacion"], input[name="Erestricciones"], input[name="Econdiciones"], input[name="Ecanones"], input[name="Evinculacion"]').click(function(){
			
		        if( $(this).val() != "" ){
		            $(".error2").fadeOut();
		            return true;
		        }
		   });
		
