<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;



class Role extends Model
{
    protected $table='tbl_global_rol';

    protected $fillable = ['name','description','estado'];

    public function users()
    {
    	//return $this->belongsToMany('App\User','tbl_global_rol_MENU')->withTimestamps();
    	return $this->belongsToMany('App\User','tbl_global_rol_menu');
    }

    public function menus()
    {
    	return $this->belongsToMany('App\Models\Admin\Menu','tbl_global_rol_menu','id_rol','id_menu')->orderBy('id_sub_module');
    }
}

