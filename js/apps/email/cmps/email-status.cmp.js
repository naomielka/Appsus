import { emailService } from '../../../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <div >
{{readEmails}}
    </div>`,
    data() {
        return {
            readEmails: 0,
        }
    },
    computed: {},
    methods: {
        countEmails() {
            this.readEmails = emailService.countReadEmails()
            console.log('triggered count');

        }

    },
    created() {
        this.countEmails()
    },

    components: {
        eventBus
    },
    mounted() {
        eventBus.$on('emailRead', this.countEmails)
    },
}