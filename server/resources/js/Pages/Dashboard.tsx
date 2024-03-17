import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            path="/ds"
            user={auth.user}

        >
            <Head title="Dashboard" />

            <div className="mt-4 flex p-1">
                <div className="hidden lg:block min-h-screen mx-2  w-1/4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    You're logged in!
                </div>
                <div className=" shadow-2xl lg:block flex min-h-screen mx-2 w-full lg:w-3/4 bg-white overflow-hidden sm:rounded-lg ">
                    You're logged in!
                    <div className='tracking-widest sm:hidden block border-2 border-black rounded absolute mb-1 bottom-0 right-0 mr-4' style={{ width: "48%", height: "30px" }}>
                        friends
                    </div>

                </div>
                <div className=" sm:block min-h-screen hidden  lg:mx-2 sm:mx-1 w-1/4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    You're logged in!

                </div>
            </div>

        </AuthenticatedLayout >
    );
}
