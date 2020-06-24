import { emailService } from '../../../services/email.service.js'
import { utilsService } from '../../../services/utils.service.js'
import emailList from '../cmps/email-list.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js'
// import emailFilter from '../cmps/email-filter.cmp.js';

export default {
    template: `
    <div>
        <email-list :emails="emails"></email-list>
        <!-- <email-compose></email-compose> -->
    </div>`,
    data() {
        return {
            emails: [],
        }
    },
    computed: {},
    created() {
        if (utilsService.loadFromStorage('emails')) {
            this.emails = utilsService.loadFromStorage('emails');
        } else {
            this.emails = emailService.getEmails()
                .then((emails) => {
                    this.emails = emails;
                    utilsService.storeToStorage('emails', emails);
                })
        }
    },
    methods: {},
    components: {
        emailList,
        // emailFilter,
        eventBus
    }
}