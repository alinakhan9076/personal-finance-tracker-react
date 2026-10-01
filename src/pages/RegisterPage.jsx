import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password.length < 6) {
            setError("Password must be al least 6 characters long");
            return;
        }

        try {
            setError("");

            await registerUser({
                name,
                email,
                password,
            });

            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-stone-100 flex items-center justify-center 
        px-4 py-8">

            <div className="w-full max-w-md">

                <div className="bg-white rounded-3xl border border-stone-200 shadow-xl 
                p-6 sm:p-8">

                    <div className="flex justify-center mb-4">
                        <div className="flex items-center justify-center w-12 h-12 
                        rounded-2xl bg-emerald-950 text-white text-xl font-bold shadow-md">
                        ₹ 
                        </div>
                    </div>

            <h1 className="text-3xl font-bold text-emerald-950 text-center">
                Create Account
                </h1>

                <p className="mt-2 mb-7 text-center text-stone-500 font-[cursive] italic">
                    Start managing your finance with ease.
                </p>

            <form onSubmit={handleSubmit}
            className="space-y-5">

                <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                        Name
                    </label>
                <input
                type= "text" 
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 
                py-3 text-stone-900 outline-none transition focus:border-emerald-700 
                focus:ring-2 focus:ring-emerald-200"
                />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                        Email
                    </label>
                <input
                type= "email" 
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 
                py-3 text-stone-900 outline-none transition focus:border-emerald-700 
                focus:ring-2 focus:ring-emerald-200"
                />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                        Password
                    </label>
                <input
                type= "password" 
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 
                py-3 text-stone-900 outline-none transition focus:border-emerald-700 
                focus:ring-2 focus:ring-emerald-200"
                />
                <p className="mt-1 text-xs text-stone-500">
                    Password must be at least 6 characters.
                </p>
                </div>
                
                <button type="submit"
                className="w-full rounded-xl border border-emerald-950 bg-white 
                px-5 py-3 font-semibold text-emerald-950 shadow-sm transition-all 
                duration-200 hover:bg-emerald-950 hover:text-white hover:shadow-md 
                focus:outline-none focus:ring-2 focus:ring-emerald-300">
                    Register
                    </button>
            </form>
            {error && ( <p className="mt-5 rounded-xl border border-red-200 bg-red-50 
            px-4 py-3 text-sm text-red-700">
                {error}
                </p> )}
                </div>
            </div>    
        </div>
    );
}

export default RegisterPage;
        