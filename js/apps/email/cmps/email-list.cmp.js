import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    template: `
    <div>
    <router-link to="/email/newEmail">Compose</router-link>
            <!-- <email-filter></email-filter> -->
        <ul class="clean-list">
            <li v-for="email in emails" :key="email.id">
                <email-preview :email="email"></email-preview>
            </li>
        </ul>
    </div>`,
    methods: {},
    components: {
        emailPreview
    }
}