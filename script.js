const API_URL = 'https://crudcrud.com/api/expensesTracker';

async function displayExpenses() {
    const expenseTable = document.getElementById('expenseTable');
    expenseTable.innerHTML = '';
  
    try {
      const response = await fetch(API_URL);
      const expenses = await response.json();
  
      if (expenses.length === 0) {
        expenseTable.innerHTML = '<p>No expenses found.</p>';
        return;
      }
  
      const table = document.createElement('table');
      table.innerHTML = `
        <tr>
          <th>Expense Name</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      `;
  
      expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${expense.name}</td>
          <td>₹${expense.amount}</td>
          <td>${expense.category}</td>
          <td>
            <button onclick="editExpense('${expense._id}', '${expense.name}', ${expense.amount}, '${expense.category}')">Edit</button>
            <button onclick="deleteExpense('${expense._id}')">Delete</button>
          </td>
        `;
        table.appendChild(row);
      });
  
      expenseTable.appendChild(table);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }
  
async function addExpense(event) {
    event.preventDefault();
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    const expenseCategory = document.getElementById('expenseCategory').value;
  
    if (!expenseName || !expenseAmount || isNaN(expenseAmount)) {
      alert('Please enter valid data for the expense.');
      return;
    }
  
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: expenseName, amount: expenseAmount, category: expenseCategory })
      });
  
      document.getElementById('expenseForm').reset();
      displayExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  }

async function editExpense(expenseId, expenseName, expenseAmount) {
  const updatedName = prompt('Enter the updated name:', expenseName);
  const updatedAmount = parseFloat(prompt('Enter the updated amount:', expenseAmount));

  if (!updatedName || !updatedAmount || isNaN(updatedAmount)) {
    alert('Please enter valid data for the expense.');
    return;
  }

  try {
    await fetch(`${API_URL}/${expenseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: updatedName, amount: updatedAmount })
    });

    displayExpenses();
  } catch (error) {
    console.error('Error editing expense:', error);
  }
}

async function deleteExpense(expenseId) {
  try {
    await fetch(`${API_URL}/${expenseId}`, {
      method: 'DELETE',
    });
    displayExpenses();
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
}


document.getElementById('expenseForm').addEventListener('submit', addExpense);


displayExpenses();
