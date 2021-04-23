<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;
use Carbon\Carbon;
use App\User;
use DB;


class FormularioController extends Controller
{

    private $_fechaActual ='';    
    private $_SERVICE_URL = "";    
    private $_parameterUser = array();     

    public function __construct() {               
          
        $this->_fechaActual = Carbon::now();

        $this->_parameterUser = [
            'usuario'		=>	'blu.logistics@blulogistics.com',
            'contrasena'	=>	'blu.2018'
        ];        
    }

    function linkInvalid(){
        // $user = User::all();
        // dd($user);
        return view('form/linkNoValido');
    }

    function linkPay(Request $request){
       //dd(isset($request->id));
        if(!isset($request->id)){
            return view('form/linkNoValido');
        }
        $link = $request->id;
        $stateLink = new Form\Link();
        $links = $stateLink->validateLink($link);

        if($links == "ERROR"){
            return view('form/linkNoValido'); 
        }elseif(count($links) == 0){
            return view('form/linkNoValido');
        }else{
            return view('form/linkPago',compact('links'));
        }       
    }

    function processesPay(Request $request){
        dd($request->all());
    }


    public  function wsAgenciamientoAduanero($metodo,$parametros){
               
        $this->_SERVICE_URL='http://190.60.219.151/LRPWS/agenciamientoaduanero/WSAgenciamientoAduanero.svc?wsdl';   

        try{

           $cliente = new \SoapClient($this->_SERVICE_URL);   
            
        //  dd($cliente->__getFunctions());
       dd($cliente->__getTypes());
        //dd($parametros);
           $respuestaWS = $cliente->$metodo($parametros); 
           //dd($respuestaWS);
           return $respuestaWS;
        
        }catch(SoapFault $fault){ 
             echo 'Erro en el metodo '.$metodo .' del WS wsAgenciamientoAduanero ' .$fault; 
        }

    }

    public function WSConsultarBitacoras(Request $request){
        
        //$metodo = $request->url;       
        $metodo = 'WSConsultarBitacoras';
        $tipoConsulta = 2;  // Parametro se recibe desde consulta     

        $parametros = [
            'tipoConsulta'=> $tipoConsulta
        ];
          
        $respuestaWS = $this->wsAgenciamientoAduanero($metodo,array_merge($this->_parameterUser,$parametros)); 
    dd( $respuestaWS);
    }
}
