<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class SubModule extends Model
{
    protected $table = 'tbl_GLOBAL_SUB_MODULE';

    public function module()
    {   	
    	//return $this->belongsTo('App\Models\Admin\Module')->orderBY('application_id');
    	return $this->belongsTo('App\Models\Admin\Module');
    }

     public function moduleDistinct()
    {   	
    	//return $this->belongsTo('App\Models\Admin\Module')->orderBY('application_id');
    	return $this->belongsTo('App\Models\Admin\Module')->distinct('id_module');
    }
}
