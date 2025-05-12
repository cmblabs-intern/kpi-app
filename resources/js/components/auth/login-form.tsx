import { LoaderCircle } from 'lucide-react';
import InputError from '../input-error';
import TextLink from '../text-link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface LoginFormProps {
    data: {
        email: string;
        password: string;
        remember: boolean;
    };
    setData: (key: keyof LoginFormProps['data'], value: string | boolean) => void;
    errors: Record<string, string>;
    processing: boolean;
    canResetPassword: boolean;
    submit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({ data, setData, errors, processing, canResetPassword, submit }: LoginFormProps) => {
    return (
        <form className="flex w-full max-w-xl flex-col gap-2 md:gap-6" onSubmit={submit}>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="email@example.com"
                        className="border-gray-300"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Kata sandi</Label>
                        {canResetPassword && (
                            <TextLink href={route('password.request')} className="text-decoration-none ml-auto text-sm" tabIndex={5}>
                                Lupa kata sandi?
                            </TextLink>
                        )}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        tabIndex={2}
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Masukan kata sandi"
                        className="border-gray-300"
                    />
                    <InputError message={errors.password} />
                </div>

                <Button type="submit" className="mt-4 w-full bg-sky-600 text-white hover:bg-sky-500/50" tabIndex={4} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Masuk
                </Button>
            </div>

            <div className="text-muted-foreground text-center text-sm">
                Belum memiliki akun?{' '}
                <TextLink href={route('register')} tabIndex={5}>
                    Daftar
                </TextLink>
            </div>
        </form>
    );
};

export default LoginForm;
