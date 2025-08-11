import { PegawaiDialog } from '@/components/pegawai/pegawai-dialog';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type Pegawai } from '@/types/pegawai';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { columns } from './column';

interface PageProps {
    pegawai: Pegawai[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: '/master-data',
    },
    {
        title: 'Pegawai',
        href: '/master-data/pegawai',
    },
];

export default function PegawaiIndex() {
    const { pegawai } = usePage().props as unknown as PageProps;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedPegawai, setSelectedPegawai] = useState<Pegawai | undefined>();
    const [mode, setMode] = useState<'create' | 'edit'>('create');

    const handleAdd = () => {
        setMode('create');
        setSelectedPegawai(undefined);
        setDialogOpen(true);
    };

    const handleEdit = (pegawai: Pegawai) => {
        setMode('edit');
        setSelectedPegawai(pegawai);
        setDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(route('pegawai.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Pegawai" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold">Daftar Pegawai</h1>
                            <p className="text-muted-foreground">
                                Daftar pegawai yang terdaftar dalam sistem. Anda dapat mengelola data pegawai di sini.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button onClick={handleAdd}>Tambah Pegawai</Button>
                        </div>
                    </div>
                    <DataTable
                        columns={columns({
                            onEdit: handleEdit,
                            onDelete: handleDelete,
                        })}
                        data={pegawai}
                    />
                </div>
            </div>

            <PegawaiDialog open={dialogOpen} onOpenChange={setDialogOpen} pegawai={selectedPegawai} mode={mode} />
        </AppLayout>
    );
}
