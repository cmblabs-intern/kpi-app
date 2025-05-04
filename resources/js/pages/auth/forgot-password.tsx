// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    const isErrorStatus = status?.toLowerCase().includes('tidak tersedia');

    return (
        <AuthLayout title="Lupa kata sandi" description="Masukkan email untuk reset kata sandi anda">
            <Head title="Lupa kata sandi" />

            {status && (
                <div
                    className={`mb-4 text-center text-sm font-medium ${
                        isErrorStatus ? 'text-red-600' : 'text-green-600'
                    }`}
                >
                    {status}
                </div>
            )}

            <div className="space-y-6 w-full">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Alamat email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button className="w-full text-white bg-sky-600 hover:bg-sky-500/50" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Kirim Link Reset
                        </Button>
                    </div>
                </form>

                <div className="text-muted-foreground space-x-1 text-center text-sm">
                    <span>Kembali ke halaman</span>
                    <TextLink href={route('login')}>login</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
