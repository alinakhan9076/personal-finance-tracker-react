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
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedYear, selectedMonthNumber] = selectedMonth.split("-");
    const [total, setTotal] = useState(0);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const loadExpenses = async (year, month, category, from, to) => {
        try {
            setLoading(true);
            setError("");

            const data = await getExpenses(year, month, category, from, to);
            setExpenses(data);

            const totalPaise = data.reduce(
                (sum, expense) => sum + expense.amount, 0
            );

            setTotal(totalPaise);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchExpenses = async () => {
            
       await loadExpenses(selectedYear, selectedMonthNumber, 
            selectedCategory, fromDate, toDate);
       };

       fetchExpenses();
}, [selectedYear, selectedMonthNumber, 
    selectedCategory, fromDate, toDate,]);

const handleDelete = async (id) => {
    try {
        await deleteExpense(id);
        await loadExpenses(
            selectedYear,
            selectedMonthNumber,
            selectedCategory,
            fromDate,
            toDate
        );
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

        <label>
            Category:
            <select value={selectedCategory}
            onChange={(event) => 

                setSelectedCategory(event.target.value)
            }
            >
                <option value="">All Categories
                </option>
                <option value="Food">Food
                </option>
                <option value="Travel">Travel
                </option>
                <option value="Bills">Bills
                </option>
                <option value="Shopping">Shopping
                </option>
                    
            </select>
        </label>

        <label>
            From:
            <input type="date"
            value={fromDate}
            onChange={(event) => setFromDate(event.target.value)}
            />
        </label>

        <label>
            To:
            <input type="date"
            value={toDate}
            onChange={(event) => setToDate(event.target.value)}
            />
        </label>

        <p>
            Total Spent: ₹{(total / 100).toFixed(2)}
        </p>

        <ExpenseForm 
        key={editingExpense?._id || "new-expense"}
        onExpenseCreated={() => loadExpenses(
            selectedYear,
            selectedMonthNumber,
            selectedCategory,
            fromDate,
            toDate
        )}
        editingExpense={editingExpense}
        onExpenseUpdated={() => {
            setEditingExpense(null);
            loadExpenses(
            selectedYear,
            selectedMonthNumber,
            selectedCategory,
            fromDate,
            toDate
            );
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