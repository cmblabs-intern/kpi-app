<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kpi_assessment_details', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->float('score');
            $table->text('note')->nullable();

            $table->unsignedBigInteger('assessment_id');
            $table->unsignedBigInteger('metric_id');

            $table->foreign('assessment_id')->references('id')->on('kpi_assessments');
            $table->foreign('metric_id')->references('id')->on('kpi_metrics');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kpi_assessment_details');
    }
};
