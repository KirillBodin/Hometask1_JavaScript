import { NowDate, getDates } from './utils/date.js';
import { data } from '../data/data.js';

const notes = {
    data,
};

export const fillDataNotes = () => notes.data.filter((i) => !i.archived);

export const fillDataArchive = () => notes.data.filter((i) => i.archived);

export const editNote = (data, id) => {
    try {
        const note = notes.data.find((i) => i.id === id);
        if (!note) {
            throw new Error('Note not found');
        }
        note.name = data.name;
        note.category = data.category;
        note.content = data.content;
        note.dates = getDates(data.content);
    } catch (error) {
        console.error(error);
    }
};

export const changeArchived = (id) => {
    try {
        const note = notes.data.find((note) => note.id === id);
        if (!note) {
            throw new Error('Note not found');
        }
        note.archived = !note.archived;
    } catch (error) {
        console.error(error);
    }
};

export const deleteNote = (id) => {
    try {
        notes.data = notes.data.filter((note) => note.id !== id);
    } catch (error) {
        console.error(error);
    }
};

export const createNote = (data) => {
    try {
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
    } catch (error) {
        console.error(error);
    }
};

export const deleteAllNotes = () => {
    try {
        notes.data = [];
    } catch (error) {
        console.error(error);
    }
};

export const getCategory = () => {
    try {
        return notes.data.reduce((acc, note) => {
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
    } catch (error) {
        console.error(error);
        return [];
    }
};
