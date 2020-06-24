//import homePage from './home-page.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';
import notesApp from './apps/notes/pages/note-app.cmp.js';







const myRoutes = [
    // {
    //     path: '/',
    //     component: homePage
    // },

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