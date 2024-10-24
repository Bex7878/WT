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

// Switch statement to handle background color changes
document.getElementById('changeColorBtn').addEventListener('click', function() {
    let colorIndex = Math.floor(Math.random() * 4);
    switch (colorIndex) {
        case 0:
            document.body.style.backgroundColor = '#C3073F';
            break;
        case 1:
            document.body.style.backgroundColor = '#6F2232';
            break;
        case 2:
            document.body.style.backgroundColor = '#950740';
            break;
        case 3:
            document.body.style.backgroundColor = '#1A1A1D';
            break;
        default:
            document.body.style.backgroundColor = '#f0f0f0';
    }
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
function playSound(soundFile) {
    const audio = new Audio(soundFile);
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


