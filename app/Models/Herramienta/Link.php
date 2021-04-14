<?php

namespace App\Models\Herramienta;
use App\Models\Herramienta;
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

    function validateLinks($request){
        try{

           //dd($request->all()); 
            $producto = strtolower($request->producto);  
            $idUser =  Auth()->user()->id;
            //$chain = encrypt($fechaActual); 

            $link = encrypt($idUser,$producto);
              //dd($link);
            $existProductClient = Link::where([['id_user',$idUser],['estado','ACTIVO'],['producto',$producto]])->count();

            if($existProductClient >= 1){
               return 'existe';
            }else{
                $saveProd = new Link();
                $saveProd->id_user          = $idUser;
                $saveProd->link             = $link;
                $saveProd->producto         = $producto;
                $saveProd->valor            = $request->costo;
                $saveProd->impuesto         = 0;
                $saveProd->valor_total      = $request->costo;
                $saveProd->porcentaje       = 0;
                $saveProd->id_tipo_moneda   = 1;
                $saveProd->estado           = 'ACTIVO';
                $saveProd->id_modelo        = 1;
                $saveProd->created_at       = Carbon::now();
                $saveProd->save();

                return 200;
            }

        }catch(\Exeption $e){
            dd($e->getMessage());
        }
    }
    
    function listLinkXclient(){
        $idUser =  Auth()->user()->id;

        $list = Link::where(['id_user',$idUser])->get();
        return $list;
    }
}
