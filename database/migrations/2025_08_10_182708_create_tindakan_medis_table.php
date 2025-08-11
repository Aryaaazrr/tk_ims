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
        Schema::create('tindakan_medis', function (Blueprint $table) {
            $table->id('id_tindakan_medis');
            $table->string('nama_tindakan', 100);
            $table->text('deskripsi')->nullable();
            $table->decimal('biaya', 10, 2)->default(0.00);
            $table->enum('jenis_tindakan', ['rawat_jalan', 'rawat_inap'])->default('rawat_jalan');
            $table->foreignId('id_pasien')->constrained('pasien', 'id_pasien')->onDelete('cascade');
            $table->foreignId('id_obat')->nullable()->constrained('obat', 'id_obat')->onDelete('set null');
            $table->foreignId('id_users')->constrained('users', 'id_users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tindakan_medis');
    }
};
