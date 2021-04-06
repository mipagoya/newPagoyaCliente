<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use Carbon\Carbon;
use App\User;
use DB;

class ClienteController extends Controller
{
    function listCli(){
       
        $list = User::all();
        dd($list);
    }  
    function activateCli(Request $request){
       //dd($request);
        $tokeEmail = $request->cli;

        $stateUser = User::select('id','email')->where('token_email_verified',$tokeEmail)
        //->where([['estado',0],['email_verified',NULL]])->take(1)
        ->get();

        if(count($stateUser)>= 1){
           $id = $stateUser[0]->id; 
           $email = $stateUser[0]->email; 
            $activeClient = User::where('id',$id)->update([
                'estado' => 1 , 'email_verified' => Carbon::now()
            ]);
            return redirect()->route('userActive', ['email' => $email]);          
        }
    }

    function userActive(Request $request){
        $email = $request->email;
        $text = "El usuario ".$email.", fue activado con exito favor ingresar con usuario y contraseña";
        return view('cliente/userActive',compact('text'));
    }

    function dataNegocio(){
        return view('cliente/dataNegocio');
    }

    function dataBill(){
        dd('Pendiente');
    }

    function adjuntaDoc(){
        $idUser = auth()->user()->id;  
        $tipoDoc = Cliente\TipoDocumento::where('estado',1)->orderBy('name')->get();
        $exisDocument = Cliente\Documento::where('id_user',$idUser)->get();
        
        return view('cliente/adjDocumento',compact('tipoDoc','exisDocument'));
    }

    function saveDocument(Request $request){  

        $identificacion = auth()->user()->Identificacion;  
        $idUser = auth()->user()->id;  
        $id_tipoDoc = $request->tipeDocument;
        
        $file = $request->archivo;
        
        $ext = $file->getClientOriginalExtension();
        $nameOriginal = $file->getClientOriginalName();
        $nameDocSinExt = str_replace(".pdf","",strtolower($nameOriginal));
        $destinationPath =  'gestionDocumental/'.$identificacion.'/'.$id_tipoDoc;

        $exisDocument = Cliente\Documento::where('estado',1)->where([['name_doc',$nameDocSinExt],['id_tipoDoc',$id_tipoDoc]])->count();
        if($exisDocument === 0){ 
            $newName = $nameDocSinExt.'.pdf';

            $saveDoc = new Cliente\Documento();
            $saveDoc->id_user       = $idUser;
            $saveDoc->id_tipoDoc    = $id_tipoDoc;
            $saveDoc->name_doc      = $nameDocSinExt;          
            $saveDoc->ruta          = $destinationPath.'/'.$newName;
            $saveDoc->estado        = 1;
            $saveDoc->save();           
            $id = $saveDoc->id;   
            $upload_success = $file->move($destinationPath, $newName , 0777,true);// Permisos 0777,true
            return 200;

        }else{
            return 'duplicado';
        }
    }

    function dataVeryfi(){
        dd('Pendiente');
    }
}
