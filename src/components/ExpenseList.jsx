function ExpenseList({ expenses, onEdit, onDelete }) {
    return (
        <div className="mt-6 space-y-4">

            {expenses.map((expense) => (
                <div
                    key={expense._id}
                    className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                >

                    {/* Expense Information */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                                Category
                            </p>

                            <p className="mt-1 text-base font-bold text-emerald-950">
                                {expense.category}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                                Amount
                            </p>

                            <p className="mt-1 text-lg font-bold text-stone-800">
                                ₹{(expense.amount / 100).toFixed(2)}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                                Date
                            </p>

                            <p className="mt-1 text-sm font-medium text-stone-700">
                                {expense.date}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                                Note
                            </p>

                            <p className="mt-1 text-sm text-stone-600">
                                {expense.note || "No note"}
                            </p>
                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 flex flex-col gap-3 border-t border-stone-100 pt-4 sm:flex-row">

                        <button
                            onClick={() => onEdit(expense)}
                            className="w-full rounded-xl border border-emerald-950 bg-white px-5 py-2.5 font-semibold text-emerald-950 transition-all duration-200 hover:bg-emerald-950 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300 sm:w-auto"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(expense._id)}
                            className="w-full rounded-xl border border-stone-800 bg-white px-5 py-2.5 font-semibold text-stone-800 transition-all duration-200 hover:bg-stone-800 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-stone-300 sm:w-auto"
                        >
                            Delete
                        </button>

                    </div>

                </div>
            ))}

        </div>
    );
}

export default ExpenseList;