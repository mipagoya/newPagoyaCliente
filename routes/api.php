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

Route::group(['middleware' => ['api-tramitex']], function(){


    Route::post('integracionTramitex/fact','IntegracionTramitexController@insertFactura');
    Route::post('integracionTramitex/fact/{fact}','IntegracionTramitexController@updateFactura');
    Route::post('integracionTramitex/sae','IntegracionTramitexController@insertSae');
    Route::post('integracionTramitex/sae1/{sae}','IntegracionTramitexController@updateSae1');
    Route::post('integracionTramitex/sae2/{sae}','IntegracionTramitexController@updateSae2');

    Route::post('integracionTramitex/plan','IntegracionTramitexController@insertPlanilla');

    Route::post('integracionTramitex','IntegracionTramitexController@store');
    Route::post('integracionTramitex/{do}','IntegracionTramitexController@update');

    //Route::post('integracionTramitex/saeFact','IntegracionTramitexController@insertSaeFact');
    // Se restringen las turas del array excep 
    // Route::resource('integracionTramitex','IntegracionTramitexController',
    //                 ['except' => ['index','create','show','edit','destroy']]
    //                 );
    
});
