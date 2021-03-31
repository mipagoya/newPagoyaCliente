<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use DB;

class ClienteController extends Controller
{
    function listCli(){
       
        $list = User::all();
        dd($list);
    }
}
