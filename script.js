const addBtn = document.querySelector('.add');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtns = document.getElementsByClassName('delete-note');
const deleteAllBtn = document.getElementsByClassName('delete-all');

const noteArea = document.querySelector('.note-area');
const notePanel = document.querySelector('.note-panel');

const category = document.querySelector('#category');
const textarea = document.querySelector('#text');
const error = document.querySelector('.error');

let selectedValue;

let cardID = 0;

//otwieranie panelu

const openPanel = () => {
    notePanel.style.display = 'flex';
}

//zamykanie
const closePanel = () => {
    notePanel.style.display = 'none';
    error.style.visibility = 'hidden';
    textarea.value = '';
    category.selectedIndex = 0;

}
//dodawanie notatki
const addNote = () => {
    if (textarea.value !== '' && category.options[category.selectedIndex].value !== '0') {
        createNote();
        error.style.visibility = 'hidden'
    } else {
        error.style.visibility = 'visible'
    }
}
//tworzenie notatki
const createNote = () => {

    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.setAttribute('id', cardID);
    newNote.innerHTML = `
    		<div class="note-header">
					<h3 class="note-title">${selectedValue}</h3>
					<button class="delete-note" onclick="deleteNote(${cardID})">
						<i class="fas fa-times fa-icons"></i>
					</button>
				</div>
				<div class="note-body">
                    ${textarea.value}
					
				</div>
    
    `
    
    //dodatnie notatki to body
    noteArea.appendChild(newNote);
    //dodanie kolejnych nr notatek
    cardID++;
    // czyszczenie notatki
    textarea.value = '';
    category.selectedIndex = 0;
    notePanel.style.display = 'none';
    //wywołanie funkcji odpowiadającej za zmianę koloru notatki w zależności od kategorii
    checkColor(newNote);

}
//uchwycenie wartości pola options
const selectValue = () => {
    selectedValue = category.options[category.selectedIndex].text;

}
//dodawanie koloru notatki w zależności od wybranej kategorii
const checkColor = note => {
    switch (selectedValue) {
        case 'Shopping':
            note.style.backgroundColor = 'rgb(72,255,0)';
            break;
        case 'Work':
            note.style.backgroundColor = 'rgb(255,25,0)';
            break;
        case 'Other':
            note.style.backgroundColor = 'rgb(0,170,255)';
            break;
    }
}


const deleteNote = (id) => {
    const noteToDelete = document.getElementById(id);
    noteArea.removeChild(noteToDelete)
}
const deleteAllNotes = () => {
    noteArea.textContent = '';
}


addBtn.addEventListener('click', openPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', addNote);
deleteAllBtn.addEventListener('click', deleteAllNotes);