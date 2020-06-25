import { myRouter } from './routes.js'
import notesApp from './apps/notes/pages/note-app.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';
import navbar from './cross-app-cmps/navbar.cmp.js'


new Vue({
    el: '#Appsus',
    router: myRouter,
    template: `
    <div>
        <!-- <app-header></app-header> -->
        <navbar></navbar>
        <main>
            <!-- <email-app></email-app> -->
            <router-view/>
        </main>
    </div> 
    `,
    components: {
        // appHeader,
        emailApp,
        notesApp,
        navbar,
    }
});