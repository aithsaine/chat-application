import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler, useEffect } from 'react';
import { PageProps } from '@/types';
import DateInput from '@/Components/DateInput';
import toast from 'react-hot-toast';
import { Button } from '@material-tailwind/react';
import TextField from '@mui/material/TextField';
export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        birthday: user.birthday,
        email: user.email,
        picture: null,
        "_method": "patch"
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('profile.update',), {
            forceFormData: true,
        });




    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} encType="multipart/form-data" className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="picture" value="Picture " />

                    <label className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md py-2 px-4 cursor-pointer">
                        <svg
                            className="h-6 w-6 mr-2 text-gray-500"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M12 4v16m8-8H4"></path>
                        </svg>
                        <span className="text-sm leading-normal">Choose a file...</span>
                        <input
                            type="file"
                            className="sr-only"
                            onChange={e => setData("picture", e.target.files[0])}
                        />
                    </label>


                    <InputError className="mt-2" message={errors.picture} />
                </div>

                <div>
                    <InputLabel htmlFor="first_name" value="First name" />

                    <TextInput
                        id="first_name"
                        className="mt-1 block w-full"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        autoComplete="first_name"
                    />

                    <InputError className="mt-2" message={errors.first_name} />
                </div>
                <div>
                    <InputLabel htmlFor="last_name" value="Last Name" />

                    <TextInput
                        id="last_name"
                        className="mt-1 block w-full"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        required
                        autoComplete="last_name"
                    />

                    <InputError className="mt-2" message={errors.last_name} />
                </div>
                <div>
                    <InputLabel htmlFor="birthday" value="Birthday" />

                    <DateInput
                        id="birthday"
                        className="mt-1 block w-full"
                        value={data.birthday}
                        onChange={(e) => setData('birthday', e.target.value)}
                        required

                        autoComplete="birthday"
                    />

                    <InputError className="mt-2" message={errors.birthday} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        readOnly
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
