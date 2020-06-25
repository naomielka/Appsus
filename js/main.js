import { myRouter } from './routes.js'
import notesApp from './apps/notes/pages/note-app.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';
import navbar from './cross-app-cmps/navbar.cmp.js'
import appHeader from './cross-app-cmps/appHeader.cmp.js'
import { emailService } from './services/email.service.js';



new Vue({
    el: '#Appsus',
    router: myRouter,
    template: `
    <div>
        <app-header></app-header>
        <navbar></navbar>
        <main>
            <router-view/>
        </main>
    </div> 
    `,
    components: {
        appHeader,
        emailApp,
        notesApp,
        navbar,
        emailService
    }
});