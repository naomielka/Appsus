import homePage from './cross-app-cmps/homepage/homePage.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';
import emailDetails from './apps/email/pages/email-details.cmp.js';
import emailCompose from './apps/email/pages/email-compose.cmp.js';
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
        path: '/email/:emailId',
        component: emailDetails
    },
    {
        path: '/newEmail',
        component: emailCompose
    },
    {
        path: '/notes',
        component: notesApp
    },

];

export const myRouter = new VueRouter({ routes: myRoutes })