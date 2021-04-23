<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Herramienta;
use Carbon\Carbon;
Use Exception; 
use Response;
use App\User;
use DB;

class HerramientasController extends Controller
{
    function createdLink(){
        return view('herramienta/link');
    }

    function createdLinkProduct(Request $request){
        //dd($request->all());    
        $listLinks = new Herramienta\Link();
        $result = $listLinks->validateLinks($request);
        return $result;      
    }

    function listLink(){
         $idUser =  Auth()->user()->id;
         $liskLink = Herramienta\Link::where('id_user',$idUser)->get();
        
         return view('herramienta/listLink',compact('liskLink'));
    }
    
    function inactiveLink(Request $request){

        //dd($request->all());
        $idUser =  Auth()->user()->id;
        $estadoLink = Herramienta\Link::where([ ['id',$request->idLink], ['id_user',$idUser], ['estado','ACTIVO'] ])->count();
        //dd(  $estadoLink );
        //$estado = "";
        if($estadoLink == 0){
            $estado = "ACTIVO";
        }else{
            $estado = "INACTIVO";
        }
        //dd($estado);
        $updateEstado = Herramienta\Link::where([['id',$request->idLink], ['id_user',$idUser]])->update(
            ['estado' => $estado]
        );
        return 200;
    }

    function descriptionBtnPay(Request $request){
        
        $liskLink = Herramienta\Link::where([['id',$request->idLink],['estado','ACTIVO']])->get();
        if(count($liskLink) >= 1 ){
            return view('herramienta/descriptionBtnPay',compact('liskLink'));
        }
        return "<p class='text-danger'>El link esta inactivo</p>";
    }

    function linkPay(Request $request){
        dd($request->all());
    }
}
