<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
}; 
//buat tabel projects
// dengan kolom id, name, description, user_id, start_date, end_date, timestamps
// user_id berelasi dengan tabel users, dengan onDelete cascade
// ini berarti jika user dihapus, maka project yang terkait juga akan dihapus
// gunakan foreignId untuk user_id yang berelasi dengan tabel users
// gunakan timestamps untuk created_at dan updated_at
// gunakan date untuk start_date dan end_date
// gunakan text untuk description
// gunakan string untuk name
// gunakan id sebagai primary key
// gunakan foreign key untuk user_id yang berelasi dengan tabel users       