import { LoaderCircle } from 'lucide-react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface ResetPasswordFormProps {
  data: {
    email: string;
    password: string;
    password_confirmation: string;
  };
  setData: (key: keyof ResetPasswordFormProps['data'], value: string | boolean) => void;
    errors: Record<string, string>;
    processing: boolean;
    submit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ResetPasswordForm = ({data, setData, errors, processing, submit}: ResetPasswordFormProps) => {
    return (
        <form onSubmit={submit}>
            <div className="grid w-[22rem] gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        readOnly
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Kata sandi</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoFocus
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Kata sandi"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Konfirmasi kata sandi</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        placeholder="Konfirmasi kata sandi"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <Button type="submit" className="mt-4 w-full bg-sky-600 text-white hover:bg-sky-500/50" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Atur Ulang Kata Sandi
                </Button>
            </div>
        </form>
    );
};

export default ResetPasswordForm;
