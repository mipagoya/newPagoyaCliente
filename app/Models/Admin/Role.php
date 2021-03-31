<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;



class Role extends Model
{
    protected $table='tbl_GLOBAL_ROL';

    protected $fillable = ['name','description','estado'];

    public function users()
    {
    	//return $this->belongsToMany('App\User','tbl_GLOBAL_ROL_MENU')->withTimestamps();
    	return $this->belongsToMany('App\User','tbl_GLOBAL_ROL_MENU');
    }

    public function menus()
    {
    	return $this->belongsToMany('App\Models\Admin\Menu','tbl_GLOBAL_ROL_MENU','id_rol','id_menu')->orderBy('id_sub_module');
    }
}

