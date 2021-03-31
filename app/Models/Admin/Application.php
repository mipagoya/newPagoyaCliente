<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $table = 'tbl_global_application';

    // public function modules()
    // {
    // 	return $this->belongsTo('App\Models\Admin\Module')->orderBy('application_id');
    // }
}
