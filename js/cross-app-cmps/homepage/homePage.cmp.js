import about from './about.cmp.js'
import { homepageService } from '../../services/homepage.service.js'

export default {
    template: `
    <section class="homepage flex col align-center">
        <!-- <h2>Welcome to our AppSus!</h2> -->
        <main class="flex row">
        <ul class="clean-list">
            <li v-for="creator in creators">
                <about :creator="creator"></about>
            </li>
        </ul>
            <section class="nav-homepage flex col">
            <div class="link-bc flex justify-center align-center">
                <div class="bc-div flex justify-center align-center">
                    <router-link class="nav-button " to="/"> Homepage</router-link>
                </div>
            </div>
            <div class="link-bc flex justify-center align-center">
                <div class="bc-div flex justify-center align-center">
                    <router-link class="nav-button " to="/email"> Email</router-link>
                </div>
            </div>
            <div class="link-bc flex justify-center align-center">
                <div class="bc-div flex justify-center align-center">
                    <router-link class="nav-button " to="/notes">Notes</router-link>
                </div>
            </div>
        </section>
        </main>
    </section>
    `,
    computed: {
        creators() {
            return homepageService.getCreators()
        }
    },
    components: {
        about
    }
}