import { emailService } from '../../../services/email.service.js'
import { notesService } from '../../../services/notes-service.js'

export default {
    template: `
    <div class="email-compose">
        <form>
            <span>To:</span> <input type="text" v-model="to"/> 
            </br>
            <span>Subject:</span> <input type="text" v-model="subject"/>
            </br>
            <textarea rows="1" cols="50" v-model="body"></textarea>     
            <button @click="sendNote"><i class="fas fa-sticky-note"></i></button>
            <button @click="sendEmail">Send</button>
            <button @click="goBack">Back</button>
        </form>
    </div>
    `,
    data() {
        return {
            to: this.$route.params.from,
            subject: this.$route.params.subject,
            body: this.$route.params.txt,
        }
    },
    created() {},
    methods: {
        sendEmail() {
            emailService.composeNewEmail(this.to, this.subject, this.body)
            this.to = '';
            this.subject = '';
            this.body = '';
            this.$router.replace('../../../email')
        },
        sendNote() {
            notesService.createNote.createEmailNote(this.to, this.subject, this.body)
            this.to = '';
            this.subject = '';
            this.body = '';
            console.log(this.$route.params)
            this.$router.replace('../../../notes')
        },
        goBack() {
            this.$router.replace('/email');
        }
    },
    components: {
        notesService
    }
}