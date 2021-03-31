    function selectallopts_ListCheq() {
        if ($("#all_optsContacts").is(":checked")) {
            $(".opt_checkContacto").prop("checked", true);
            contactoSeleccionado = true;
        } else {
            $(this).find($(".opt_checkContacto").prop("checked", false));
            contactoSeleccionado = false;
        }
    }

    function checksContactoSelect() {
        contactoSeleccionado = validarChecksContactos();
    }

    function validarChecksContactos() {
        var flag_checkContacto = false;
        var correosSel = '';
        CorreosSelect = [];
        $(".opt_checkContacto").each(function() { // ingreso a cada campo Check
            var id_campo_check = $(this).attr("id");
            var id_Contacto = $(this).attr("data-helpNro");
            if ($("#" + id_campo_check + "").prop("checked")) {
                //alert("CHEQUEADO: "+id_campo_check+"-----"+$("#emailCont_"+id_Contacto).val());
                flag_checkContacto = true;
                correosSel += $("#emailCont_" + id_Contacto).val() + ";";
            } else {
                //alert("NO CHEQUEADO: "+id_campo_check+"-----"+$("#emailCont_"+id_Contacto).val());
                if (flag_checkContacto == false) {
                    flag_checkContacto = false;
                }
            }
        });
        CorreosSelect.push(correosSel);
        return flag_checkContacto;
    }