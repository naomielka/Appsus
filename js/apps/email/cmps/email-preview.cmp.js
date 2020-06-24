export default {
    props: ['email'],
    template: `
    <div>
        <!-- <div>from first letter</div> -->
        <span>{{sentAt}}</span>
        <h4>{{from}}</h4>
        <h4>{{subject}}</h4>
        <p>{{body}}</p>
    </div>
    `,
    data() {
        return {
            subject: this.email.subject,
            body: this.email.body,

            from: this.email.from
        }
    },
    computed: {
        sentAt() {
            return new Date(this.email.sentAt);
        }

    },
    methods: {},
    components: {}
}