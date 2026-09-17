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
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input
                type= "text" 
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
                <input
                type= "email" 
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
                <input
                type= "password" 
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default RegisterPage;
        