import { emailService } from '../../../services/email.service.js'
import { notesService } from '../../../services/notes-service.js'

export default {
    template: `
    <div>
        <form class="email-compose">
            <span>To:</span> <input type="text" v-model="to"/> 
            </br>
            <span>Subject:</span> <input type="text" v-model="subject"/>
            </br>
            <textarea rows="1" cols="50" v-model="body"></textarea>     
            <button @click="sendNote"><i class="fas fa-sticky-note"></i></button>
            <button @click="sendEmail">Send <i class="far fa-paper-plane"></i></button>
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
    created() {
        console.log(this.$route.params.from);
    },
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
        }
    },
    components: {
        notesService
    }
}