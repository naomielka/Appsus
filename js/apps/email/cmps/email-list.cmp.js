import emailPreview from './email-preview.cmp.js';
import emailStatus from './email-status.cmp.js';
import emailFilter from './email-filter.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    props: ['emails'],
    template: `
    <div>
    <router-link to="/newEmail">Compose</router-link>
            <email-filter></email-filter>
            <email-status ></email-status>
        <ul class="clean-list">
            <li v-for="email in emails" :key="email.id">
                <email-preview :email="email"></email-preview>
            </li>
        </ul>
    </div>`,
    methods: {},
    components: {
        emailPreview,
        emailStatus,
        eventBus,
        emailFilter
    }
}