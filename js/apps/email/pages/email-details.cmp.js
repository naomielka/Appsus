import { emailService } from '../../../services/email.service.js';

export default {
    template: `
    <div v-if="email">
      {{email}}
    </div>
    `,
    data() {
        return {
            email: null,
        }
    },
    created() {
        this.email = this.getCurrEmail()
    },
    methods: {
        getCurrEmail() {
            const { emailId } = this.$route.params;
            var email = emailService.getEmailById(emailId)
            return email;
        }
    },
}