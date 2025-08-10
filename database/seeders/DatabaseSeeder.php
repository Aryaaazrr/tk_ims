<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\User\AdminSeeder;
use Database\Seeders\User\DokterSeeder;
use Database\Seeders\User\KasirSeeder;
use Database\Seeders\User\PetugasPendaftaranSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleAndPermissionSeeder::class,
            AdminSeeder::class,
            DokterSeeder::class,
            PetugasPendaftaranSeeder::class,
            KasirSeeder::class,
        ]);
    }
}
