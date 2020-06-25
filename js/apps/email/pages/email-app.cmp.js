import { emailService } from '../../../services/email.service.js'
import { utilsService } from '../../../services/utils.service.js'
import emailList from '../cmps/email-list.cmp.js';
import emailSidebar from '../cmps/email-sidebar.cmp.js';
import emailStatus from '../cmps/email-status.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <div class="email-app flex row">
        <email-sidebar></email-sidebar>
        <div class="flex col width-all">
        <section class="top-bar flex row space-between align-center">
            <email-filter @filtered="getFilter"></email-filter>
            <email-status ></email-status>
        </section>
        <email-list :emails="emailsToShow"></email-list>
    </div>
    </div>`,
    data() {
        return {
            emails: [],
            filterBy: null,
            filterType: null
        }
    },
    computed: {
        emailsToShow() {
            if (this.filterBy === null && this.filterType === null) {
                return this.emails;
            } else {
                var emailsToShow = []
                if (this.filterType === 'readStat') {
                    if (this.filterBy === 'read') {
                        emailsToShow = this.emails.filter(email => email.isRead === true);
                    } else if (this.filterBy === 'unread') {
                        emailsToShow = this.emails.filter(email => email.isRead === false);
                    }
                } else if (this.filterType === 'searchStr') {
                    emailsToShow = this.emails.filter(email => {
                        if (email.from.toLowerCase().includes(this.filterBy.toLowerCase()) ||
                            email.subject.toLowerCase().includes(this.filterBy.toLowerCase()) ||
                            email.body.toLowerCase().includes(this.filterBy.toLowerCase())) {
                            return email
                        }
                    })
                }
            }
            return emailsToShow
        }
    },
    created() {
        this.getEmails()
    },
    methods: {
        getFilter(filter, filterType) {
            this.getEmails()
            this.filterBy = filter;
            this.filterType = filterType;
        },
        getEmails() {
            if (utilsService.loadFromStorage('emails')) {
                this.emails = utilsService.loadFromStorage('emails');
            } else {
                this.emails = emailService.getEmails()
                    .then((emails) => {
                        this.emails = emails;
                        utilsService.storeToStorage('emails', emails);
                    })
            }
        }
    },
    components: {
        emailList,
        emailStatus,
        eventBus,
        emailFilter,
        emailSidebar
    }
}