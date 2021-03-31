<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Admin\Role;
use DB;
use Response;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $id_usuario = $role_id = Auth()->user()->id;
        $id_usuario_rol = $role_id = Auth()->user()->role_id;
        $role = Role::findOrFail($id_usuario_rol);
        $role->menus;
        
        //dd($role->name);
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
            //->toSql();
            ->get()
            ->toArray();
        return view('layouts.contentAjax', compact("get_menus"));
    }

    // Imprime la sopciones del menú segun el Sumódulo y Rol seleccionado
    public function mostrarmenu(Request $request){
        $id_usuario_rol = $role_id = Auth()->user()->role_id;
        $id_submodulo = $request->submod_selected;
        $menus_modulos = DB::table('tbl_global_menu AS menu')
            ->join('tbl_global_rol_menu AS rmenu', 'menu.id', '=', 'rmenu.id_menu')
           ->select(DB::raw('menu.name as menuname , menu.ruta as ruta, 
                                rmenu.id_menu as idmenu, menu.id_sub_module as submid'))                
            ->where('id_rol', '=', $id_usuario_rol)
            ->where('id_sub_module', '=', $id_submodulo)
			->where('menu.estado', '=', '1')
            ->OrderBy('menu.id', 'ASC')                
            ->get();
            
        /*$menu_user = "";
        foreach ($menus_modulos as $resultado) {
            $menu_user.= $resultado->menuname.' / ';
        }
        echo $menu_user;*/
        return Response::json($menus_modulos);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
