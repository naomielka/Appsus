import { emailService } from '../../../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <div class="email-status" >
        <span>Read Emails: {{readEmails}}</span>
        <span>Unread Emails: {{unreadEmails}}</span>
    </div>`,
    data() {
        return {
            readEmails: 0,
            unreadEmails: 0
        }
    },
    computed: {},
    methods: {
        countEmails() {
            emailService.countReadEmails()
                .then(emailCount => {
                    this.readEmails = emailCount.readEmailsCount
                    this.unreadEmails = emailCount.unreadEmailsCount
                })
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