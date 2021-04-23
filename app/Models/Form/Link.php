<?php

namespace App\Models\Form;
use App\Models\Form;
use Carbon\Carbon;
Use Exception; 
use App\User;
use DB;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $table ='tbl_herramienta_link';
    protected $fillable =['id'];
    public $timestamps = false;

    function validateLink($link){
        //dd($link);
       try{
            $validateLinks = Link::where([['estado','ACTIVO'],['link',$link]])->take(1)->get();
            //dd($validateLinks);            
            return $validateLinks;
       }catch(\Exeption $e){
            return "ERROR";
       }
        
       
    }

}
