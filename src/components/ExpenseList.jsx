function ExpenseList({ expenses, onEdit, onDelete }) {
    return (
        <div>
            {expenses.map((expense) => (
                <div key={expense._id}>
                    <p>{expense.category}</p>

                   <p>₹{(expense.amount / 100).toFixed(2)}</p>

                    <p>{expense.date}</p>

                    <p>{expense.note}</p>
                    <button onClick={() => onEdit(expense)}>
                        Edit
                    </button>
                    <button onClick={() => onDelete(expense._id)}>
                        Delete
                    </button>
                </div> 
                ))}   
        </div>
    );
}

export default ExpenseList;