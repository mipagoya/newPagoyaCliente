<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Admin;
use Carbon\Carbon;
Use Exception; 
use Response;
use App\User;
use DB;

class MenuController extends Controller
{
    public $_fechaActual; 

    public function __construct(){        
        $this->_fechaActual = Carbon::now();                
    }
    public function index(){
        $menu = new Admin\Menu();
        $get_menus = $menu->listMenu();   
        return view('layouts.contentAjax', compact("get_menus"));
    }

    public function mostrarmenu(Request $request){
        $id_submodulo = $request->submod_selected;       
        $menu = new Admin\Menu();
        $menus_modulos = $menu->showMenu($id_submodulo);             
        return Response::json($menus_modulos);
    }

    function toListMenu(){
        $menus = new Admin\Menu();
        $listMenu = $menus->toListMenu();
        $subModule = Admin\SubModule::orderBy('id')->get();
        return view('admin/menu',compact('listMenu','subModule'));
    }

    function saveMenu(Request $request){

        try{
           //dd($request->all());
            $name = ucwords(strtolower($request->name));
            $idSubModulo = $request->subModulo;
            $ruta = ucwords($request->ruta);
            $ruta = lcfirst(str_replace(" ","",$ruta));
            
            $menu = Admin\Menu::where([['id_sub_module',$idSubModulo],['name',$name]])->count();
            $exiRuta = Admin\Menu::where('ruta',$ruta)->count();
            //dd($name);
            if($menu != 0){ return "nombre";}

            if($exiRuta != 0){ return "ruta"; }
            $saveMenu = new Admin\Menu();
            $saveMenu->name = $name;
            $saveMenu->estado = 1;
            $saveMenu->ruta = $ruta;
            $saveMenu->id_sub_module = $idSubModulo;           
            $saveMenu->save();        
            
            return 200;        
        }catch(\Exeption $e){
            dd($e->getMessage());
        }
    }

    function actionMenu(Request $request){
        $action = $request->accion;
       // if($action == "edit")
    }

    function listApplication(){
        
        $applications = Admin\Application::all();
        return view('admin/application',compact('applications'));
    }

    function createAppMod(Request $request){
        try{
            dd($request->all());
            //  $name = ucwords(strtolower($request->name));
            //  $idSubModulo = $request->subModulo;
            //  $ruta = ucwords($request->ruta);
            //  $ruta = lcfirst(str_replace(" ","",$ruta));
             
            //  $menu = Admin\Menu::where([['id_sub_module',$idSubModulo],['name',$name]])->count();
            //  $exiRuta = Admin\Menu::where('ruta',$ruta)->count();
            //  //dd($name);
            //  if($menu != 0){ return "nombre";}
 
            //  if($exiRuta != 0){ return "ruta"; }
            //  $saveMenu = new Admin\Menu();
            //  $saveMenu->name = $name;
            //  $saveMenu->estado = 1;
            //  $saveMenu->ruta = $ruta;
            //  $saveMenu->id_sub_module = $idSubModulo;           
            //  $saveMenu->save();        
             
            //  return 200;        
         }catch(\Exeption $e){
             dd($e->getMessage());
         }
    }

    function listRolesPer(){       
        $roles = Admin\Role::all();
        return view('admin/role',compact('roles'));
    }

    // function saveRol(Request $request){
    //     dd($request->all());
    // }

    function asociateRol(Request $request){       
        //dd($request->all());
        $idRol   = $request->id;
        $nameRol = $request->name;

        $rolesMenu = new Admin\Role();
        $roleMenu = $rolesMenu->asociatedRolMenu();
        //dd($roleMenu);
        return view('admin/asociateRol',compact('idRol','nameRol','roleMenu'));
    }

    function asociateMenuRol(Request $request){
        
        $rolesMenu = new Admin\Role();
        $resul = $roleMenu = $rolesMenu->activeRolMenu($request);

    }
}
