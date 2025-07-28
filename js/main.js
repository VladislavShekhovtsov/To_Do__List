// const input = document.getElementById('inputText');
// const notesBlock = document.getElementById('notesBlock');
// const button = document.getElementById('button');

// const notes = [];


// const notesFunctions = () => {
//     const notesValue = input.value;
//     const valueTrim = notesValue.trim();

//     if (valueTrim === '') {
//         console.log('Введите заметку')
//         return;
//     } else {

//         notes.push(notesValue);
//         input.value = ""
//     }
//     console.log(notes);
//     console.log('Заметка была добавлена!')

//     const noteElement = document.createElement('div')
//     const noteButton = document.createElement('button')

//     noteButton.innerHTML = `<span>Delete</span>`

//     noteElement.textContent = notesValue;
//     noteElement.classList.add('note')

//     noteElement.setAttribute('draggable', 'true');
//     noteElement.setAttribute('id', `note-${Date.now()}`);

//     noteElement.addEventListener('dragstart', drag);
//     noteButton.classList.add('note-button')
//     noteButton.classList.add('slide-button')

//     notesBlock.appendChild(noteElement);
//     noteElement.append(noteButton);

//     noteButton.addEventListener("click", () => {
//         noteElement.remove();
//     });
//     noteElement.setAttribute('ondragover', 'allowDrop(event)')
//     noteElement.setAttribute('ondrop', 'drop(event)')


// }

// function allowDrop(event) {
//     event.preventDefault();
// }

// function drag(event) {
//     event.dataTransfer.setData("text", event.target.id);
// }

// function drop(event) {
//     event.preventDefault();
//     const id = event.dataTransfer.getData("text");
//     const draggedElement = document.getElementById(id);

//     if (draggedElement) {
//         event.target.appendChild(draggedElement);
//     }
// }






// button.addEventListener("click", notesFunctions);

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

    // Добавляем элементы в DOM
    noteElement.appendChild(noteButton);
    notesBlock.appendChild(noteElement);

    // Удаление заметки
    noteButton.addEventListener("click", () => {
        noteElement.remove();
    });

    // Drag events
    noteElement.addEventListener('dragstart', drag);
};

// Разрешаем сброс
function allowDrop(event) {
    event.preventDefault();
}

// Запоминаем, что тащим
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Сброс элемента
function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(id);

    // Проверяем, что сбрасываем в контейнер, а не в другую заметку
    if (event.target.id === 'notesBlock' || event.target.id === 'notesBlockDone') {
        event.target.appendChild(draggedElement);

        // Если переносим в Done-блок → добавляем зеленый стиль
        if (event.target.id === 'notesBlockDone') {
            draggedElement.classList.add('done');
        } else {
            draggedElement.classList.remove('done'); // если вернули обратно
        }
    }
}

button.addEventListener("click", notesFunctions);
