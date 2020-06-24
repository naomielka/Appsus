import { myRouter } from './routes.js'


new Vue({
    el: '#Appsus',
    router: myRouter,
    template: `
    <div>
        <app-header></app-header>

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
        appHeader,
    }
});


export const myRouter = new VueRouter({ routes: myRoutes })