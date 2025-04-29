import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <div className='relative w-full min-h-screen flex justify-center items-center'>
            <img src="/auth-background.png" alt="auth background" className='absolute hidden sm:block w-full h-full object-cover'/>
            <AuthLayoutTemplate title={title} description={description} {...props} >
                {children}
            </AuthLayoutTemplate>
        </div>
    );
}
