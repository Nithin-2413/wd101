// Function to create table rows based on stored data
function createTableRows() {
    const storedData = JSON.parse(localStorage.getItem('userEntries')) || [];
    const table = document.getElementById('userData').getElementsByTagName('tbody')[0];

    storedData.forEach(data => {
        const newRow = table.insertRow(table.rows.length);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);

        cell1.innerHTML = data.name;
        cell2.innerHTML = data.email;
        cell3.innerHTML = data.password;
        cell4.innerHTML = data.dob;
        cell5.innerHTML = data.terms ? 'Yes' : 'No';
    });
}

// Function to handle form submission
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    const age = calculateAge(dob);

    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Invalid email address.');
        return;
    }

    const table = document.getElementById('userData').getElementsByTagName('tbody')[0];

    const newRow = table.insertRow(table.rows.length);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.innerHTML = name;
    cell2.innerHTML = email;
    cell3.innerHTML = password;
    cell4.innerHTML = dob;
    cell5.innerHTML = terms ? 'Yes' : 'No';

    const userData = {
        name,
        email,
        password,
        dob,
        terms
    };

    let storedData = JSON.parse(localStorage.getItem('userEntries')) || [];
    storedData.push(userData);
    localStorage.setItem('userEntries', JSON.stringify(storedData));
});

// Function to calculate age from date of birth
function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Function to validate email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Load saved data and create table rows on page load
window.onload = function () {
    createTableRows();
};
