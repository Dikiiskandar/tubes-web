import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Wallet2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wallet',
        href: '/wallet',
    },
];

export default function Wallet({ user }) {

    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

    const handleAddMoney = () => {
        if (selectedAmount !== null) {
            router.post('/wallet/add', { amount: selectedAmount });
            setSelectedAmount(null)
        } else {
            alert('Please select an amount first.');
        }
    };

    const amountOptions = [10000, 20000, 50000];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Wallet" />
            <main className="w-full pb-4">
                <div className='p-4 bg-gray-100'>
                    <div className='flex items-center justify-center gap-4'>
                        <Wallet2 className='w-8 h-8' />
                        <div className='flex-1'>
                            <div className='text-xs'>Your Wallet</div>
                            <div className='font-bold text-lg'>Rp. {user?.Wallet ?? 0}</div>
                        </div>
                    </div>
                </div>
                <div className='p-4'>
                    <div className='font-bold'>Select amount to add</div>
                    <div className='mt-1 flex gap-4'>
                        {amountOptions.map((amount) => (
                            <Badge
                                key={amount}
                                variant={selectedAmount === amount ? 'default' : 'outline'}
                                className="hover:cursor-pointer"
                                onClick={() => setSelectedAmount(amount)}
                            >
                                Rp. {amount}
                            </Badge>
                        ))}
                    </div>
                    <div className='mt-4'>
                        <Button className="text-xs p-0 m-0 px-4 hover:cursor-pointer" onClick={handleAddMoney}>
                            Add Money
                        </Button>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
