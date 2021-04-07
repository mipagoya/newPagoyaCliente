<?php

Route::get('/','Auth\LoginController@showLoginForm');
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');

Route::post('login', 'Auth\LoginController@login');
Route::get('register', 'Auth\LoginController@register');
Route::post('saveRegister', 'Auth\LoginController@toRegister');
Route::post('validaMail', 'Auth\LoginController@existMail');

Route::get('testCorreo', 'Auth\LoginController@testCorreo');
Route::get('activateCli/{VistaCargar}', 'ClienteController@activateCli');
Route::get('userActive', 'ClienteController@userActive')->name('userActive');
Route::get('listClientesTes', 'AdminController@listClientesTes');  

//grupuGroup route atentications
Route::group(['middleware' => ['auth']], function(){
    
    //Route::auth();
    Route::post('logout', 'Auth\LoginController@logout')->name('logout');    
    // Password Reset Routes...
    Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');

    //Route::get('home', function () {  return view('layouts.contentAjax'); });
    Route::get('home', 'MenuController@index')->name('PagPrincipal');
    Route::get('403',  function () {  return view('errors/403');});
    Route::get('welcome', function () { return view('welcome'); })->name('welcome');
       
    Route::group(['middleware' => 'admin'], function() {
        Route::get('listUser', 'AdminController@listUser');
        Route::get('listClientes', 'AdminController@listClientes');        
        Route::post('tbdyListClientes', 'AdminController@tbdyListClientes'); 
    });

    //Cambiar ROL:
    Route::post('updaterol', 'ChangeUserRolController@updaterol');    
    // MENUS Una vez selecciona el Submódulo
    Route::post('mostrarmenu', 'MenuController@mostrarmenu');
    
   

    //Leer buzon de correo
    //Route::get('CronLeerCorreo', 'LeerCorreoController@CronLeerCorreo');
    Route::post('abrirCorreo', 'LeerCorreoController@abrirCorreo');
    Route::post('ReenviarCorreoTraz','LeerCorreoController@ReenviarCorreoTraz');
    Route::get('datNegocio', 'ClienteController@dataNegocio');
    Route::get('datcuenta', 'ClienteController@dataBill');
    Route::get('datadjDoc', 'ClienteController@adjuntaDoc');
    Route::post('saveDoc', 'ClienteController@saveDocument');
    Route::get('veryfiData', 'ClienteController@dataVeryfi');
   

});

