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
            $table->foreignId('assessment_id')->constrained('kpi_assessments')->onDelete('cascade');
            $table->foreignId('matrix_id')->constrained('kpi_metrics')->onDelete('cascade');
            $table->decimal('score', 5, 2);
            $table->timestamps();
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
