<?php
namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
Use Exception; 
use DB;

class Role extends Model
{
    protected $table='tbl_global_rol';
    protected $fillable = ['id','name','description','estado'];

   function asociatedRolMenu(){
        try{

            $roleMenu = DB::table('tbl_global_menu AS me')
                ->leftjoin('tbl_global_rol_menu AS rm','me.id','rm.id_menu')
                ->leftjoin('tbl_global_rol AS ro','rm.id_rol','ro.id')
                ->select('me.id AS idMenu','me.name AS menu','rm.id_rol','ro.name AS rol')
                ->orderBy('rm.id_rol')->get();
            return $roleMenu;
        }catch(\Exeption $e){
            dd($e->getMessage());
        }
   }

   function activeRolMenu($request){
       try{
            $now = new \DateTime();	
            $fecha = $now->format('Y-m-d H:i:s');
            $roleMenu = DB::table('tbl_global_rol_menu')
                ->where([ ['id_rol',$request->idRol],['id_menu',$request->idMenu]])->count();
            
            if($roleMenu >= 1){
                $deleteRoleMenu = DB::table('tbl_global_rol_menu')
                ->where([ ['id_rol',$request->idRol],['id_menu',$request->idMenu]])->delete();
                return 200;
            }else{
                $insert = DB::table('tbl_global_rol_menu')->insert([
                    'id_menu' => $request->idMenu,  'created_at' => $fecha, 
                    'id_rol'  => $request->idRol,   'updated_at' => $fecha                                 
                ]);
                return 200;
            }

       }catch(\Exeption $e){
           dd($e->getMessage());
       }
   }
}

