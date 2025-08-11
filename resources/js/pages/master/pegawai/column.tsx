import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Pegawai } from '@/types/pegawai';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

interface DataTableProps {
    onEdit?: (pegawai: Pegawai) => void;
    onDelete?: (id: number) => void;
}

export const columns = ({ onEdit, onDelete }: DataTableProps): ColumnDef<Pegawai>[] => [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'nama_lengkap',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nama Lengkap
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue('nama_lengkap')}</div>,
    },
    {
        accessorKey: 'jenis_kelamin',
        header: 'Jenis Kelamin',
        cell: ({ row }) => <div>{row.getValue('jenis_kelamin') === 'L' ? 'Laki-laki' : 'Perempuan'}</div>,
    },
    {
        accessorKey: 'tanggal_lahir',
        header: 'Tanggal Lahir',
        cell: ({ row }) => <div>{new Date(row.getValue('tanggal_lahir')).toLocaleDateString('id-ID')}</div>,
    },
    {
        accessorKey: 'alamat',
        header: 'Alamat',
        cell: ({ row }) => <div>{row.getValue('alamat')}</div>,
    },
    {
        accessorKey: 'jabatan',
        header: 'Jabatan',
        cell: ({ row }) => <div>{row.getValue('jabatan')}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const pegawai = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit?.(pegawai)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete?.(pegawai.id_pegawai)} className="text-destructive">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
