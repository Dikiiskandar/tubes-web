import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Welcome({ foods, filters }) {
    const { auth } = usePage<SharedData>().props;

    const handleTabChange = (value: any) => {
        router.get("/", { category: value }, { preserveState: true });
    };

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="w-full opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="w-full">

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
                        <div className='w-full grid grid-cols-6 gap-3'>
                            {foods.map((item: any) => (
                                <Card key={item.id} className='w-[200px] overflow-hidden p-0'>
                                    <div className='w-[200px] h-[120px]'>
                                        <img className='w-full h-full object-cover' src={item.Image} alt={item.Name} />
                                    </div>
                                    <CardContent className='p-3 pt-0 -mt-2'>
                                        <div className='text-lg font-bold line-clamp-1'>{item.Name}</div>
                                        <div className='text-sm line-clamp-2'>{item.Detail}</div>
                                        <div className='mt-4 font-bold'>Rp.{item.Price}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
