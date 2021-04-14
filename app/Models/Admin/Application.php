<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
Use Exception; 
use DB;

class Application extends Model
{
    protected $table = 'tbl_global_application';
    protected $fillable =['id'];
}
