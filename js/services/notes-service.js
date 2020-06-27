const regex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/gmi;
import { utilsService } from './utils.service.js'


function getNotes() {
    return Promise.resolve(notes);
}

function getPinnedNotes() {
    return Promise.resolve(pinnedNotes);
}


var pinnedNotes = [{

        type: "noteText",
        info: { txt: "First text note", id: utilsService.getRandomId(), isPinned: true, }
    },

];
var notes = [{
        type: "noteEmail",

        info: {
            isPinned: false,
            id: utilsService.getRandomId(),
            from: 'Avraham',
            subject: 'Where is my money',
            txt: 'pick up the phone!!',
        }
    },
    {

        type: "noteText",

        info: { txt: "First text note", id: utilsService.getRandomId(), isPinned: false, }
    },
    {

        type: "noteText",

        info: { txt: "second text note!", id: utilsService.getRandomId(), isPinned: false, }
    },
    {

        type: "noteImg",
        info: {
            txt: '',
            isPinned: false,
            id: utilsService.getRandomId(),
            url: "https://cdn.searchenginejournal.com/wp-content/uploads/2018/04/durable-urls-760x400.png",
            title: "Me playing Mi"
        },
        style: { backgroundColor: "#00d" }
    },
    {
        type: "noteTodos",
        info: {
            txt: '',
            isPinned: false,
            id: utilsService.getRandomId(),
            label: "How was it:",
            todos: [{
                txt: "Do dat",
                doneAt: true
            }, {
                txt: "Do this",
                doneAt: false
            }]
        }
    },
    {
        type: "noteTodos",
        info: {
            txt: '',
            isPinned: false,
            id: utilsService.getRandomId(),
            label: "How was it:",
            todos: [{
                    txt: "Do that",
                    doneAt: true
                },
                {
                    txt: "Do this",
                    doneAt: false
                }
            ]
        }
    },
    {
        type: "noteVideo",
        info: {
            txt: 'video',
            isPinned: false,
            id: utilsService.getRandomId(),
            src: "https://www.youtube.com/embed/r6hRHTu4HUw",
        }
    },
];


const moveNote = {
    pinNote: (noteId) => {
        let noteIdx = notes.findIndex((note) => note.info.id === noteId);
        notes[noteIdx].info.isPinned = true
        pinnedNotes.unshift(notes[noteIdx])
        notes.splice(noteIdx, 1)
    },
    unpinNote: (noteId) => {
        let noteIdx = pinnedNotes.findIndex((note) => note.info.id === noteId);
        pinnedNotes[noteIdx].info.isPinned = false
        notes.unshift(pinnedNotes[noteIdx])
        pinnedNotes.splice(noteIdx, 1)
    },
}

const createNote = {

    createTextNote: (txt) => {
        let newNote = {
            type: "noteText",

            info: {
                isPinned: false,
                id: utilsService.getRandomId(),
                txt: txt
            }
        }
        notes.unshift(newNote)
    },
    createEmailNote: (from, subj, txt) => {
        let newNote = {
            type: "noteEmail",

            info: {
                isPinned: false,
                id: utilsService.getRandomId(),
                from: from,
                subject: subj,
                txt: txt,
            }
        }
        notes.unshift(newNote)
    },

    createListNote: (txt) => {
        let newNote = {
            type: "noteTodos",
            info: {
                isPinned: false,
                id: utilsService.getRandomId(),
                label: txt,
                todos: [{
                    txt: "Do that",
                    doneAt: null
                }, {
                    txt: "Do this",
                    doneAt: 187111111
                }]
            }
        }
        notes.unshift(newNote)
    },


    createImgNote: (txt, url) => {
        let newNote = {
            type: "noteImg",
            info: {
                isPinned: false,
                id: utilsService.getRandomId(),
                url: url,
                title: txt
            },
            style: { backgroundColor: "#00d" }
        }

        notes.unshift(newNote)
    },
    createVideoNote: (txt) => {
        let newNote = {
            type: "noteVideo",
            info: {
                isPinned: false,
                id: utilsService.getRandomId(),
                src: 'https://www.youtube.com/embed/' + txt.split(regex)[1],
            }
        }
        notes.unshift(newNote)
    }



}

function deleteNote(id) {
    var noteIdx = notes.findIndex((note) => note.info.id === id);
    if (noteIdx === -1) {
        noteIdx = pinnedNotes.findIndex((note) => note.info.id === id)
        pinnedNotes.splice(noteIdx, 1)
        return
    }
    notes.splice(noteIdx, 1)
}


export const notesService = {
    getNotes,
    getPinnedNotes,
    createNote,
    deleteNote,
    moveNote
}