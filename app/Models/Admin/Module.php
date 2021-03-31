<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $table = 'tbl_GLOBAL_MODULE';


    // public function application()
    // {
    // 	//Pertenece a uno  
    //     return $this->belongsTo('App\Models\Admin\Application');
    // 	//return $this->belongsTo('App\Models\Admin\Application')->orderBy('name');
    // }
}
