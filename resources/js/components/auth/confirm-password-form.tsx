import { LoaderCircle } from 'lucide-react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface ConfirmPasswordFormProps {
  data: {
    password: string;
  }
  setData: (key: keyof ConfirmPasswordFormProps['data'], value: string | boolean) => void;
  errors: Record<string, string>;
  processing: boolean;
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ConfirmPasswordForm = ({data, setData, errors, processing, submit}: ConfirmPasswordFormProps) => {
  return ( 
    <form onSubmit={submit}>
                <div className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Kata sandi</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Kata sandi"
                            autoComplete="current-password"
                            value={data.password}
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center">
                        <Button className="w-full bg-sky-600 text-white hover:bg-sky-500/50" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Konfirmasi Kata sandi
                        </Button>
                    </div>
                </div>
            </form>
   );
}
 
export default ConfirmPasswordForm;