const API_URL = "http://localhost:5000";

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Registration failed");
    }

    return data;
};

export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};

export const getExpenses = async (year, month) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/expenses?year=${year}&month=${month}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch expenses");
    }

    return data;
};

export const createExpense = async (expenseData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ||
            "Failed to create expense"
        );
    }

    return data;
};

export const updateExpense = async (id, expenseData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/expenses/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update expense");
    }

    return data;
};

export const deleteExpense = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/expenses/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete expense");
    }

    return data;
}