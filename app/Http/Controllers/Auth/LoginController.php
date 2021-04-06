<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\emailClientValidate;
use App\Mail\MailNotify;

class LoginController extends Controller
{
    
    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    
    function register(){
        return view('auth/register2');
    }

    function existMail(Request $request){
        
        $validateEmail = User::where('email',$request->correo)->count();

        return $validateEmail;
    }
    
    function toRegister(Request $request){
       
        $now = new \DateTime();
        $fechaActual = $now->format('Y-m-d H:i:s');
        $email= strtolower($request->correo);
        $chain = encrypt($fechaActual);

        $saveCli = new User();
        $saveCli->name                   = strtolower($request->nombre .' '.$request->apellido);
        $saveCli->email                  = $email;
        $saveCli->password               = bcrypt($request->contrasena);      
        $saveCli->role_id                = 2;
        $saveCli->Identificacion         = $request->numDoc;
        $saveCli->token_email_verified   = $chain; 
        $saveCli->estado                 = 0;
        $saveCli->created_at             = Carbon::now();
        $saveCli->updated_at             = Carbon::now();
        $saveCli->save();
        $idUser =  $saveCli->id;      
       
      $result =  $this->validateEmailCli($email,$chain);      
      return $result;
    }

    function validateEmailCli($email,$chain){

        $url = url("/activateCli/active?cli=$chain");      
       // $email ='munozfino@gmail.com';
        $resultMail = Mail::to($email)->send(new emailClientValidate($url));         
        return 200;

    }

    // function testCorreo(){
    //     $url = "http://newpagoyalocal.com/activateCli/active?cli=eyJpdiI6IjJuSVViSDMrT0c1S2F6VHJOSXlWZXc9PSIsInZhbHVlIjoiRDNQTTIxekNhd0duYXlPODE5Rml6VzRuV25sMUJ6WEtFdVwvMXlvNEhZV289IiwibWFjIjoiZmRjODQ4YjlkYjEzYTM3M2ZlNjAwYTcyNjBjZjJhNTNmYjAwZTM0YjQyYjUzNmIxMDI5YWI3ZDRkZDUwOGRmZSJ9";
    //    return view('email.validateClent',compact('url'));
    // }
   
    
}
