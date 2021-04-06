<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Ruta de integracion con tramitex Exportaciones maritimas
// Route::resource('integracionTramitex','IntegracionTramitexController');

// Route::group(['middleware' => ['api-tramitex']], function(){
//     Route::post('integracionTramitex/fact','IntegracionTramitexController@insertFactura');
  
// });
