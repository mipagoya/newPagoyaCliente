<?php

namespace App\Models\Cliente;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
Use Exception; 
use DB;

class TipoDocumento extends Model
{
    protected $table ='tbl_global_tipoDocumento';
    protected $fillable =['id'];
    public $timestamps = true;
}
