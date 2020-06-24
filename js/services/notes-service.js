const regex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/gmi;
import { utilsService } from './utils.service.js'


function getById() {
    return Promise.resolve(notes);
}


var notes = [{

        type: "noteText",
        isPinned: true,
        info: { txt: "First text note", id: utilsService.getRandomId() }
    },
    {

        type: "noteText",
        isPinned: true,
        info: { txt: "second text note!", id: utilsService.getRandomId() }
    },
    {

        type: "noteImg",
        info: {
            url: "https://cdn.searchenginejournal.com/wp-content/uploads/2018/04/durable-urls-760x400.png",
            title: "Me playing Mi"
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: utilsService.getRandomId(),
        type: "noteTodos",
        info: {
            label: "How was it:",
            todos: [{
                txt: "Do that",
                doneAt: null
            }, {
                txt: "Do this",
                doneAt: 187111111
            }]
        }
    },
    {
        id: utilsService.getRandomId(),
        type: "noteTodos",
        info: {
            label: "How was it:",
            todos: [{
                    txt: "Do that",
                    doneAt: 187111111
                },
                {
                    txt: "Do this",
                    doneAt: 187111111
                }
            ]
        }
    },
    {
        id: utilsService.getRandomId(),
        type: "noteVideo",
        info: {
            src: "https://www.youtube.com/embed/r6hRHTu4HUw",
        }
    },
];

const createNote = {

    createTextNote: (txt) => {
        let newNote = {
            type: "noteText",
            isPinned: false,
            info: { txt: txt }
        }
        notes.unshift(newNote)
    },

    createListNote: (txt) => {
        let newNote = {
            type: "noteTodos",
            info: {
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
                src: 'https://www.youtube.com/embed/' + txt.split(regex)[1],
            }
        }
        notes.unshift(newNote)
    }



}

function deleteNote(id) {
    var noteIdx = notes.findIndex((note) => note.info.id === id);
    console.log(noteIdx);

    notes.splice(noteIdx, 1)
}


export const notesService = {
    getById,
    createNote,
    deleteNote
}