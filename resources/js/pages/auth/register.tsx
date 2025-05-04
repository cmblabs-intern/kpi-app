import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { toast } from 'sonner';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    address: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            onSuccess: () => {
                console.log('REGISTER FORM | Data baru sukses dibuat: ', data);
                toast.success('Berhasil login');
            },
        });
    };

    return (
        <AuthLayout title="Buat akun baru" description="Silakan isi data di bawah untuk membuat akun">
            <Head title="Register" />
            <form className="flex w-full flex-col gap-2 md:gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Nama lengkap"
                            className="border-black md:border-white"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Alamat email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                            className="border-black md:border-white"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Kata sandi</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Masukan kata sandi"
                            className="border-black md:border-white"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Konfirmasi kata sandi</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Masukan kata sandi"
                            className="border-black md:border-white"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Nomor Handphone</Label>
                        <Input
                            id="phone"
                            type="phone"
                            required
                            tabIndex={2}
                            autoComplete="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            disabled={processing}
                            placeholder="+628123456789"
                            className="border-black md:border-white"
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address">Alamat tempat tinggal</Label>
                        <Input
                            id="address"
                            type="address"
                            required
                            tabIndex={2}
                            autoComplete="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            disabled={processing}
                            placeholder="Masukan alamat tempat tinggal"
                            className="border-black md:border-white"
                        />
                        <InputError message={errors.address} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full cursor-pointer bg-sky-600 text-white hover:bg-sky-500/50"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Buat akun baru
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Sudah memiliki akun?{' '}
                    <TextLink href={route('login')} tabIndex={6} className="md:text-white">
                        Login
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
