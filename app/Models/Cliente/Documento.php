<?php

namespace App\Models\Cliente;
use App\Models\Cliente;
use Carbon\Carbon;
Use Exception; 
use App\User;
use DB;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    protected $table ='tbl_global_documento';
    protected $fillable =['id'];
    public $timestamps = true;

    function listDocXuser(){
        try{
            $idUser =  Auth()->user()->id;

            $lisDocument = DB::table('tbl_global_documento AS doc')
                ->join('tbl_global_tipodocumento AS tdo','doc.id_tipoDoc','tdo.id')
                ->select('doc.id AS idDoc','doc.name_doc','doc.estado','doc.ruta','tdo.id AS idTdoc','tdo.name')
                ->where([ ['doc.estado',1],['doc.id_user',$idUser] ])->get();
            return  $lisDocument;
        }catch(\Exeption $e){
            dd($e->getMessage());
        }
    }
}
