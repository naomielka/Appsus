// import { emailService } from '../services/email.service.js'
// import emailList from '../cmps/email-list.cmp.js';
// import emailFilter from '../cmps/email-filter.cmp.js';

export default {
    template: `
    <div>
        <email-filter></email-filter>
        <email-list></email-list>
    </div>`,
    data() {
        return {
            emails: [],
        }
    },
    computed: {},
    created() {
        emailService.getEmails()
            .then((emails) => {
                this.emails = emails;
            })
        console.log(this.emails)
    },
    methods: {},
    components: {
        emailList,
        emailFilter,
    }
}