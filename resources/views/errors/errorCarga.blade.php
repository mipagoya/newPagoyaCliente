<div class='rechazado'>
    <label  class="alert alert-danger" style=' font-size: 13px'>
        @if($errors > 1)
            <h3>Existe {{$errors}} errores favor validar </h3>    
        @else        
            <h3>Existe {{$errors}} error favor validar </h3>
        @endif
    </label>  
</div>