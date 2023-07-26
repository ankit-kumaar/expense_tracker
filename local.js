const API_URL = 'https://crudcrud.com/api/62722945727842faa8df91ab59296eaf/expense';

// Function to fetch all expenses from the API
async function fetchExpenses() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch expenses from the API.');
    }
    return response.json();
}

// Function to add an expense to the API
async function addExpense(title, amount) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount }),
    });

    if (!response.ok) {
        throw new Error('Failed to add the expense to the API.');
    }

    return response.json();
}

// Function to update an existing expense in the API
async function updateExpense(id, title, amount) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount }),
    });

    if (!response.ok) {
        throw new Error('Failed to update the expense in the API.');
    }

    return response.json();
}

// Function to delete an expense from the API
async function deleteExpense(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete the expense from the API.');
    }
}

// Function to render expenses on the page
async function renderExpenses() {
    const expenseListDiv = document.getElementById('expenseList');
    expenseListDiv.innerHTML = '';

    try {
        const allExpenses = await fetchExpenses();
        allExpenses.forEach((expense) => {
            const expenseDiv = document.createElement('div');
            expenseDiv.innerHTML = `<b>${expense.title}:</b> $${expense.amount}`;
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', async () => {
                await deleteExpense(expense.id);
                renderExpenses();
            });
            expenseDiv.appendChild(deleteButton);
            expenseListDiv.appendChild(expenseDiv);
        });
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    expenseForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const amount = parseFloat(document.getElementById('amount').value);
        if (!title || isNaN(amount)) return;

        try {
            await addExpense(title, amount);
            renderExpenses();
            expenseForm.reset();
        } catch (error) {
            console.error('Error adding expense:', error.message);
        }
    });

    renderExpenses();
});
