<?php

namespace App\Models\Cliente;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    protected $table ='tbl_global_documento';
    protected $fillable =['id'];
    public $timestamps = true;
}
