import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cart',
        href: '/cart',
    },
];

export default function Cart({cart}) {

    const total = cart.reduce((sum: number, item: any) => sum + Number(item.data.Total), 0)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cart" />
            <main className="w-full h-full flex flex-col">
                <div className='flex-1'>
                    {cart.map((item: any) => (
                        <Card key={item.id} className='rounded-none p-0 m-0'>
                            <CardContent className='p-0'>
                                <div className='p-2 flex items-center justify-center gap-2'>
                                    <div className='w-16 h-16'>
                                        <img className='w-full h-full object-cover' src={item.data.Image} alt={item.data.Name} />
                                    </div>
                                    <div className='flex-1'>
                                        <div className='font-bold'>{item.data.Name}</div>
                                        <div>{item.data.Quantity} x Rp. {item.data.Price}</div>
                                    </div>
                                    <div>
                                        Rp. {item.data.Total}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className='p-2'><Button className='w-full' onClick={() => router.post(route('cart.checkout'))}>Checkout <span className='text-xs'>(Rp. {total})</span></Button></div>
            </main>
        </AppLayout>
    );
}
