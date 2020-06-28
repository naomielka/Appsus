const regex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/gmi;
import { utilsService } from './utils.service.js'

var gNotes = createNotes()
var gPinnedNotes = createPinnedNotes()

function getNotes() {
    return Promise.resolve(gNotes);
}

function getPinnedNotes() {
    return Promise.resolve(gPinnedNotes);
}


// var pinnedNotes = [{

//         type: "noteText",
//         info: { txt: "First ever text note!", id: utilsService.getRandomId(), isPinned: true, }
//     },

// ];
// var notes = [{
//         type: "noteEmail",

//         info: {
//             isPinned: false,
//             id: utilsService.getRandomId(),
//             from: 'Avraham',
//             subject: 'Where is my money',
//             txt: 'pick up the phone!!',
//         }
//     },
//     {

//         type: "noteText",

//         info: { txt: "Second text note ever created", id: utilsService.getRandomId(), isPinned: false, }
//     },
//     {

//         type: "noteText",

//         info: { txt: "Buy some milk", id: utilsService.getRandomId(), isPinned: false, }
//     },
//     {

//         type: "noteImg",
//         info: {
//             txt: '',
//             isPinned: false,
//             id: utilsService.getRandomId(),
//             url: "https://cdn.searchenginejournal.com/wp-content/uploads/2018/04/durable-urls-760x400.png",
//             title: "Me playing Mi"
//         },
//         style: { backgroundColor: "#00d" }
//     },
//     {
//         type: "noteTodos",
//         info: {
//             txt: '',
//             isPinned: false,
//             id: utilsService.getRandomId(),
//             label: "Groceries:",
//             todos: [{
//                 txt: "Some Milk",
//                 doneAt: true
//             }, {
//                 txt: "Tomato",
//                 doneAt: true
//             }]
//         }
//     },
//     {
//         type: "noteTodos",
//         info: {
//             txt: '',
//             isPinned: false,
//             id: utilsService.getRandomId(),
//             label: "תומך בעברית?:",
//             todos: [{
//                     txt: "לא",
//                     doneAt: true
//                 },
//                 {
//                     txt: "כן",
//                     doneAt: false
//                 }
//             ]
//         }
//     },
//     {
//         type: "noteVideo",
//         info: {
//             txt: 'video',
//             isPinned: false,
//             id: utilsService.getRandomId(),
//             src: "https://www.youtube.com/embed/r6hRHTu4HUw",
//         }
//     },
// ];
function createPinnedNotes() {
    const pinnedNotes = utilsService.loadFromStorage('pinnedNotes')
    if (pinnedNotes) return pinnedNotes
    const preMadePinnedNotes = [{

        type: "noteText",
        info: { txt: "First ever text note!", id: utilsService.getRandomId(), isPinned: true, }
    }]
    utilsService.storeToStorage('pinnedNotes', preMadePinnedNotes)
    return preMadePinnedNotes
}


function createNotes() {
    const notes = utilsService.loadFromStorage('notes')
    if (notes) return notes
    const preMadeNotes = [{
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

            info: { txt: "Second text note ever created", id: utilsService.getRandomId(), isPinned: false, }
        },
        {

            type: "noteText",

            info: { txt: "Buy some milk", id: utilsService.getRandomId(), isPinned: false, }
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
                label: "Groceries:",
                todos: [{
                    txt: "Some Milk",
                    doneAt: true
                }, {
                    txt: "Tomato",
                    doneAt: true
                }]
            }
        },
        {
            type: "noteVideo",
            info: {
                txt: 'video',
                isPinned: false,
                id: utilsService.getRandomId(),
                src: "https://www.youtube.com/embed/4UuNqx_3Nrc",
            }
        },
        {
            type: "noteTodos",
            info: {
                txt: '',
                isPinned: false,
                id: utilsService.getRandomId(),
                label: "תומך בעברית?:",
                todos: [{
                        txt: "לא",
                        doneAt: true
                    },
                    {
                        txt: "כן",
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
    utilsService.storeToStorage('notes', preMadeNotes)
    return preMadeNotes
}

const moveNote = {
    pinNote: (noteId) => {
        let notes = getNotes()
            .then(notes => {
                let noteIdx = notes.findIndex((note) => note.info.id === noteId);
                notes[noteIdx].info.isPinned = true
                getPinnedNotes()
                    .then(pinnedNotes => {
                        pinnedNotes.unshift(notes[noteIdx])
                        notes.splice(noteIdx, 1)
                        utilsService.storeToStorage('pinnedNotes', pinnedNotes)
                        utilsService.storeToStorage('notes', notes)
                    })
            })






        // let noteIdx = notes.findIndex((note) => note.info.id === noteId);
        // notes[noteIdx].info.isPinned = true
        // pinnedNotes.unshift(notes[noteIdx])
        // notes.splice(noteIdx, 1)
    },
    unpinNote: (noteId) => {
        let pinnedNotes = getPinnedNotes()
            .then(pinnedNotes => {
                let noteIdx = pinnedNotes.findIndex((note) => note.info.id === noteId);
                pinnedNotes[noteIdx].info.isPinned = false
                getNotes()
                    .then(notes => {
                        notes.unshift(pinnedNotes[noteIdx])
                        pinnedNotes.splice(noteIdx, 1)
                        utilsService.storeToStorage('pinnedNotes', pinnedNotes)
                        utilsService.storeToStorage('notes', notes)
                    })
            })





        // let noteIdx = pinnedNotes.findIndex((note) => note.info.id === noteId);
        // pinnedNotes[noteIdx].info.isPinned = false
        // notes.unshift(pinnedNotes[noteIdx])
        // pinnedNotes.splice(noteIdx, 1)
    },
}

function storeNote(newNote) {
    getNotes()
        .then(notes => {
            notes.push(newNote)
            utilsService.storeToStorage('notes', notes)
        })

}

const createNote = {
    // newNote: null ,


    createTextNote: (txt) => {
        let newNote = {
            type: "noteText",

            info: {
                isPinned: false,
                id: utilsService.getRandomId(),
                txt: txt
            }
        }
        storeNote(newNote)
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
        storeNote(newNote)
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
        storeNote(newNote)
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

        storeNote(newNote)
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
        storeNote(newNote)
    }



}

function deleteNote(id) {
    let notes = getNotes()
    notes.then(notes => {
            var noteIdx = notes.findIndex((note) => note.info.id === id);
            if ((noteIdx === -1)) {
                var pinnedNotes = getPinnedNotes()
                pinnedNotes.then(pinnedNotes => {
                    noteIdx = pinnedNotes.findIndex((note) => note.info.id === id)
                    pinnedNotes.splice(noteIdx, 1)
                    utilsService.storeToStorage('pinnedNotes', pinnedNotes)
                })
                return
            }
            notes.splice(noteIdx, 1)
            utilsService.storeToStorage('notes', notes)
        })
        // if (noteIdx === -1) {
        //     noteIdx = pinnedNotes.findIndex((note) => note.info.id === id)
        //     pinnedNotes.splice(noteIdx, 1)
        //     return
        // }
        // notes.splice(noteIdx, 1)
        // utilsService.storeToStorage('notes', notes)
}


export const notesService = {
    getNotes,
    getPinnedNotes,
    createNote,
    deleteNote,
    moveNote
}