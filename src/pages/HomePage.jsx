import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>
                Personal Finance Tracker
            </h1>
            <p>Manage your expenses and budget easily.</p>

            <Link to="/login">
            <button>Login</button>
            </Link>

            <Link to="/register">
            <button>Register</button>
            </Link>
        </div>
    );
}
export default HomePage;