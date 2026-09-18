import { useState } from "react";
import { createExpense } from "../api/api";

function ExpenseForm() {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
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

            await createExpense({
                amount: amountInPaise,
                category,
                date,
                note,
            });

            setAmount("");
            setCategory("");
            setDate("");
            setNote("");

            setSuccess("Expense added sucessfully");
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
                placeholder="Amount in rupess"
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
                type="Note"
                value={note}
                onChange={(event) => setNote(event.target.value)} 
                />

                <button type="submit">
                    Add Expense
                </button>
            </form>

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
}

export default ExpenseForm;
        