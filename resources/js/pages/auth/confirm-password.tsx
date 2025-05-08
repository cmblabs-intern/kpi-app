// Components
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import AuthLayout from '@/layouts/auth-layout';
import ConfirmPasswordForm from '@/components/auth/confirm-password-form';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Konfirmasi kata sandi anda"
            description="Harap konfirmasi kata sandi Anda sebelum melanjutkan."
        >
            <Head title="Konfirmasi kata sandi" />

            <ConfirmPasswordForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submit={submit}
            />
        </AuthLayout>
    );
}
