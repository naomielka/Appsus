import emailApp from './apps/email/pages/email-app.cmp.js';

new Vue({
    el: '#Appsus',
    // router: myRouter,
    template: `
    <div>
        <!-- <app-header></app-header> -->
        <main>
            <email-app></email-app>
            <router-view />
        </main>
    </div> 
    `,
    components: {
        // appHeader,
        emailApp
    }
});