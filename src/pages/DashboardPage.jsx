import { useEffect, useState} from "react";
import { getExpenses, deleteExpense, getCategorySummary, getBudget, updateBudget,} from "../api/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import CategoryChart from "../components/CategoryChart";

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
    const [summary, setSummary] = useState([]);
    const [budgetLimit, setBudgetLimit] = useState(0);
    const [budgetInput, setBudgetInput] = useState("");
    const [budgetLoading, setBudgetLoading] = useState(true);
    const [budgetSaving, setBudgetSaving] = useState(false);

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

    const loadSummary = async (year, month) => {
        try {
            const data = await getCategorySummary(year, month);
            setSummary(data);
        } catch (error) {
            setError(error.message)
        }
    };

    const loadBudget = async (year, month) => {
        try {
            setBudgetLoading(true);

            const data = await getBudget(year, month);

            if (data) {
                setBudgetLimit(data.limit);

                setBudgetInput(String(data.limit / 100));
            } else {
                setBudgetLimit(0);
                setBudgetInput("");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setBudgetLoading(false);
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

    useEffect(() => {
        const fetchSummary = async () => {
            await loadSummary(
                selectedYear,
                selectedMonthNumber
            );
        };

        fetchSummary();
    }, [selectedYear,
        selectedMonthNumber
    ]);

    useEffect(() => {
        const fetchBudget = async () => {
            await loadBudget(
                selectedYear,
                selectedMonthNumber
            );
        };

        fetchBudget();
    }, [
        selectedYear,
        selectedMonthNumber
    ]);

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

const handleSaveBudget = async () => {
    try {
        setBudgetSaving(true);
        setError("");

        const limitInPaise = Math.round(
            Number(budgetInput) * 100
        );

        if (limitInPaise < 0 || Number.isNaN(limitInPaise)) {
            throw new Error("Please enter a valid budget");
        }

        const updatedBudget = await updateBudget({
            year: Number(selectedYear),
            month: Number(selectedMonthNumber),
            limit: limitInPaise,
        });

        setBudgetLimit(updatedBudget.limit);
        setBudgetInput(
            String(updatedBudget.limit / 100)
        );
    } catch (error) {
        setError(error.message);
    } finally {
        setBudgetSaving(false);
    }
};

const remainingBudget = budgetLimit - total;
const isOverBudget = remainingBudget < 0;
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

        <div>
            <h2>Monthly Budget</h2>

            {budgetLoading ? (
                <p>Loading budget...</p>
            ) : (
                <>
                <input 
                type="number"
                step="0.01"
                placeholder="Budget in rupess"
                value={budgetInput}
                onChange={(event) => setBudgetInput(event.target.value)
                }
                />

                <button 
                type="button"
                onClick={handleSaveBudget}
                disabled={budgetSaving}
                >
                    {budgetSaving ? "Saving..." : "Save Budget"}
                </button>

                <p>
                    Budget: ₹ {(budgetLimit / 100).toFixed(2)}
                </p>

                {isOverBudget ? (
                    <p>
                        Over budget by ₹ {(
                            Math.abs(remainingBudget) / 100
                        ).toFixed(2)}
                    </p>
                ) : (
                    <p>
                        Remaining Budget: ₹  {(remainingBudget / 100).toFixed(2)}
                    </p>
                )}
                </>
            )}
        </div>

        <CategoryChart  summary={summary} />

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