import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getExpenses, deleteExpense, getCategorySummary, getBudget, updateBudget,} from "../api/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import CategoryChart from "../components/CategoryChart";

function DashboardPage() {
    const navigate = useNavigate();

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

    const refreshDashboard = async () => {
        await loadExpenses(
            selectedYear,
            selectedMonthNumber,
            selectedCategory,
            fromDate,
            toDate
        );

        await loadSummary(
            selectedYear,
            selectedMonthNumber
        );

        await loadBudget(
            selectedYear,
            selectedMonthNumber
        );
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
        await refreshDashboard();
    } catch (error) {
        setError(error.message);
    }
};

const handleEdit = (expense) => {
    setEditingExpense(expense);
}

const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
        <div className="min-h-screen bg-stone-100 px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                <header className="mb-6 rounded-3xl bg-emerald-950 px-5 py-5 text-white shadow-lg sm:px-7">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="text-sm font-medium text-emerald-200">
                                Personal Finance Tracker
                            </p>

                            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                Finance Dashboard
                            </h1>

                            <p className="mt-1 text-sm text-emerald-100 font-[cursive] italic">
                                Keep your spending simple and under control.
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="self-start rounded-xl border border-white/70 bg-white px-5 py-2.5 font-semibold text-emerald-950 shadow-sm transition-all duration-200 hover:bg-emerald-900 hover:text-white hover:border-emerald-900 hover:shadow-md sm:self-auto"
                        >
                            Logout
                        </button>

                    </div>

                </header>

                {error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <section className="mb-6 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">

                    <div className="mb-5">
                        <h2 className="text-lg font-bold text-emerald-950">
                            Filters
                        </h2>

                        <p className="mt-1 text-sm text-stone-500 font-[cursive] italic">
                            Choose a month or narrow your expenses by date and category.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-stone-700">
                                Select Month
                            </label>

                            <input
                                type="month"
                                value={selectedMonth}
                                onChange={(event) =>
                                    setSelectedMonth(event.target.value)
                                }
                                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-stone-700">
                                Category
                            </label>

                            <select
                                value={selectedCategory}
                                onChange={(event) =>
                                    setSelectedCategory(event.target.value)
                                }
                                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
                            >
                                <option value="">All Categories</option>
                                <option value="Food">Food</option>
                                <option value="Travel">Travel</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Bills">Bills</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-stone-700">
                                From Date
                            </label>

                            <input
                                type="date"
                                value={fromDate}
                                onChange={(event) =>
                                    setFromDate(event.target.value)
                                }
                                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-stone-700">
                                To Date
                            </label>

                            <input
                                type="date"
                                value={toDate}
                                onChange={(event) =>
                                    setToDate(event.target.value)
                                }
                                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
                            />
                        </div>

                    </div>

                </section>

                <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-stone-500">
                            Total Spent
                        </p>

                        <p className="mt-2 text-3xl font-bold text-emerald-950">
                            ₹{(total / 100).toFixed(2)}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-stone-500">
                            Expenses
                        </p>

                        <p className="mt-2 text-3xl font-bold text-emerald-950">
                            {expenses.length}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-stone-500">
                            Remaining Budget
                        </p>

                        <p
                            className={`mt-2 text-3xl font-bold ${
                                isOverBudget
                                    ? "text-red-700"
                                    : "text-emerald-800"
                            }`}
                        >
                            ₹{(remainingBudget / 100).toFixed(2)}
                        </p>

                        <p className="mt-1 text-sm text-stone-500">
                            {isOverBudget
                                ? "You are over budget."
                                : "You are within budget."}
                        </p>
                    </div>

                </section>

                <section className="mb-6 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">

                    <div className="mb-5">
                        <h2 className="text-lg font-bold text-emerald-950">
                            Monthly Budget
                        </h2>

                        <p className="mt-1 text-sm text-stone-500 font-[cursive] italic">
                            Set a spending limit for the selected month.
                        </p>
                    </div>

                    {budgetLoading ? (
                        <p className="text-sm text-stone-500">
                            Loading budget...
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3 sm:flex-row">

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Enter budget in ₹"
                                value={budgetInput}
                                onChange={(event) =>
                                    setBudgetInput(event.target.value)
                                }
                                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
                            />

                            <button
                                onClick={handleSaveBudget}
                                disabled={budgetSaving}
                                className="rounded-xl border border-emerald-950 bg-white px-6 py-3 font-semibold text-emerald-950 shadow-sm transition-all duration-200 hover:bg-emerald-950 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {budgetSaving
                                    ? "Saving..."
                                    : "Save Budget"}
                            </button>

                        </div>
                    )}

                </section>

                <section className="mb-6 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">

                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-emerald-950">
                            Spending by Category
                        </h2>

                        <p className="mt-1 text-sm text-stone-500">
                            Category-wise spending for the selected month.
                        </p>
                    </div>

                    <div className="w-full overflow-hidden">
                        <CategoryChart summary={summary} />
                    </div>

                </section>

                
                <section className="mb-6 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">

                    <div className="mb-5">
                        <h2 className="text-lg font-bold text-emerald-950">
                            {editingExpense
                                ? "Edit Expense"
                                : "Add Expense"}
                        </h2>

                        <p className="mt-1 text-sm text-stone-500">
                            {editingExpense
                                ? "Update the selected expense."
                                : "Record a new expense."}
                        </p>
                    </div>

                    <ExpenseForm
                        key={
                            editingExpense?._id ||
                            "new-expense"
                        }
                        onExpenseCreated={refreshDashboard}
                        editingExpense={editingExpense}
                        onExpenseUpdated={() => {
                            setEditingExpense(null);
                            refreshDashboard();
                        }}
                        onCancelEdit={() =>
                            setEditingExpense(null)
                        }
                    />

                </section>

                <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">

                    <div className="mb-5">
                        <h2 className="text-lg font-bold text-emerald-950">
                            Your Expenses
                        </h2>

                        <p className="mt-1 text-sm text-stone-500">
                            Your expenses for the selected filters.
                        </p>
                    </div>

                    {loading ? (
                        <div className="rounded-2xl bg-stone-50 px-4 py-8 text-center text-stone-500">
                            Loading expenses...
                        </div>
                    ) : expenses.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-8 text-center">
                            <p className="font-semibold text-stone-700">
                                No expenses found.
                            </p>

                            <p className="mt-1 text-sm text-stone-500">
                                Try another month or add a new expense.
                            </p>
                        </div>
                    ) : (
                        <ExpenseList
                            expenses={expenses}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}

                </section>

            </div>

        </div>
    );
}

export default DashboardPage;