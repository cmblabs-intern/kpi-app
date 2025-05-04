import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';

import AppearanceToggleTab from '@/components/appearance-tabs';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

export default function Appearance() {
    return (
        <AppLayout>
            <Head title="Pengaturan tampilan" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Pengaturan tampilan" description="Ubah tampilan akun anda" />
                    <AppearanceToggleTab />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
