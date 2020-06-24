export default {
    props: ['email'],
    template: `
    <div v-bind:class="compClasses" @click="emailRead">
        <div class="img-container flex align-center justify-center">{{senderFirstLetter}}</div>
        <div class="content flex col">
            <p>From: {{from}}</p>
            <p>Subject: {{subject}}</p>
            <p>{{body}}</p>
        </div>
        <span class="sent-at">{{sentAt}}</span>
    </div>
    `,
    data() {
        return {
            subject: this.email.subject,
            body: this.email.body,
            from: this.email.from,
            isRead: false
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
    methods: {
        emailRead() {
            this.isRead = true;

        },

    },
}