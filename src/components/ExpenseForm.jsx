import { useState } from "react";
import { createExpense, updateExpense } from "../api/api";

function ExpenseForm({
    onExpenseCreated,
    editingExpense,
    onExpenseUpdated,
    onCancelEdit,
}) {
    const [amount, setAmount] = useState(() =>
        editingExpense ? String(editingExpense.amount / 100) : ""
    );
    const [category, setCategory] = useState(() =>
        editingExpense?.category || ""
    );
    const [date, setDate] = useState(() =>
        editingExpense?.date?.slice(0, 10) || ""
    );
    const [note, setNote] = useState(() => editingExpense?.note || "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            setError("");
            setSuccess("");

            const amountInPaise = Math.round(
                Number(amount) * 100
            );

            const expenseData = {
                amount: amountInPaise,
                category,
                date,
                note,
            };

            if (editingExpense) {
                await updateExpense(editingExpense._id, expenseData);
                onExpenseUpdated();
            } else {
                await createExpense(expenseData);
                onExpenseCreated();
            }

            setAmount("");
            setCategory("");
            setDate("");
            setNote("");

            setSuccess("Expense saved successfully");
        } catch (error) {
            setError(error.message);
        }
    };  

    return (
        <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-6">
                <h2 className="text-xl font-bold text-emerald-950 sm:text-2xl">
                    {editingExpense ? "Edit Expense" : "Add Expense"}
                </h2>

                <p className="mt-1 text-sm italic text-stone-500">
                    Keep track of where your money goes.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >

                <div>
                    <label className="mb-2 block text-sm font-semibold text-stone-700">
                        Amount
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        placeholder="₹ Amount in rupees"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-stone-700">
                        Category
                    </label>

                    <input
                        type="text"
                        placeholder="Food, Travel, Shopping..."
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-stone-700">
                        Date
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-stone-700">
                        Note
                    </label>

                    <input
                        type="text"
                        placeholder="Optional note"
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:col-span-2 sm:flex-row">

                    <button
                        type="submit"
                        className="w-full rounded-xl border border-emerald-950 bg-white px-5 py-3 font-semibold text-emerald-950 shadow-sm transition-all duration-200 hover:bg-emerald-950 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300 sm:w-auto"
                    >
                        {editingExpense ? "Update Expense" : "Add Expense"}
                    </button>

                    {editingExpense && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="w-full rounded-xl border border-stone-300 bg-stone-100 px-5 py-3 font-semibold text-stone-700 transition-all duration-200 hover:bg-stone-800 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-stone-300 sm:w-auto"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {error && (
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </p>
            )}

            {success && (
                <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                    {success}
                </p>
            )}
        </div>
    );
}

export default ExpenseForm;