import { useEffect, useState} from "react";
import { getExpenses, deleteExpense } from "../api/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function DashboardPage() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingExpense, setEditingExpense] = useState(null);

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

    useEffect(() => {
        const fetchInitialExpenses = async () => {
            try {
                setError("");

                const data = await getExpenses();
                setExpenses(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialExpenses();
}, []);

const handleDelete = async (id) => {
    try {
        await deleteExpense(id);
        await loadExpenses();
    } catch (error) {
        setError(error.message);
    }
};

const handleEdit = (expense) => {
    setEditingExpense(expense);
}

return (
    <div>
        <h1>Finance Dashboard</h1>

        <ExpenseForm 
        key={editingExpense?._id || "new-expense"}
        onExpenseCreated={loadExpenses}
        editingExpense={editingExpense}
        onExpenseUpdated={() => {
            setEditingExpense(null);
            loadExpenses();
        }}
        onCancelEdit={() => 
            setEditingExpense(null)
        }
        />

        {error && <p>{error}</p>}
        
        <p>Expenses: {expenses.length}</p>

        {loading && <p>Loading expenses...</p>}

        {!loading && !error && (
            <ExpenseList 
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
            />
        )}
        
    </div>
);
}

export default DashboardPage;