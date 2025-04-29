import React from 'react';

interface WelcomeLayoutProps {
    children: React.ReactNode;
}

const WelcomeLayout: React.FC<WelcomeLayoutProps> = ({ children }) => {
    return (
        <div className="relative flex flex-col min-h-screen bg-black/80 md:items-center md:justify-center md:bg-transparent">
            <img src="/auth-background.png" alt="auth background" className="hidden sm:flex sm:object-cover brightness-50 absolute" />
            {children}
        </div>
    );
};

export default WelcomeLayout;
