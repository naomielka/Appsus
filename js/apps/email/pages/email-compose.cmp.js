import { emailService } from '../../../services/email.service.js'

export default {
    template: `
    <div>
        <form>
            <span>To:</span> <input type="text" v-model="to"/> 
            </br>
            <span>Subject:</span> <input type="text" v-model="subject"/>
            </br>
            <textarea rows="1" cols="50" v-model="body"></textarea>     
            <button @click="sendEmail">Send</button>
        </form>
    </div>
    `,
    data() {
        return {
            to: '',
            subject: '',
            body: '',
        }
    },
    created() {},
    methods: {
        sendEmail() {
            emailService.composeNewEmail(this.to, this.subject, this.body)
            this.to = '';
            this.subject = '';
            this.body = '';
        }
    },
    components: {}
}