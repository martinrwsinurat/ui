import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        agreement: boolean;
    }>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        agreement: true,
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <section className="min-h-screen mb-8">
                <div
                    className="page-header mx-auto mt-8 mb-0 rounded-lg relative flex items-center justify-center"
                    style={{
                        width: "520px",
                        height: "100px",
                        backgroundImage: "url('../assets/img/curved-images/curved14.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60 rounded-lg"></span>
                    <div className="container relative z-10">
                        <div className="row justify-center">
                            <div className="mx-auto text-center">
                                <h1 className="text-white mb-2 mt-5 text-3xl font-bold">
                                    AYO SEGERA DAFTAR!
                                </h1>
                                {/* <p className="text-white text-lg">
                                    Kreasikan idemu disini bersama tim mu untuk membuat projek yang keren
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="flex justify-center -mt-10">
                        <div className="w-full max-w-md">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="text-center pt-6">
                                    <h5 className="font-bold"></h5>
                                </div>
                                <div className="flex justify-center gap-2 px-6 mt-4">
                                    <button className="btn btn-outline-light w-1/4 border rounded p-2">
                                        {/* Facebook SVG */}
                                        <svg width="24" height="32" viewBox="0 0 64 64">
                                            <g fill="none" fillRule="evenodd">
                                                <circle fill="#3C5A9A" cx="32" cy="32" r="29.5" />
                                                <path d="M39.1,9.1h-6.5c-3.9,0-8.2,1.6-8.2,7.2c0,2,0,4,0,6.1h-4.5v7.1h4.6v20.5h8.5v-20.7h5.6l0.5-7.1h-6.3c0,0,0-3.1,0-4c0-2.2,2.3-2.1,2.5-2.1c1.1,0,3.2,0,3.8,0V9.1z" fill="#FFF" />
                                            </g>
                                        </svg>
                                    </button>
                                    <button className="btn btn-outline-light w-1/4 border rounded p-2">
                                        {/* Apple SVG */}
                                        <svg width="24" height="32" viewBox="0 0 64 64">
                                            <g fill="#000" fillRule="nonzero">
                                                <path d="M41,33c0,9.2,7.9,12.3,8,12.3c-0.1,0.2-1.2,4.4-4.1,8.7c-2.5,3.7-5.1,7.4-9.2,7.5c-4,0.1-5.3-2.5-9.9-2.5c-4.6,0-6,2.3-10,2.5c-4,0.2-7-4.2-9.5-7.9C1.2,46.1-2.8,32.3,2.5,23c2.6-4.6,7.3-7.6,12.5-7.7c3.9-0.1,7.6,2.7,10,2.7c2.4,0,6.9-3.3,11.6-2.8c2,0.1,7.5,0.8,11,6.1c-0.3,0.2-6.6,3.7-6.5,11.4zM33.4,10.2c2.1-2.6,3.5-6.2,3.1-9.7c-3,0.1-6.7,2-8.8,4.6c-1.9,2.3-3.6,5.9-3.1,9.4C27.8,14.8,31.2,12.8,33.4,10.2z" />
                                            </g>
                                        </svg>
                                    </button>
                                    <button className="btn btn-outline-light w-1/4 border rounded p-2">
                                        {/* Google SVG */}
                                        <svg width="24" height="32" viewBox="0 0 64 64">
                                            <g fill="none" fillRule="evenodd">
                                                <path d="M57.8,30.2c0-2.4-0.2-4.2-0.6-6.1H29.5v10.9h16.3c-0.3,2.7-2.1,6.8-6,9.6l-0.1,0.4l8.8,6.8l0.6,0.1C54.6,46.7,57.8,39.1,57.8,30.2z" fill="#4285F4" />
                                                <path d="M29.5,59c8,0,14.7-2.6,19.5-7.2l-9.3-7.2c-2.5,1.7-5.8,2.8-10.2,2.8c-7.8,0-14.4-5.1-16.8-12.2l-0.3,0l-9.1,7.1l-0.1,0.3C8,52.4,18,59,29.5,59z" fill="#34A853" />
                                                <path d="M12.7,35.3c-0.6-1.8-0.9-3.8-0.9-5.8c0-2,0.3-4,0.9-5.8l-0.1-0.4l-9.2-7.2l-0.3,0.1C1.1,20.3,0,24.7,0,29.5c0,4.7,1.1,9.2,3.1,13.2l9.6-7.4z" fill="#FBBC05" />
                                                <path d="M29.5,11.4c5.5,0,9.2,2.4,11.4,4.4l8.3-8.1C44.1,2.9,37.5,0,29.5,0C18,0,8,6.6,3.1,16.3l9.6,7.4C15.1,16.6,21.7,11.4,29.5,11.4z" fill="#EB4335" />
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-4 text-center relative">
                                    <span className="bg-white px-3 text-sm text-secondary font-bold z-10 relative">
                                        or
                                    </span>
                                    <div className="absolute left-0 right-0 top-1/2 border-t border-gray-200 z-0"></div>
                                </div>
                                <div className="p-6">
                                    <form onSubmit={submit}>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control w-full px-4 py-2 border rounded"
                                                placeholder="Name"
                                                name="name"
                                                id="name"
                                                value={data.name}
                                                onChange={e => setData("name", e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.name} className="text-danger text-xs mt-2" />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                className="form-control w-full px-4 py-2 border rounded"
                                                placeholder="Email"
                                                name="email"
                                                id="email"
                                                value={data.email}
                                                onChange={e => setData("email", e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.email} className="text-danger text-xs mt-2" />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="password"
                                                className="form-control w-full px-4 py-2 border rounded"
                                                placeholder="Password"
                                                name="password"
                                                id="password"
                                                value={data.password}
                                                onChange={e => setData("password", e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.password} className="text-danger text-xs mt-2" />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="password"
                                                className="form-control w-full px-4 py-2 border rounded"
                                                placeholder="Confirm Password"
                                                name="password_confirmation"
                                                id="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={e => setData("password_confirmation", e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.password_confirmation} className="text-danger text-xs mt-2" />
                                        </div>
                                        <div className="form-check text-left mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="agreement"
                                                id="flexCheckDefault"
                                                checked={data.agreement}
                                                onChange={e => setData("agreement", (e.target as HTMLInputElement).checked)}
                                            />
                                            <label className="form-check-label ml-2" htmlFor="flexCheckDefault">
                                                I agree the{" "}
                                                <a href="#" className="text-dark font-bold">
                                                    Terms and Conditions
                                                </a>
                                            </label>
                                            {errors.agreement && (
                                                <p className="text-danger text-xs mt-2">
                                                    First, agree to the Terms and Conditions, then try register again.
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="btn bg-gradient-to-r from-gray-800 to-gray-900 text-white w-full my-4 mb-2 py-2 rounded"
                                                disabled={processing}
                                            >
                                                Sign up
                                            </button>
                                        </div>
                                        <p className="text-sm mt-3 mb-0 text-center">
                                            Already have an account?{" "}
                                            <Link href={route("login")} className="text-dark font-bold">
                                                Sign in
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}