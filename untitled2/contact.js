document.querySelector('form').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !emailPattern.test(email) || !message) {
        alert("Please fill out all fields correctly.");
        event.preventDefault();
    }
});


document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskText = document.getElementById('task').value;
    if (taskText.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = taskText;
        document.getElementById('todo-list').appendChild(li);

        document.getElementById('task').value = '';

        li.addEventListener('dblclick', function() {
            li.remove();
        });
    } else {
        alert("Task cannot be empty");
    }
});

document.getElementById('sortForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const input = document.getElementById('numbers').value.trim();
    const order = document.getElementById('sortOrder').value;

    let numbers = input.split(',').map(num => num.trim()).filter(num => !isNaN(num) && num !== '').map(Number);

    if (numbers.length > 0) {
        numbers.sort((a, b) => order === 'ascending' ? a - b : b - a);

        document.getElementById('result').textContent = 'Sorted Numbers: ' + numbers.join(', ');
    } else {
        alert("Please enter valid numbers.");
    }
});

const colors = ['#C3073F', '#6F2232', '#950740', '#1A1A1D'];
let colorIndex = 0;

document.getElementById('changeColorBtn').addEventListener('click', function() {
    document.body.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
});

function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });
    document.getElementById('datetime').textContent = formattedDateTime;
}

setInterval(updateDateTime, 1000);
updateDateTime();

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById('submitGuess').addEventListener('click', function() {
    const userGuess = parseInt(document.getElementById('guessInput').value);
    attempts++;

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        document.getElementById('feedback').textContent = "Please enter a number between 1 and 100.";
        return;
    }

    if (userGuess > randomNumber) {
        document.getElementById('feedback').textContent = "Too high! Try again.";
    } else if (userGuess < randomNumber) {
        document.getElementById('feedback').textContent = "Too low! Try again.";
    } else {
        document.getElementById('feedback').textContent = `Correct! You guessed the number in ${attempts} attempts.`;
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
    }

    document.getElementById('guessInput').value = '';
});
