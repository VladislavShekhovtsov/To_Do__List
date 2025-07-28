const input = document.getElementById('inputText');
const notesBlock = document.getElementById('notesBlock');
const notesBlockDone = document.getElementById('notesBlockDone');
const button = document.getElementById('button');

const notes = [];

const notesFunctions = () => {
    const notesValue = input.value;
    const valueTrim = notesValue.trim();

    if (valueTrim === '') {
        console.log('Введите заметку');
        return;
    }

    notes.push(notesValue);
    input.value = "";

    const noteElement = document.createElement('div');
    const noteButton = document.createElement('button');

    noteElement.textContent = notesValue;
    noteElement.classList.add('note');
    noteElement.setAttribute('draggable', 'true');
    noteElement.setAttribute('id', `note-${Date.now()}`);

    noteButton.innerHTML = `<span>Delete</span>`;
    noteButton.classList.add('note-button', 'slide-button');

    noteElement.appendChild(noteButton);
    notesBlock.appendChild(noteElement);

    noteButton.addEventListener("click", () => {
        noteElement.remove();
    });

    noteElement.addEventListener('dragstart', drag);
};

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(id);

    if (event.target.id === 'notesBlock' || event.target.id === 'notesBlockDone') {
        event.target.appendChild(draggedElement);


        if (event.target.id === 'notesBlockDone') {
            draggedElement.classList.add('done');
        } else {
            draggedElement.classList.remove('done'); 
        }
    }
}

button.addEventListener("click", notesFunctions);
