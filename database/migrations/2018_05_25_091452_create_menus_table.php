<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ADMIN_menus', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');            
            $table->string('ruta');
            $table->unsignedInteger('sub_module_id');
            $table->boolean('state');
            //$table->foreign('sub_module_id')->references('id')->on('ADMIN_sub_modules');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ADMIN_menus');
    }
}
