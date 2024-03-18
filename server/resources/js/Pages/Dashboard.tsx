import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';



export default function Dashboard({ auth }: PageProps) {
    const items = [
        {
            key: 1,
            title: "profile",
            path: "/",
            icon: "FaAppStoreIos"
        },
        {
            key: 1,
            title: "Videos",
            path: "/",
            icon: "FaAppStoreIos"
        },

    ]
    return (
        <AuthenticatedLayout
            user={auth.user}

        >
            <Head title="Dashboard" />

            <div className="mt-0 relative flex p-1">
                <div style={{ maxWidth: "25%" }} className="hidden bg-red-600 overflow-scroll  lg:block min-h-screen m-0  w-1/4 bg-white overflow-hidden  sm:rounded-lg">
                    <div className='fixed space-y-4 flex flex-col p-4 overflow-scroll '>
                        {items.map((item) => {
                            return <span className='text-lg m-2 font-bold'>{item.title.toLocaleUpperCase()}</span>

                        })}
                    </div>

                </div>
                <div className=" shadow-2xl lg:block flex min-h-screen w-full lg:w-3/4 bg-white overflow-hidden sm:rounded-lg ">
                    You're logged in!
                    <div className=' sm:hidden block border-2 border-black rounded absolute mb-1 bottom-0 right-0 ' style={{ width: "48%", height: "30px" }}>
                        friends
                    </div>

                </div>
                <div className=" sm:block min-h-screen hidden shadow-md  w-1/4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    You're logged in!

                </div>
            </div>

        </AuthenticatedLayout >
    );
}
