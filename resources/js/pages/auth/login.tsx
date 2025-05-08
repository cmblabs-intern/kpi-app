import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import AuthLayout from '@/layouts/auth-layout';
import LoginForm from '@/components/auth/login-form';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Masuk ke akun Anda" description="Masukan email dan kata sandi anda dibawah ini.">
            <Head title="Login" />

            <LoginForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                canResetPassword={canResetPassword}
                submit={submit}
            />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
