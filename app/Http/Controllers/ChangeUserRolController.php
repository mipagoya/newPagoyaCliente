<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use DB;
use Illuminate\Http\Request;

class ChangeUserRolController extends Controller
{
    // ACTUALZAR ROL
    public function updaterol(Request $request){
        $new_rol = $request['idrol'];
        $id_user = Auth::user()->id;
        $update_rol= DB::table('USERS')
            ->where('id', $id_user)
            ->update(['role_id' => $new_rol]);
    }
}
