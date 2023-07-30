import { icons } from './utils/icons.js';

import {
    changeArchived,
    createNote,
    deleteAllNotes,
    deleteNote,
    editNote,
    fillDataArchive,
    fillDataNotes,
    getCategory,
} from './notesFunctions.js';

const headlines_icon_delete = document.querySelector('#headlines_icon_delete');
const headlines_icon_archive = document.querySelector('#headlines_icon_archive');
const listNotes = document.querySelector('.notes');
const categoryTemplate = document.querySelector('#category-template');
const addNoteButton = document.querySelector('#addNote');
const cancelButton = document.querySelector('#cancel');
const submitButton = document.querySelector('#submit');
const categoryBody = document.querySelector('.category_body');
const noteTemplate = document.querySelector('#note');
const form = document.querySelector('#form');
const dialog = document.querySelector('#dialog');

const addNotes = (note) => {
    try {
        const clone = noteTemplate.content.cloneNode(true);

        clone.querySelector('.logo .circle').innerHTML = icons[note.category];
        clone.querySelector('.name').textContent = note.name;
        clone.querySelector('.created').textContent = note.created;
        clone.querySelector('.category').textContent = note.category;
        clone.querySelector('.content').textContent = note.content;
        clone.querySelector('.dates').textContent = note.dates;

        clone
            .querySelector('.edit')
            .addEventListener('click', () => showDialog('edit', note), false);

        if (listNotes.dataset.status === 'active') {
            clone.querySelector('.archive').innerHTML = icons.UnArchive;
        } else {
            clone.querySelector('.archive').innerHTML = icons.Archive;
        }

        clone.querySelector('.archive').addEventListener('click', () => {
            try {
                changeArchived(note.id);
                updateTables();
            } catch (error) {
                console.error(error);
            }
        });

        clone.querySelector('.delete').addEventListener('click', () => {
            try {
                deleteNote(note.id);
                updateTables();
            } catch (error) {
                console.error(error);
            }
        });

        listNotes.appendChild(clone);
    } catch (error) {
        console.error(error);
    }
};

const updateTables = () => {
    try {
        listNotes.innerHTML = '';
        categoryBody.innerHTML = '';
        if (listNotes.dataset.status === 'active') {
            fillTable(listNotes, fillDataNotes());
        } else {
            fillTable(listNotes, fillDataArchive());
        }
        fillTable(categoryBody, getCategory());
    } catch (error) {
        console.error(error);
    }
};

const addCategory = (category) => {
    try {
        const clone = categoryTemplate.content.cloneNode(true);
        clone.querySelector('.logo .circle').innerHTML = icons[category.name];
        clone.querySelector('.category').textContent = category.name;
        clone.querySelector('.active-count').textContent = category.active;
        clone.querySelector('.archive-count').textContent = category.archived;

        categoryBody.appendChild(clone);
    } catch (error) {
        console.error(error);
    }
};

const showDialog = (mode = 'create', note) => {
    try {
        form.dataset.mode = mode;
        form.dataset.noteId = note?.id;
        if (note) {
            form.querySelector('#name').value = note.name;
            form.querySelector('#category').value = note.category;
            form.querySelector('#content').value = note.content;
        }
        dialog.showModal();
        cancelButton.addEventListener('click', () => {
            dialog.close();
        });
        submitButton.addEventListener('click', () => {
            updateTables();
        });
    } catch (error) {
        console.error(error);
    }
};

form.addEventListener('submit', (event) => {
    try {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target).entries());
        if (form.dataset.mode === 'edit') {
            editNote(formData, form.dataset.noteId);
        } else {
            createNote(formData);
        }
        dialog.close();
        updateTables();
    } catch (error) {
        console.error(error);
    }
});

const fillTable = (table, tableContent) => {
    try {
        if (table === listNotes) {
            tableContent.forEach((el) => addNotes(el));
        }
        if (table === categoryBody) {
            tableContent.forEach((el) => addCategory(el));
        }
    } catch (error) {
        console.error(error);
    }
};

headlines_icon_archive.addEventListener('click', () => {
    try {
        listNotes.innerHTML = '';
        if (listNotes.dataset.status === 'active') {
            document.querySelector('#headlines_icon_archive').innerHTML = icons.Archive;
            listNotes.dataset.status = 'archive';
            fillTable(listNotes, fillDataArchive());
        } else {
            document.querySelector('#headlines_icon_archive').innerHTML = icons.UnArchive;
            listNotes.dataset.status = 'active';
            fillTable(listNotes, fillDataNotes());
        }
    } catch (error) {
        console.error(error);
    }
});

headlines_icon_delete.addEventListener('click', () => {
    try {
        deleteAllNotes();
        updateTables();
    } catch (error) {
        console.error(error);
    }
});

fillTable(listNotes, fillDataNotes());
fillTable(categoryBody, getCategory());
