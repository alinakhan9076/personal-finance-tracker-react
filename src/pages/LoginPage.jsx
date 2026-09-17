import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");

            const data = await loginUser({
                email,
                password,
            })

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/dashborad");
        } catch (error) {
            setError(error.message);
        }
    };
    
    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)} />

                <input type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} />

                <button type="submit">Login</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginPage;