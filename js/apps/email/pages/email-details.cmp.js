import { emailService } from '../../../services/email.service.js';

export default {
    template: `
    <main class="email-details-container">
        <div v-if="email" class="email-details">
            <section class="email-header flex space-between">
                <h1>Subject: {{email.subject}}</h1> 
                <div class="action-buttons">
                    <button @click="deleteEmail">delete</button>
                    <button @click="respond">Respond</button>
                </div>
            </section>
            <h3>from: {{email.from}}</h3>
            <p>Sent at: {{sentAt}}</p>
            <p>{{email.body}}</p>
        </div>
        <section v-if="isRespond" class="respond">
            <form class="form">
                <h3>To: {{email.from}}</h3> 
                <span>Subject: RE:{{email.subject}}</span> 
                </br>
                <textarea rows="1" cols="50" v-model="body"></textarea>     
                <button @click="sendEmail">Send</button>
            </form>
        </section>
    </main>
    `,
    data() {
        return {
            email: null,
            isRespond: false,
            body: '',
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
        this.email = this.getCurrEmail();
    },
    methods: {
        getCurrEmail() {
            const { emailId } = this.$route.params;
            var email = emailService.getEmailById(emailId);
            return email;
        },
        deleteEmail() {
            this.email.isDeleted = true;
            emailService.updateEmail(this.email.id, 'isDeleted', this.email.isDeleted);
            emailService.deleteEmail(this.email.id)
            this.$router.replace('/email');

        },
        respond() {
            this.isRespond = !this.isRespond;
        },
        sendEmail() {
            emailService.composeNewEmail(this.email.from, `RE:${this.email.subject}`, this.body)
            this.body = '';
            this.isRespond = false;

        }
    },
}