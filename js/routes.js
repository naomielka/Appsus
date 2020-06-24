//import homePage from './home-page.cmp.js';
// import emailApp from './home-page.cmp.js';
import notesApp from './apps/notes/pages/note-app.cmp.js';







const myRoutes = [{
        path: '/',
        component: homePage
    },

    {
        path: '/email',
        component: emailApp

    },
    {
        path: '/notes',
        component: notesApp

    },

];

export const myRouter = new VueRouter({ routes: myRoutes })