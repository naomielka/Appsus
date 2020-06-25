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
        <email-sidebar  @filtered="getFilter"></email-sidebar>
        <div class="flex col width-all">
        <section class="top-bar flex row space-between align-center">
            <email-filter @filtered="getFilter"></email-filter>
            <email-status ></email-status>
        </section>
        <email-list :emails="emailsToShow" @delete="deleteEmail"></email-list>
    </div>
    </div>`,
    data() {
        return {
            emails: [],
            emailsToShow: [],
            filterBy: null,
            filterType: null
        }
    },
    computed: {

    },
    created() {
        this.getEmails('emails')
        this.getEmails('deletedEmails')
        this.emailsToShow = this.renderEmailList('all', 'all')

    },
    methods: {
        getFilter(filter, filterType) {
            this.getEmails()
            this.filterBy = filter;
            this.filterType = filterType;
            this.emailsToShow = this.renderEmailList()
        },
        getEmails(key = 'emails') {
            if (utilsService.loadFromStorage(key)) {
                this[key] = utilsService.loadFromStorage(key);
            } else {
                this[key] = emailService.getEmails()
                    .then((emails) => {
                        this[key] = emails;
                        utilsService.storeToStorage(key, emails);
                    })
            }
        },
        renderEmailList() {
            if (this.filterBy === null && this.filterType === null || this.filterType === 'all') {
                return this.emails;
            } else {
                var emailsToShow = []
                if (this.filterType === 'readStat') {
                    if (this.filterBy === 'read') {
                        emailsToShow = this.emails.filter(email => email.isRead === true);
                    } else if (this.filterBy === 'unread') {
                        emailsToShow = this.emails.filter(email => email.isRead === false);
                    } else {
                        return this.emails;
                    }
                } else if (this.filterType === 'searchStr') {
                    emailsToShow = this.emails.filter(email => {
                        if (email.from.toLowerCase().includes(this.filterBy.toLowerCase()) ||
                            email.subject.toLowerCase().includes(this.filterBy.toLowerCase()) ||
                            email.body.toLowerCase().includes(this.filterBy.toLowerCase())) {
                            return email
                        }
                    })
                } else if (this.filterType === 'star') {
                    emailsToShow = this.emails.filter(email => email.isStarred === true)
                } else if (this.filterType === 'deleted') {
                    emailsToShow = this.deletedEmails
                }
            }
            return emailsToShow
        },
        deleteEmail(emailId) {
            var email = emailService.getEmailById(emailId)
            if (email.isDeleted) {
                emailService.deleteEmail(emailId, true)
            } else {
                email.isDeleted = true;
                emailService.updateEmail(emailId, 'isDeleted', email.isDeleted);
                emailService.deleteEmail(emailId)
            }
            this.getEmails('emails')
            this.getEmails('deletedEmails')
            this.emailsToShow = this.renderEmailList()
        }
    },
    mounted() {},
    components: {
        emailList,
        emailStatus,
        eventBus,
        emailFilter,
        emailSidebar
    }
}