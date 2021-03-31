<?php

namespace App\Http\Controllers;

use Yajra\Datatables\Datatables;
use Illuminate\Http\Request;
use App\Models\Admin;
use Carbon\Carbon;
use App\User;
use DB;

class AdminController extends Controller
{
    public function listUser(){      
        return view('admin/listUser') ; 
    }

    public function dataTableUser(){     
        //die('dataT');      
        //$roles = Rol::orderBy('name','ASC')->paginate(10); 
        $users = User::select(['id','name','email'])->where('estado','=',1);
        //return view('auth/listRol');    
        return Datatables::of($users)->make(true);
    }

    public function createUser(){
        return view('admin/createUser');  
    }

    public function saveUser(Request $request){
      //  dd($request->all());
        $user = new User($request->all());
        $user->estado=1;
        $user->role_id=0;
        $user->password = bcrypt($request->password);
        $user->save();
        //Flash::success("Se ha creado el usuario ". $user->name. " de forma correcta");
        return "Se ha creado el usuario ". $user->name. " de forma correcta";
    }

    public function disableUser(Request $request){            
       $idUser = $request->id;
       $newState =0;
       $user = User::find($idUser);     
       $user->estado =$newState;
       $user->save();
        //Flash::error("El usuario ". $user->name. " se ha deshabilitado de forma correcta");
        return "El usuario ". $user->name. " se ha deshabilitado de forma correcta";
    }
    
    public function editUser(Request $request){            
        $idUser = $request->id; 
        $user = User::find($idUser);  
        return view('admin/editUser',compact('user'));
    }

    public function updateUser(Request $request){   
        
        $idUser = $request->id; 
        $user = User::find($idUser); 
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();
        
        return "El usuario ". $user->name. " se ha actualizado de forma correcta";
    }

    public function relateUser(Request $request){               
       $idUser = $request->id;     
       $user = User::find($idUser);      
       $roles = Admin\Role::all(); 
       //dd($roles);                 
       return view('admin/relateUser',compact('user','roles'));        
    }

    public function updateUserRol(Request $request){          
        $idUser = $request->idU; 
        $idRol = $request->idR; 

        $rolMenu = DB::table('tbl_GLOBAL_USER_ROL')                          
                ->where('id_user','=',$idUser)
                ->where('id_rol','=',$idRol)
                ->get();

        $count = count($rolMenu);

        if($count==0)
        {
            $insertRolUser = DB::table('tbl_GLOBAL_USER_ROL')->insert([
                            'id_user'       =>  $idUser,
                            'id_rol'       =>  $idRol,
                            'created_at'    =>  Carbon::now(),
                            'updated_at'    =>  Carbon::now()
                                ]);
        }else
        {
             $deleteRolUser = DB::table('tbl_GLOBAL_USER_ROL')
                       ->where('id_rol','=',$idRol)
                       ->where('id_user','=',$idUser)
                       ->delete();
        }     
        //return view('auth/relateUser',compact('user','roles'));        
    }

    public function listRol(){   
        return view('admin/listRol');    
    }

    public function dataTableRol(){   
        $roles = Admin\Role::select(['id','name','description'])->where('estado','=',1);        
        return Datatables::of($roles)->make(true);
    }

    public function createRol(){
        return view('admin/createRol');
    }

    public function saveRol(Request $request)
    {         
       $rol = new Admin\Role($request->all());
       $rol->estado = 1;
       $rol->save();       
       return "Se ha creado el rol ". $rol->name. " de forma correcta";
    }

    public function deleteRol(Request $request)
    {       
       $idRol = $request->id;
       $estado =0;
       $rol = Admin\Role::find($idRol);
       $rol->estado = $estado;
       $rol->save();
        //Flash::error("El rol ". $rol->name. " se ha deshabilitado de forma correcta");
        return "El rol ". $rol->name. " se ha deshabilitado de forma correcta"; 
    }

    public function editRol(Request $request)
    {           
        $idRol = $request->id; 
        $rol = Admin\Role::find($idRol);        
        return view('admin/editRol',compact('rol')); 
    }

    public function updateRol(Request $request)
    {  
        $idRol = $request->id; 
        $rol = Admin\Role::find($idRol);         
        $rol->name= $request->name;
        $rol->description= $request->description;
        $rol->save();
        //Flash::error("El rol ". $rol->name. " se ha actualizado de forma correcta");
        return "El rol ". $rol->name. " se ha actualizado de forma correcta";
    }

    public function relateRol(Request $request)
    {    
       $idRol = $request->id;        
       $rol = Admin\Role::find($idRol);
       $applications =  Admin\Application::all();          
       return view('admin/relateRol', compact('rol','applications'));
    } 

    public function listClientes(){
        $idUser = auth()->user()->id; 
        $filtro = 10;
        $idRol = auth()->user()->role_id;
        $users = User::all();
        
        return view('admin/vwListClientes',compact('users','filtro'));
    }

    function tbdyListClientes(Request $request){
   
        $accion = $request->accion; 
        $cantidadRegistros = $request->cantRegistro;

        if($accion=='inicial'){  
            $clientes = User::take($cantidadRegistros)->orderBy('name')->get();                            
            
        }elseif($accion=='filtro'){
            $clientes = User::take($cantidadRegistros)->orderBy('name')->get();
        }elseif($accion=='buscar'){
            
           // $clientes = User::take($cantidadRegistros)->->orderBy('name')->get();
            $clientes = DB::table('users')->where('name', 'like', '%'.$request->search.'%')->get();
           
        }
        if(count($clientes) !=0){
            return view('admin/vwTbdyListClientes',compact('clientes','filtro')); 
        }else{
            return '<h2>No se encontraron resultados<h2>';
        }
    }
}

