<?php

namespace App\Models\Admin;
use Carbon\Carbon;
Use Exception; 
use DB;

use Illuminate\Database\Eloquent\Model;

class SubModule extends Model
{
    protected $table = 'tbl_global_sub_module';
    protected $fillable =['id'];
    public $timestamps = true;
    
}
