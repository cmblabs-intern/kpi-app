import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <div className="flex min-h-screen w-full">
            <div className="flex w-full items-center justify-center sm:w-1/2">
                <AuthLayoutTemplate title={title} description={description} {...props}>
                    {children}
                </AuthLayoutTemplate>
            </div>
            <div className="hidden w-1/2 sm:block">
                <img
                    src={title === 'Buat akun baru' ? '/cmlabs/register-banner.webp' : '/cmlabs/login-banner.webp'}
                    alt="auth background"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
