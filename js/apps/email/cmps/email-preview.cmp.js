import { emailService } from '../../../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
export default {
    props: ['email'],
    template: `
    <div class="flex col">
        <section v-bind:class="compEmailClasses" @click="openEmail">
            <div class="img-container flex align-center justify-center">{{senderFirstLetter}}</div>
            <div class=" icons flex col justify-center space-between">
                <i @click.stop="starOrUnstarThis" v-bind:class="compStarClasses"></i>
                <i v-bind:class="compEnvelopeClasses"></i>
            </div>
                <div class="content flex col">
                <p>From: {{from}}</p>
                <p>Subject: {{subject}}</p>
                <p>{{bodyPreview}}</p>
            </div>
            <span class="sent-at">{{sentAt}}</span>
        </section>
        <div class="email-preview" v-if="isSelected">
            <section class="email-header flex space-between">
                <h1>Subject: {{email.subject}}</h1> 
                <div class="action-buttons">
                        <button @click="deleteEmail"><i class="far fa-trash-alt"></i></button>
                        <button  @click="openEmailFullScreen"><i class="fas fa-expand"></i></button>
                    </div>
            </section>
            <h3>from: {{email.from}}</h3>
            <p>Sent at: {{sentAt}}</p>
            <p>{{detailedBodyPreview}}</p>
        </div>
    </div>
    `,
    data() {
        return {
            subject: this.email.subject,
            body: this.email.body,
            from: this.email.from,
            isSelected: false,
            isRead: this.email.isRead,
            isStarred: this.email.isStarred,
            isDeleted: this.email.isDeleted
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
        compEmailClasses() {
            return {
                read: this.isRead,
                'email-preview': true,
                flex: true,
                row: true,
            }
        },
        compEnvelopeClasses() {
            if (this.isRead) return 'far fa-envelope-open'
            else return 'far fa-envelope'
        },
        compStarClasses() {
            if (this.isStarred) return 'fas fa-star'
            else return 'far fa-star'
        },
        bodyPreview() {
            if (this.email.body.length < 50) return this.email.body
            else return `${this.email.body.substring(1,50)}...`
        },
        detailedBodyPreview() {
            if (this.email.body.length < 150) return this.email.body
            else return `${this.email.body.substring(1,150)}...`
        },

    },
    mounted() {
        this.getImgContainerColor()
    },
    methods: {
        openEmail() {
            if (this.isDeleted === true) {
                this.isSelected = !this.isSelected;
            } else {
                this.isRead = true;
                emailService.updateEmail(this.email.id, 'isRead', this.isRead, );
                eventBus.$emit('emailRead')
                this.isSelected = !this.isSelected;
            }
        },
        openEmailFullScreen() {
            this.$router.push(`email/${this.email.id}`)
        },
        deleteEmail() {
            this.$emit('delete', this.email.id)
        },
        starOrUnstarThis() {
            this.isStarred = !this.isStarred;
            emailService.updateEmail(this.email.id, 'isStarred', this.isStarred);
        },
        getImgContainerColor() {
            var colors = [
                '#f8c9ae', '#f6d9a4', '#f89f9a', '#f36d4e',
                '#f0e9c2', '#ea9766', '#ff3333', '#e4d06f', '#fbc4cb', '#ec6161'
            ];
            var elDivs = document.querySelectorAll('.img-container');
            for (var i = 0; i < elDivs.length; i++) {
                var randomColor = colors[Math.floor(
                    Math.random() * colors.length)];
                var div = elDivs[i]
                div.style.backgroundColor = randomColor;
            }
        }
    },
    components: {
        eventBus
    },
}