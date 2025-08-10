<?php

namespace Database\Seeders\User;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class KasirSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $raws = User::factory()
            ->count(10)
            ->sequence(function (Sequence $sequence) {
                $i = $sequence->index + 1;

                return [
                    'name' => "Kasir {$i}",
                    'email' => "kasir{$i}@gmail.com",
                ];
            })
            ->make();

        $raws->each(function ($_raw) {
            $user = User::firstOrCreate([
                ...$_raw->toArray(),
                'password' => $_raw->password,
            ]);

            $user->assignRole(User::ROLE_KASIR);
        });
    }
}
