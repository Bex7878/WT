const draggables = document.querySelectorAll('.draggable');
const droppables = document.querySelectorAll('.droppable');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

droppables.forEach(droppable => {
    droppable.addEventListener('dragover', (e) => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        droppable.appendChild(dragging);
    });
});




const quizForm = document.querySelector('#quizForm');
const quizResult = document.querySelector('#quizResult');

quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let score = 0;
    const answers = new FormData(quizForm);
    answers.forEach((value) => {
        if (value === 'correct') {
            score++;
        }
    });
    quizResult.textContent = `You scored ${score} out of 4!`;
});


