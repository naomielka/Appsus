import { emailService } from '../../../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
export default {
    props: ['email'],
    template: `
    <div class="flex col">
        <section v-bind:class="compClasses" @click="openEmail">
            <div class="img-container flex align-center justify-center">{{senderFirstLetter}}</div>
            <div class="content flex col">
                <p>From: {{from}}</p>
                <p>Subject: {{subject}}</p>
                <p>{{body}}</p>
            </div>
            <span class="sent-at">{{sentAt}}</span>
        </section>
        <div class="email-preview" v-if="isSelected">
            <section class="email-header flex space-between">
                <h1>Subject: {{email.subject}}</h1> 
                <div class="action-buttons">
                        <button @click="deleteEmail">delete</button>
                        <button @click="openEmailFullScreen">full screen</button>
                    </div>
            </section>
            <h3>from: {{email.from}}</h3>
            <p>Sent at: {{sentAt}}</p>
            <p>{{email.body}}</p>
        </div>
    </div>
    `,
    data() {
        return {
            subject: this.email.subject,
            body: this.email.body,
            from: this.email.from,
            isSelected: false,
            isRead: this.email.isRead
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
            var strTime = `${day}/${month}/${year}    ${hour}:${minute}`;
            return strTime
        },
        senderFirstLetter() {
            var from = this.from;
            var letter = from.charAt(0).toUpperCase()
            return letter
        },
        compClasses() {
            return {
                read: this.isRead,
                'email-preview': true,
                flex: true,
                row: true,
            }

        }
    },
    created() {
        emailService.getImgContainerColor()
    },
    methods: {
        openEmail() {
            this.isRead = true;
            emailService.updateEmail(this.email.id, 'isRead', this.isRead);
            eventBus.$emit('emailRead')
            this.isSelected = !this.isSelected;
        },
        openEmailFullScreen() {
            this.$router.push(`email/${this.email.id}`)
        },
        deleteEmail() {
            emailService.deleteEmail(this.email.id)
            this.$router.replace('/email')

        },


    },
    components: {
        eventBus
    }
}



// selecting random color