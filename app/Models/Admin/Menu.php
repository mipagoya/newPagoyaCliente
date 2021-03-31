<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $table = 'tbl_GLOBAL_MENU';

    public function roles()
    {
    	return $this->belongsToMany('App\Models\Admin\Role','tbl_GLOBAL_ROL_MENU');
    }

    public function sub_module()
    {
    	return $this->belongsTo('App\Models\Admin\SubModule')->orderBy('id_module');
    }
}
