<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        Role::truncate();
        Permission::truncate();
        DB::table('model_has_roles')->truncate();
        DB::table('model_has_permissions')->truncate();
        DB::table('role_has_permissions')->truncate();

        $roles = ['admin', 'petugas_pendaftaran', 'dokter', 'kasir'];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        $petugasPendaftaranRole = Role::where(['name' => 'petugas_pendaftaran'])->first();
        $petugasPendaftaranPermission = [
            'pasien-create',
            'pasien-read',
            'pasien-update',
            'pasien-delete',
        ];

        foreach ($petugasPendaftaranPermission as $permissionName) {
            $permission = Permission::create(['name' => $permissionName]);
            $petugasPendaftaranRole->givePermissionTo($permission);
        }

        $dokterRole = Role::where(['name' => 'dokter'])->first();
        $dokterPermissions = [
            'tindakan_medis-create',
            'tindakan_medis-read',
            'tindakan_medis-update',
            'tindakan_medis-delete',
        ];

        foreach ($dokterPermissions as $permissionName) {
            $permission = Permission::create(['name' => $permissionName]);
            $dokterRole->givePermissionTo($permission);
        }

        $kasirRole = Role::where(['name' => 'kasir'])->first();
        $kasirPermissions = [
            'transaksi-create',
            'transaksi-read',
            'transaksi-update',
            'transaksi-delete',
        ];

        foreach ($kasirPermissions as $permissionName) {
            $permission = Permission::create(['name' => $permissionName]);
            $kasirRole->givePermissionTo($permission);
        }

        $adminPermissions = [
            'akun-create',
            'akun-read',
            'akun-update',
            'akun-delete',
            'pegawai-create',
            'pegawai-read',
            'pegawai-update',
            'pegawai-delete',
            'obat-create',
            'obat-read',
            'obat-update',
            'obat-delete',
        ];

        $adminRole = Role::where(['name' => 'admin'])->first();
        foreach ($adminPermissions as $permissionName) {
            $permission = Permission::create(['name' => $permissionName]);
            $adminRole->givePermissionTo($permission);
        }

        $allPermissions = Permission::all();
        $adminRole->syncPermissions($allPermissions);

        Schema::enableForeignKeyConstraints();
    }
}
