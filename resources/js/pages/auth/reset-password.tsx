import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import AuthLayout from '@/layouts/auth-layout';
import ResetPasswordForm from '@/components/auth/reset-password-form';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Atur Ulang Kata Sandi" description="Buat kata sandi baru">
            <Head title="Atur Ulang Kata Sandi" />

            <ResetPasswordForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submit={submit}
            />
        </AuthLayout>
    );
}
