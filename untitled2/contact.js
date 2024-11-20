
// DOM Elements
const registerBtn = document.querySelector('#registerBtn');
const loginBtn = document.querySelector('#loginBtn');
const logoutBtn = document.querySelector('#logoutBtn');
const authModal = new bootstrap.Modal(document.querySelector('#authModal'));
const logoutModal = new bootstrap.Modal(document.querySelector('#logoutModal'));

// Render Logout Button
function renderLogoutButton() {
    const container = document.querySelector('.container');
    if (!document.querySelector('#logoutButton')) {
        container.insertAdjacentHTML(
            'beforeend',
            '<button id="logoutButton" class="btn btn-danger mt-3" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</button>'
        );
    }
}

// Registration Logic
registerBtn.addEventListener('click', () => {
    const username = document.querySelector('#registerUsername').value;
    const password = document.querySelector('#registerPassword').value;

    if (username && password) {
        if (localStorage.getItem(username)) {
            alert('User already exists. Please choose a different username.');
        } else {
            localStorage.setItem(username, password);
            alert('Registration successful!');
            document.querySelector('#registerForm').reset();
        }
    } else {
        alert('Please fill in all fields.');
    }
});

// Login Logic
loginBtn.addEventListener('click', () => {
    const username = document.querySelector('#loginUsername').value;
    const password = document.querySelector('#loginPassword').value;

    if (username && password) {
        if (localStorage.getItem(username) === password) {
            alert(`Welcome, ${username}!`);
            authModal.hide();
            document.querySelector('#loginForm').reset();
            localStorage.setItem('loggedInUser', username);
            renderLogoutButton();
        } else {
            alert('Invalid username or password.');
        }
    } else {
        alert('Please fill in all fields.');
    }
});

// Check logged-in state on page load
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        renderLogoutButton();
        alert(`Welcome back, ${loggedInUser}!`);
    }
});

// Logout Logic
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    logoutModal.hide();
    alert('You have logged out.');
    window.location.reload();
});


// Check logged-in state on page load
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        renderLogoutButton();
        alert(`Welcome back, ${loggedInUser}!`);
    }
});


logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser'); // Clear logged-in state
    logoutModal.hide();
    alert('You have logged out.');
    window.location.reload(); // Refresh the page
});




// Form validation and submission prevention
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


// Task Management Object
const taskManager = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    draggedIndex: null,

    saveTasks: function() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    addTask: function(taskText) {
        this.tasks.push({ text: taskText, isDone: false });
        this.saveTasks();
        this.displayTasks();
    },

    removeTask: function(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.displayTasks();
    },

    toggleDone: function(index) {
        this.tasks[index].isDone = !this.tasks[index].isDone;
        this.saveTasks();
        this.displayTasks();
    },

    swapTasks: function(fromIndex, toIndex) {
        const temp = this.tasks[fromIndex];
        this.tasks[fromIndex] = this.tasks[toIndex];
        this.tasks[toIndex] = temp;
        this.saveTasks();
        this.displayTasks();
    },

    displayTasks: function() {
        const taskList = document.getElementById('todo-list');
        taskList.innerHTML = '';

        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;

            if (task.isDone) {
                li.style.textDecoration = "line-through";
                li.style.color = "grey";
            }

            li.setAttribute('draggable', true);
            li.addEventListener('dragstart', () => {
                this.draggedIndex = index;
            });

            li.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            li.addEventListener('drop', () => {
                this.swapTasks(this.draggedIndex, index);
            });

            li.addEventListener('click', () => this.toggleDone(index));

            li.addEventListener('dblclick', () => this.removeTask(index));

            taskList.appendChild(li);
        });
    }
};

// Load tasks on page load
taskManager.displayTasks();


// Add task functionality with the "Enter" key
document.getElementById('task').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const taskText = document.getElementById('task').value;
        if (taskText.trim() !== "") {
            taskManager.addTask(taskText);
            playSound('addTaskSound.mp3');
            document.getElementById('task').value = '';
        } else {
            alert("Task cannot be empty");
        }
        event.preventDefault();
    }
});


// Sorting functionality
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

window.addEventListener('load', function() {
    let savedColor = localStorage.getItem('bgColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }
});

// Switch statement to handle background color changes
document.getElementById('changeColorBtn').addEventListener('click', function() {
    let colorIndex = Math.floor(Math.random() * 4);
    let newColor;

    switch (colorIndex) {
        case 0:
            newColor = '#C3073F';
            break;
        case 1:
            newColor = '#6F2232';
            break;
        case 2:
            newColor = '#950740';
            break;
        case 3:
            newColor = '#1A1A1D';
            break;
        default:
            newColor = '#f0f0f0';
    }

    document.body.style.backgroundColor = newColor;
    localStorage.setItem('bgColor', newColor);
});

// Toggle between day and night themes
document.getElementById('themeToggleBtn').addEventListener('click', function() {
    document.body.classList.toggle('night-mode');
});

// Random number guessing game
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
        playSound('CorrectGuessSound.mp3');
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
    }

    document.getElementById('guessInput').value = '';
});

// Star rating system
document.querySelectorAll('.star').forEach((star, index) => {
    star.addEventListener('click', function() {
        document.querySelectorAll('.star').forEach((s, i) => {
            if (i <= index) {
                s.style.color = 'gold';
            } else {
                s.style.color = '';
            }
        });
    });
});

// Play sound function
function playSound(sound) {
    const audio = new Audio(sound);
    audio.play();
}

// Update date and time every second
function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });
    document.getElementById('datetime').textContent = formattedDateTime;
}
setInterval(updateDateTime, 1000);
updateDateTime();


