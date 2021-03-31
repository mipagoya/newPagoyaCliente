<div class="container-fluid">    
    <div class="card">
        <div class="card-header">
            <i class="fa fa-align-justify"></i> Carga Items                     
        </div>
        <div class="card-body center-block">           
          
            {{-- Ak debe ir el contenido --}}
            
        </div>    
    </div>    
</div>


// Platinlla Grid

<div class="container-fluid">    
    <div class="form-group row" id="errorCargas" ></div>       
</div>

<script data-jsfiddle='errorCargas'>
    var
            $$ = function (id) {
                return document.getElementById(id);
            },
            container = $$('errorCargas'),
            searchFiled = $$('search_field'),
            excelGrid = $$('excelGrid')
    ,
            hot2,
            model2 = [ @foreach($listaError as $lista)
                {/*ID_FACT:'{{trim($lista->ID_FACT)}}',*/ERROR_STATUS:'{{trim(utf8_encode($lista->ERROR_STATUS))}}', SH:'{{trim(utf8_encode($lista->SH))}}', DOC_TRANSPORTE:'{{trim(utf8_encode($lista->DOC_TRANSPORTE))}}', REFERENCIA:'{{trim(utf8_encode($lista->REFERENCIA))}}', NOMBRE:'{{trim(utf8_encode($lista->NOMBRE))}}', MT:'{{trim(utf8_encode($lista->MT))}}', VIN_SERIAL:'{{trim(utf8_encode($lista->VIN_SERIAL))}}', COD_COLOR:'{{trim(utf8_encode($lista->COD_COLOR))}}', COLOR:'{{trim(utf8_encode($lista->COLOR))}}', MOTOR:'{{trim(utf8_encode($lista->MOTOR))}}', ANO_MODELO:'{{trim($lista->ANO_MODELO)}}', FECHA_PRODUCCION:'{{trim($lista->FECHA_PRODUCCION)}}', SERVICIO_1:'{{trim(utf8_encode($lista->SERVICIO_1))}}', SERVICIO_2:'{{trim(utf8_encode($lista->SERVICIO_2))}}', SERVICIO_3:'{{trim(utf8_encode($lista->SERVICIO_3))}}', SERVICIO_4:'{{trim(utf8_encode($lista->SERVICIO_4))}}', SERVICIO_5:'{{trim(utf8_encode($lista->SERVICIO_5))}}', FACTURA_1:'{{trim(utf8_encode($lista->FACTURA_1))}}', VALOR_1:'{{trim(utf8_encode($lista->VALOR_1))}}', FACTURA_2:'{{trim(utf8_encode($lista->FACTURA_2))}}', VALOR_2:'{{trim(utf8_encode($lista->VALOR_2))}}', FLETE:'{{trim($lista->FLETE)}}', PESO_NETO:'{{trim($lista->PESO_NETO)}}', PESO_BRUTO:'{{trim($lista->PESO_BRUTO)}}', DOC_TRANSPORTE:'{{trim(utf8_encode($lista->DOC_TRANSPORTE))}}', REFERENCIA:'{{trim(utf8_encode($lista->REFERENCIA))}}', NOMBRE:'{{trim(utf8_encode($lista->NOMBRE))}}', MT:'{{trim(utf8_encode($lista->MT))}}', VIN_SERIAL:'{{trim(utf8_encode($lista->VIN_SERIAL))}}', COD_COLOR:'{{trim(utf8_encode($lista->COD_COLOR))}}', COLOR:'{{trim(utf8_encode($lista->COLOR))}}', MOTOR:'{{trim(utf8_encode($lista->MOTOR))}}', ANO_MODELO:'{{trim($lista->ANO_MODELO)}}', FECHA_PRODUCCION:'{{trim($lista->FECHA_PRODUCCION)}}', SERVICIO_1:'{{trim(utf8_encode($lista->SERVICIO_1))}}', SERVICIO_2:'{{trim(utf8_encode($lista->SERVICIO_2))}}', SERVICIO_3:'{{trim(utf8_encode($lista->SERVICIO_3))}}', SERVICIO_4:'{{trim(utf8_encode($lista->SERVICIO_4))}}', SERVICIO_5:'{{trim(utf8_encode($lista->SERVICIO_5))}}', SERVICIO_6:'{{trim(utf8_encode($lista->SERVICIO_6))}}', SERVICIO_7:'{{trim(utf8_encode($lista->SERVICIO_7))}}', SERVICIO_8:'{{trim(utf8_encode($lista->SERVICIO_8))}}', FACTURA_1:'{{trim(utf8_encode($lista->FACTURA_1))}}', FECHA_FACTURA_1:'{{trim(utf8_encode($lista->FECHA_FACTURA_1))}}', TERMINO_DE_NEGOCIACION:'{{trim(utf8_encode($lista->TERMINO_DE_NEGOCIACION))}}', MONEDA_FACTURA:'{{trim(utf8_encode($lista->MONEDA_FACTURA))}}', LUGAR_DE_ENTREGA:'{{trim(utf8_encode($lista->LUGAR_DE_ENTREGA))}}', FORMA_DE_ENVIO:'{{trim(utf8_encode($lista->FORMA_DE_ENVIO))}}', NATURALEZA_TRANSACCION:'{{trim(utf8_encode($lista->NATURALEZA_TRANSACCION))}}', ADMINISTRACION_DE_INGRESOS:'{{trim(utf8_encode($lista->ADMINISTRACION_DE_INGRESOS))}}', VALOR_1:'{{trim(utf8_encode($lista->VALOR_1))}}', FACTURA_2:'{{trim(utf8_encode($lista->FACTURA_2))}}', VALOR_2:'{{trim(utf8_encode($lista->VALOR_2))}}', FLETE:'{{trim($lista->FLETE)}}', MONEDA_FLETE:'{{trim($lista->MONEDA_FLETE)}}', OTROS_GASTOS:'{{trim($lista->OTROS_GASTOS)}}', MONEDA_OG:'{{trim($lista->MONEDA_OG)}}',  GASTO_ORIGEN_FOB:'{{trim($lista->GASTO_ORIGEN_FOB)}}', MONEDA_GO_FOB:'{{trim($lista->MONEDA_GO_FOB)}}', PESO_NETO:'{{trim($lista->PESO_NETO)}}', PESO_BRUTO:'{{trim($lista->PESO_BRUTO)}}', FORMA_DE_PAGO:'{{trim($lista->FORMA_DE_PAGO)}}', PAIS_ORIGEN:'{{trim($lista->PAIS_ORIGEN)}}', MODALIDAD:'{{trim($lista->MODALIDAD)}}', ACUERDO_COMERCIAL:'{{trim($lista->ACUERDO_COMERCIAL)}}', },
            @endforeach ];

    hot2 = new Handsontable(container, {
        data: model2,
        startRows: 5,
        startCols: 4,
        stretchH: 'all',
        height:450,
        currentRowClassName: 'currentRow',
        currentColClassName: 'currentCol',
        //colWidths: 100,	
        rowHeaders: true,
        language: 'es-ES',
        colHeaders: [/*'ID FACT',*/ 'ERROR STATUS', 'SH', 'DOC TRANSPORTE', 'REFERENCIA', 'NOMBRE', 'MT', 'VIN SERIAL', 'COD COLOR', 'COLOR', 'MOTOR', 'ANO MODELO', 'FECHA PRODUCCION', 'SERVICIO 1', 'SERVICIO 2', 'SERVICIO 3', 'SERVICIO 4', 'SERVICIO 5', 'SERVICIO 6', 'SERVICIO 7', 'SERVICIO 8', 'FACTURA 1', 'FECHA FACTURA 1', 'TERMINO DE NEGOCIACION', 'MONEDA FACTURA', 'LUGAR DE ENTREGA', 'FORMA DE ENVIO', 'NATURALEZA TRANSACCION', 'ADMINISTRACION DE INGRESOS', 'VALOR 1', 'FACTURA 2', 'VALOR 2', 'FLETE', 'MONEDA FLETE', 'OTROS GASTOS', 'MONEDA OG', 'GASTO ORIGEN FOB', 'MONEDA GO FOB', 'PESO NETO', 'PESO BRUTO', 'FORMA DE PAGO' , 'PAIS ORIGEN' , 'MODALIDAD' , 'ACUERDO COMERCIAL'],
        columns: [
            //{data: 'ID_FACT'},
            {data: 'ERROR_STATUS'},
            {data: 'SH'},
            {data: 'DOC_TRANSPORTE'},
            {data: 'REFERENCIA'},
            {data: 'NOMBRE'},
            {data: 'MT'},
            {data: 'VIN_SERIAL'},
            {data: 'COD_COLOR'},
            {data: 'COLOR'},
            {data: 'MOTOR'},
            {data: 'ANO_MODELO'},
            {data: 'FECHA_PRODUCCION'},
            {data: 'SERVICIO_1'},
            {data: 'SERVICIO_2'},
            {data: 'SERVICIO_3'},
            {data: 'SERVICIO_4'},
            {data: 'SERVICIO_5'},
            {data: 'SERVICIO_6'},
            {data: 'SERVICIO_7'},
            {data: 'SERVICIO_8'},
            {data: 'FACTURA_1'},
            {data: 'FECHA_FACTURA_1'},
            {data: 'TERMINO_DE_NEGOCIACION'},
            {data: 'MONEDA_FACTURA'},
            {data: 'LUGAR_DE_ENTREGA'},
            {data: 'FORMA_DE_ENVIO'},
            {data: 'NATURALEZA_TRANSACCION'},
            {data: 'ADMINISTRACION_DE_INGRESOS'},
            {data: 'VALOR_1'},
            {data: 'FACTURA_2'},
            {data: 'VALOR_2'},
            {data: 'FLETE'},
            {data: 'MONEDA_FLETE'},
            {data: 'OTROS_GASTOS'},
            {data: 'MONEDA_OG'},
            {data: 'GASTO_ORIGEN_FOB'},
            {data: 'MONEDA_GO_FOB'},
            {data: 'PESO_NETO'},
            {data: 'PESO_BRUTO'},
            {data: 'FORMA_DE_PAGO'},
            {data: 'PAIS_ORIGEN'},
            {data: 'MODALIDAD'},
            {data: 'ACUERDO_COMERCIAL'}
        ],
        search: true,
        dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
        filters: true,
        sortIndicator: true,
        columnSorting: true,
        manualColumnResize: true,
        minSpareRows: 1,

        fixedRowsTop: 0,
        fixedColumnsLeft: 2

    });
    /*hot2.selectCell(0, 1);
    var exportPlugin = hot2.getPlugin('exportFile');
    Handsontable.Dom.addEvent(searchFiled, 'keyup', function (event) {
        var queryResult2 = hot2.search.query(this.value);
        //console.log(queryResult);
        hot2.render();

    });
    excelGrid.addEventListener('click', function () {
        exportPlugin.downloadFile('csv', {
            exportHiddenRows: true, // default false, exports the hidden rows
            exportHiddenColumns: true, // default false, exports the hidden columns
            columnHeaders: true, // default false, exports the column headers
            rowHeaders: true, // default false, exports the row headers
            columnDelimiter: ';',
            filename: 'MyFile'});
    });
*/

</script>