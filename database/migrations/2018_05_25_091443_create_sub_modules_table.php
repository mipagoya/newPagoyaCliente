<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ADMIN_sub_modules', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('style');
            $table->unsignedInteger('module_id');
            //$table->foreign('module_id')->references('id')->on('ADMIN_modules');
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
        Schema::dropIfExists('ADMIN_sub_modules');
    }
}
