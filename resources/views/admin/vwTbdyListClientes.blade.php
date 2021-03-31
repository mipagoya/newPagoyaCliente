@foreach($clientes as $index => $item)
    <tr>        
        <td>{{trim($item->id)}}</td>
        <td>{{trim($item->name)}}</td>
        <td>{{trim($item->email)}}</td>
        <td>{{trim($item->Identificacion)}}</td>
        <td>{{trim($item->email_verified)}}</td>
        <td>{{trim($item->estado)}}</td>
        <td><button class="btn btn-outline-warning icon-edit"  style="padding:3px;margin: 3px;" title="Editar" ></button></td>
        <td><button class="btn btn-outline-danger icon-cross"  style="padding:3px;margin: 3px;" title="Editar" ></button></td>
    </tr>
@endforeach