import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type Pegawai } from '@/types/pegawai';
import { useForm } from '@inertiajs/react';

interface FormData extends Partial<Omit<Pegawai, 'id_pegawai' | 'created_at' | 'updated_at'>> {
    nama_lengkap: string;
    jenis_kelamin: string;
    tanggal_lahir: string;
    alamat: string;
    jabatan: string;
}

interface PegawaiDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pegawai?: Pegawai;
    mode: 'create' | 'edit';
}

export function PegawaiDialog({ open, onOpenChange, pegawai, mode }: PegawaiDialogProps) {
    const defaultValues: FormData = {
        nama_lengkap: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
        alamat: '',
        jabatan: '',
    };

    const { data, setData, post, put, processing, errors, reset } = useForm<FormData>({
        ...defaultValues,
        ...pegawai,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mode === 'create') {
            post(route('pegawai.store'), {
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
                preserveScroll: true,
            });
        } else if (pegawai?.id_pegawai) {
            put(route('pegawai.update', pegawai.id_pegawai), {
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
                preserveScroll: true,
            });
        }
    };

    const handleClose = () => {
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{mode === 'create' ? 'Tambah Pegawai' : 'Edit Pegawai'}</DialogTitle>
                        <DialogDescription>
                            {mode === 'create' ? 'Tambahkan data pegawai baru ke dalam sistem.' : 'Edit data pegawai yang sudah ada.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nama_lengkap" className="text-right">
                                Nama Lengkap
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="nama_lengkap"
                                    value={data.nama_lengkap}
                                    onChange={(e) => setData('nama_lengkap', e.target.value)}
                                    className={errors.nama_lengkap ? 'border-red-500' : ''}
                                />
                                {errors.nama_lengkap && <span className="text-sm text-red-500">{errors.nama_lengkap}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jenis_kelamin" className="text-right">
                                Jenis Kelamin
                            </Label>
                            <div className="col-span-3">
                                <Select value={data.jenis_kelamin} onValueChange={(value) => setData('jenis_kelamin', value)}>
                                    <SelectTrigger className={errors.jenis_kelamin ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="L">Laki-laki</SelectItem>
                                        <SelectItem value="P">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.jenis_kelamin && <span className="text-sm text-red-500">{errors.jenis_kelamin}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tanggal_lahir" className="text-right">
                                Tanggal Lahir
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="tanggal_lahir"
                                    type="date"
                                    value={data.tanggal_lahir}
                                    onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                    className={errors.tanggal_lahir ? 'border-red-500' : ''}
                                />
                                {errors.tanggal_lahir && <span className="text-sm text-red-500">{errors.tanggal_lahir}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="alamat" className="text-right">
                                Alamat
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="alamat"
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    className={errors.alamat ? 'border-red-500' : ''}
                                />
                                {errors.alamat && <span className="text-sm text-red-500">{errors.alamat}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jabatan" className="text-right">
                                Jabatan
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="jabatan"
                                    value={data.jabatan}
                                    onChange={(e) => setData('jabatan', e.target.value)}
                                    className={errors.jabatan ? 'border-red-500' : ''}
                                />
                                {errors.jabatan && <span className="text-sm text-red-500">{errors.jabatan}</span>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {mode === 'create' ? 'Tambah' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
