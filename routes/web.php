<?php

// Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
// Route::post('login', 'Auth\LoginController@login');

 Route::get('/','FormularioController@linkInvalid');
//Route::get('form', 'ClienteController@linkPay');
Route::get('form', 'FormularioController@linkPay');
Route::post('procesaPago', 'FormularioController@processesPay');
Route::get('WSConsultarBitacoras', 'FormularioController@WSConsultarBitacoras');




