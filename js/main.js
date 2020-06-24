import { myRouter } from './routes.js'
import notesApp from './apps/notes/pages/note-app.cmp.js';



new Vue({
    el: '#Appsus',
    router: myRouter,
    template: `
    <div>
        <!-- <app-header></app-header> -->

        <nav>
       <!-- <router-link to='homepage'></router-link> -->
       <router-link to='/email'> email</router-link>
       <router-link to='/notes'>notes</router-link>
        </nav>


        <main>
            <router-view />
        </main>
    </div> 
    `,
    components: {
        // appHeader,
    }
});