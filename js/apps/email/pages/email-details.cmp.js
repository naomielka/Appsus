import { emailService } from '../../../services/email.service.js';

export default {
    template: `
    <div v-if="email">
        <section class="email-header flex space-between">
            <h1>Subject: {{email.subject}}</h1> 
            <div class="action-buttons">
                <button @click="deleteEmail">delete</button>
                <button>full screen</button>
            </div>
        </section>
        <h3>from: {{email.from}}</h3>
        <p>Sent at: {{sentAt}}</p>
        <p>{{email.body}}</p>
    </div>
    `,
    data() {
        return {
            email: null,
        }
    },
    computed: {
        sentAt() {
            var sentAtDate = new Date(this.email.sentAt);
            var minute = sentAtDate.getMinutes()
            if (minute < 10) minute = '0' + minute;
            var hour = sentAtDate.getHours()
            if (hour < 10) hour = '0' + hour;
            var day = sentAtDate.getDate()
            var month = sentAtDate.getMonth() + 1
            var year = sentAtDate.getFullYear()
            var strTime = `${hour}:${minute}  ${day}/${month}/${year} `;
            return strTime
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
        },
        deleteEmail() {
            emailService.deleteEmail(this.email.id)
            this.$router.replace('/email')

        }
    },
}