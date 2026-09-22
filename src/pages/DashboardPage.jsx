import { useEffect, useState} from "react";
import { getExpenses, deleteExpense } from "../api/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function DashboardPage() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingExpense, setEditingExpense] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState("2026-09");
    const [selectedYear, selectedMonthNumber] = selectedMonth.split("-");

    const loadExpenses = async (year, month) => {
        try {
            setLoading(true);
            setError("");

            const data = await getExpenses(year, month);
            setExpenses(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExpenses(selectedYear, selectedMonthNumber);
}, [selectedYear, selectedMonthNumber]);

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

        <label>
            Select Month:
            <input type="month"
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
            />
        </label>

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