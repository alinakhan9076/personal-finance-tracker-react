import { useEffect, useState} from "react";
import { getExpenses } from "../api/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function DashboardPage() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    const loadExpenses = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getExpenses();
            setExpenses(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    loadExpenses();
}, []);

return (
    <div>
        <h1>Finance Dashboard</h1>

        <ExpenseForm />

        {error && <p>{error}</p>}
        
        <p>Expenses: {expenses.length}</p>

        {loading && <p>Loading expenses...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
            <ExpenseList expenses={expenses} />
        )}
        
    </div>
);
}

export default DashboardPage;