import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import RegisterForm from '@/components/auth/register-form';
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
                toast.success('Berhasil login');
            },
        });
    };

    return (
        <AuthLayout title="Buat akun baru" description="Silakan isi data di bawah untuk membuat akun">
            <Head title="Register" />
            <RegisterForm data={data} setData={setData} errors={errors} processing={processing} submit={submit} />
        </AuthLayout>
    );
}
