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
        <div>
            <h2>Add Expense</h2>

            <form onSubmit={handleSubmit}>
                <input
                type="number"
                step="0.01"
                placeholder="₹ Amount in rupees"
                value={amount}
                onChange={(event) => setAmount(event.target.value)} 
                />

                <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(event) => setCategory(event.target.value)} 
                />

                <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)} 
                />

                <input
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value)} 
                />

                <button type="submit">
                    {editingExpense ? "Update Expense" : "Add Expense" }
                </button>

                {editingExpense && (
                        <button type="button"
                        onClick={onCancelEdit}>
                            Cancel
                        </button>
                    )}
            </form>

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
}

export default ExpenseForm;
        