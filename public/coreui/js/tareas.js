function verTrazabTarea(IDTareaControl) {
    var data = {
        'TipoCarpeta': 'TAREA',
        'NumCarpeta': IDTareaControl,
    }

    modalGlobal('crearTrazabilidad', 'POST', data, 'Tarea : ' + IDTareaControl);
}

function actEstadoTarea(IDTareaControl, Id_NuevoEstado, keyTarea) {
    var contenido_antes = $("#btnEstado_" + keyTarea).attr("dataHelpOld");
    var dataNuevoEstado = {
        IdEstdoTarea: Id_NuevoEstado
    }
    var nuevoEstado = ajaxSuccessF('estadoTarea', 'SINDIV', 'POST', dataNuevoEstado);
    //alert(IDTareaControl + "====" + Id_NuevoEstado + "====" + nuevoEstado + "====" + contenido_antes);
    var nombre_campo = 'Estado tarea';
    var comentario = 'cambió el estado de la tarea de: ' + contenido_antes + ', al nuevo estado: ' + nuevoEstado;
    var IdOrigenTraz = 5;
    var public_cliente = 0;
    actualizarInfoTarea(Id_NuevoEstado, IDTareaControl, 'IDEstadoTarea');
    crearTrazabilidadTarea(IDTareaControl, IdOrigenTraz, comentario, nombre_campo, contenido_antes, nuevoEstado, public_cliente);
    $("#btnEstado_" + keyTarea).attr("dataHelpOld", nuevoEstado);
    btnsXEstadoTarea(IDTareaControl, Id_NuevoEstado, keyTarea);
}

function btnsXEstadoTarea(IDTareaControl, Id_NuevoEstado, keyTarea) {
    if (parseFloat(Id_NuevoEstado) == 2) {
        btnAsignar = btnAsignar = '<button class="btn btn-outline-danger icon-stop" onclick="actEstadoTarea(' + IDTareaControl + ', 3,' + keyTarea + ' )" style="padding:3px;margin: 3px;"></button>';
    } else if (parseFloat(Id_NuevoEstado) == 3) {
        $("#trazabTarea_" + keyTarea).remove();
        btnAsignar = '';
    }
    $("#btnEstado_" + keyTarea).next().remove();
    $("#btnEstado_" + keyTarea).html(btnAsignar);

}

function crearTrazabilidadTarea(IDTareaControl, IdOrigenTraz, comentario, nombre_campo, contenido_antes, contenido_nuevo, public_cliente) {
    var datosCrearTrazab = {
        Tarea: IDTareaControl,
        IdOrigenTraz: IdOrigenTraz,
        Comentario: comentario,
        id_menu: $(".active").attr("id"),
        nombre_campo: nombre_campo,
        contenido_antes: contenido_antes,
        contenido_nuevo: contenido_nuevo,
        public_cliente: public_cliente
    }
    ajaxSuccessF('crearTrazabilidadTareas', 'SINDIV', 'POST', datosCrearTrazab);
}

function actualizarInfoTarea(Dato, IDTareaControl, NombreCampo) {

    var datosNuevoEstado = {
        IDTareaControl: IDTareaControl,
        ValorActualizar: Dato,
        Campo: NombreCampo
    }
    ajaxSuccessF('actualizarInfoTarea', 'SINDIV', 'POST', datosNuevoEstado);
}