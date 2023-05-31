let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function addExpense(name, amount, date) {
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        date: date
    };

    expenses.push(expense);
    saveExpenses();
    displayExpenses();
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    displayExpenses();
}

function displayExpenses() {
    const table = document.getElementById('expenseTable');
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
        </tr>
    `;

    expenses.forEach(expense => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td>
                <button class="edit-btn" onclick="editExpense(${expense.id})">Edit</button>
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;
    });
}

function editExpense(id) {
    const expense = expenses.find(expense => expense.id === id);
    if (expense) {
        const nameInput = document.getElementById('name');
        const amountInput = document.getElementById('amount');
        const dateInput = document.getElementById('date');

        nameInput.value = expense.name;
        amountInput.value = expense.amount;
        dateInput.value = expense.date;

        // Add edit mode styling to the row
        const row = document.querySelector(`#expenseTable tr[data-id="${id}"]`);
        row.classList.add('edit-mode');

        deleteExpense(id);
    }
}

document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    addExpense(name, amount, date);

    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = '';
});

displayExpenses();
