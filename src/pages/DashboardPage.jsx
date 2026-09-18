import { useEffect, useState} from "react";
import { getExpenses } from "../api/api";
import ExpenseForm from "../components/ExpenseForm";

function DashboardPage() {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
    const loadExpenses = async () => {
        try {
            const data = await getExpenses();
            setExpenses(data);
        } catch (error) {
            setError(error.message);
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
    </div>
);
}

export default DashboardPage;