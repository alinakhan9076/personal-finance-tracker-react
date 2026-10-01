import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="min-h-screen bg-stone-100 px-4 py-8 flex 
        items-center justify-center">

            <div className="w-full max-w-xl">

                <div className="bg-white rounded-3xl shadow-xl border border-stone-200 
                px-6 py-10 sm:px-10 sm:py-12 text-center">

                    <div className="mb-8">

                        <div className="inline-flex items-center justify-center w-14 h-14 
                        rounded-2xl bg-emerald-900 text-white text-2xl font-bold mb-5 shadow-md">
                         ₹ 
                        </div>

            <h1 className="text-3xl font-bold tracking-tight text-emerald-950 
            whitespace-nowrap sm:text-4xl">
                Personal Finance Tracker
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-500 font-[cursive] italic">
                Manage your expenses and budget easily.</p>

                </div>

                <div className="flex flex-col gap-3 sm:flex-row justify-center">

            <Link to="/login">
            <button className="w-full sm:w-auto px-7 py-3 rounded-xl border border-emerald-900 
            bg-white text-emerald-950 font-semibold shadow-sm transition-all duration-200 
            hover:bg-emerald-950 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 
            focus:ring-emerald-300">
                Login</button>
            </Link>

            <Link to="/register">
            <button className="w-full sm:w-auto px-4 py-3 rounded-xl border border-emerald-900 
            bg-white text-emerald-950 font-semibold shadow-sm transition-all duration-200 
            hover:bg-emerald-950 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300">
                Register</button>
            </Link>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;