function ExpenseList({ expenses }) {
    return (
        <div>
            {expenses.map((expense) => (
                <div key={expense._id}>
                    <p>{expense.category}</p>
                   <p>₹{(expense.amount / 100).toFixed(2)}</p>
                    <p>{expense.date}</p>
                    <p>{expense.note}</p>
                </div> 
                ))}   
        </div>
    );
}

export default ExpenseList;