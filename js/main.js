import { myRouter } from './routes.js'
import notesApp from './apps/notes/pages/note-app.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';

new Vue({
    el: '#Appsus',
    router: myRouter,
    template: `
    <div>
        <!-- <app-header></app-header> -->

        <nav>
       <router-link to='/homepage'> homepages</router-link>
       <router-link to='/email'> email</router-link>
       <router-link to='/notes'>notes</router-link>
        </nav>


        <main>
            <!-- <email-app></email-app> -->
            <router-view > </router-view>
        </main>
    </div> 
    `,
    components: {
        // appHeader,
        emailApp,
        notesApp
    }
});