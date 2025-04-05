const addButton = document.getElementById("add-button");
const amountInput = document.querySelector('input[placeholder="name@example.com"]');
const dateInput = document.querySelector('input[type="date"]');
const typeSelect = document.querySelector("select");
const table = document.querySelector(".transaction-table");
const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");

let totalIncome = 0;
let totalExpense = 0;

function updateDisplay() {
    totalIncomeEl.innerText = totalIncome.toLocaleString();
    totalExpenseEl.innerText = totalExpense.toLocaleString();
    balanceEl.innerText = (totalIncome - totalExpense).toLocaleString();
}

function createRow(amount, type, date) {
    const row = table.insertRow();
    row.innerHTML = `
        <td>${amount.toLocaleString()}</td>
        <td>${type.charAt(0).toUpperCase() + type.slice(1)}</td>
        <td>${date}</td>
        <td>
            <button class="btn btn-sm delete-button">
                <img src="./recycle-bin.png" width="35px">
            </button>
        </td>
    `;

    row.querySelector(".delete-button").addEventListener("click", () => {
        if (type === "income") {
            totalIncome -= amount;
        } else {
            totalExpense -= amount;
        }
        row.remove();
        updateDisplay();
    });
}

addButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    const type = typeSelect.value;

    if (isNaN(amount) || !date || (type !== "income" && type !== "expense")) {
        alert("Please fill out all fields correctly.");
        return;
    }

    if (type === "income") {
        totalIncome += amount;
    } else {
        totalExpense += amount;
    }

    createRow(amount, type, date);
    updateDisplay();

    amountInput.value = "";
    dateInput.value = "";
    typeSelect.selectedIndex = 0;
});

updateDisplay();
