import { emailService } from '../../../services/email.service.js'

export default {
    template: `
    <div>
{{readEmails}}
    </div>`,
    data() {
        return {

        }
    },
    computed: {
        readEmails() {
            return emailService.countReadEmails()
        }
    },
    methods: {

    },

}