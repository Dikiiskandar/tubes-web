import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ShoppingBasket } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/dashboard',
    },
];

export default function Dashboard({ foods, filters }) {

    const handleTabChange = (value: any) => {
        router.get("/dashboard", { category: value }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />
            <main className="w-full px-4 pb-4">
                <div className='py-4 flex justify-between items-end'>
                    <div>
                        <Tabs
                            defaultValue={filters.category || "Burger"}
                            onValueChange={handleTabChange}
                            className="w-[400px]"
                        >
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="Burger">Burger</TabsTrigger>
                                <TabsTrigger value="Ice-cream">Ice Cream</TabsTrigger>
                                <TabsTrigger value="Pizza">Pizza</TabsTrigger>
                                <TabsTrigger value="Salad">Salad</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
                <div className='w-full grid grid-cols-5 gap-3'>
                    {foods.map((item: any) => (
                        <Card key={item.id} className='w-[200px] overflow-hidden p-0'>
                            <div className='w-[200px] h-[120px]'>
                                <img className='w-full h-full object-cover' src={item.Image} alt={item.Name} />
                            </div>
                            <CardContent className='p-3 pt-0 -mt-2'>
                                <div className='text-lg font-bold line-clamp-1'>{item.Name}</div>
                                <div className='text-sm line-clamp-2'>{item.Detail}</div>
                                <div className='mt-4 flex justify-between gap-2'>
                                    <div className='font-bold'>Rp.{item.Price}</div>
                                    <Button className='text-sm h-6' variant="outline" onClick={() => router.post(route('cart.add'), { category: filters.category ?? 'Burger', food_id: item.id })}><ShoppingBasket/></Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </AppLayout>
    );
}
