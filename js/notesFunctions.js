import {NowDate,getDates} from './utils/date.js'
import {data} from '../data/data.js';


const notes = {
    data,
};

export const fillDataNotes = () => notes.data.filter((i) => !i.archived);

export const fillDataArchive = () => notes.data.filter((i) => i.archived);

export const editNote = (data, id) => {
    const note = notes.data.find((i) => i.id === id);
    note.name = data.name;
    note.category = data.category;
    note.content = data.content;
    note.dates = getDates(data.content);
};

export const changeArchived = (id) => {
    const note = notes.data.find((note) => note.id === id);
    note.archived = !note.archived;
};

export const deleteNote = (id) => {
    notes.data = notes.data.filter((note) => note.id !== id);
};

export const createNote = (data) => {
    const note = {
        id: Date.now().toString(),
        name: data.name,
        created: NowDate(),
        category: data.category,
        content: data.content,
        dates: getDates(data.content),
        archived: false,
    };
    notes.data.push(note);
};

export const deleteAllNotes = () => {
    notes.data = [];
};

export const getCategory = () =>
    notes.data.reduce((acc, note) => {
        const category = acc.find((el) => el.name === note.category);
        if (!category) {
            return [
                ...acc,
                {
                    name: note.category,
                    active: note.archived ? 0 : 1,
                    archived: note.archived ? 1 : 0,
                },
            ];
        }
        note.archived ? category.archived++ : category.active++;
        return acc;
    }, []);