export const notesService = {
    getById
}

function getById() {
    return Promise.resolve(notes);
}


var notes = [{
        type: "noteText",
        isPinned: true,
        info: { txt: "First text note" }
    },
    {
        type: "noteText",
        isPinned: true,
        info: { txt: "second text note!" }
    },
    // {
    //     type: "noteImg",
    //     info: {
    //         url: "http://some-img/me",
    //         title: "Me playing Mi"
    //     },
    //     style: { backgroundColor: "#00d" }
    // },
    // {
    //     type: "noteTodos",
    //     info: {
    //         label: "How was it:",
    //         todos: [{
    //             txt: "Do that",
    //             doneAt: null
    //         }, {
    //             txt: "Do this",
    //             doneAt: 187111111
    //         }]
    //     }
    // }
];