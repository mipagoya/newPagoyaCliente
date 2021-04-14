<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
Use Exception; 
use DB;

class Menu extends Model
{
    protected $table = 'tbl_global_menu';
    protected $fillable =['id'];
    //public $timestamps = true;

    function listMenu(){
       
        $id_usuario = $role_id = Auth()->user()->id;
        $id_usuario_rol = $role_id = Auth()->user()->role_id;

        $get_menus = DB::table('tbl_global_rol_menu AS ROLM')
            ->join('tbl_global_menu AS MENU', 'ROLM.id_menu', '=', 'MENU.id')
            ->join('tbl_global_rol AS ROL', 'ROLM.id_rol', '=', 'ROL.id')
            ->join('tbl_global_user_rol AS UROL', 'ROL.id', '=', 'UROL.id_rol')
            ->join('users AS US', 'UROL.id_user', '=', 'US.id')
            ->join('tbl_global_sub_module AS SMOD', 'MENU.id_sub_module', '=', 'SMOD.id')
            ->join('tbl_global_module AS MODU', 'SMOD.id_module', '=', 'MODU.id')
            ->join('tbl_global_application AS APL', 'MODU.id_application', '=', 'APL.id')
            ->select(DB::raw('APL.name as aplicacion, APL.style as appStyle,
                            MODU.id as id_modulo, MODU.name as modulo, MODU.style as modStyle,
                            SMOD.id AS id_sumbodulo, SMOD.id_module, SMOD.name as submodulo, 
                            MENU.name as menu, MENU.ruta, MENU.id as idmenu, MENU.id_sub_module as id_submod_menu,
                            ROL.name, SMOD.id as id_submodulo, US.name, US.estado, US.email'))
            ->where('UROL.id_user', '=', $id_usuario)
            ->where('UROL.id_rol', '=', $role_id)
            ->where('US.estado', '=', '1')
            ->OrderBy('APL.id', 'ASC')
            ->OrderBy('MODU.id', 'ASC')
            ->OrderBy('SMOD.id', 'ASC')           
            ->get()
            ->toArray();

            return $get_menus;
    }

    function showMenu($id_submodulo){
        $id_usuario_rol = $role_id = Auth()->user()->role_id;
        
        $menus_modulos = DB::table('tbl_global_menu AS menu')
            ->join('tbl_global_rol_menu AS rmenu', 'menu.id', '=', 'rmenu.id_menu')
           ->select(DB::raw('menu.name as menuname , menu.ruta as ruta, 
                                rmenu.id_menu as idmenu, menu.id_sub_module as submid'))                
            ->where('id_rol', '=', $id_usuario_rol)
            ->where('id_sub_module', '=', $id_submodulo)
			->where('menu.estado', '=', '1')
            ->OrderBy('menu.id', 'ASC')                
            ->get();  

        return $menus_modulos;
    }

    function toListMenu(){

        $listMenu = DB::table('tbl_global_menu as M')
            ->join('tbl_global_sub_module as S','M.id_sub_module','S.id')
            ->select('M.id','M.name','M.estado','M.ruta','S.name as subMod')
            ->orderBy('id')->get();
        return $listMenu;
    }
}
