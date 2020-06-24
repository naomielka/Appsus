new Vue({
    el: '#Appsus',
    // router: myRouter,
    template: `
    <div>
        <app-header></app-header>

        <nav>

       <router-link to='homepage'></router-link>
       <router-link to='email'></router-link>
       <router-link to='notes'></router-link>

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