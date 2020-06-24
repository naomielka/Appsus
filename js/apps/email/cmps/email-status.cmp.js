import { emailService } from '../../../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <div >
{{readEmails}}
    </div>`,
    // תכלס סתם העברתי את זה לדאטה אני לא יודע אם זה ישנה בדיעבד
    data() {
        return {
            readEmails: 0,
        }
    },
    computed: {

    },
    // העברתי למטודה כי אני מפעיל את זה כל פעם אז זה תכלס מטודה
    methods: {
        countEmails() {
            this.readEmails = emailService.countReadEmails()
            console.log('triggered count');

        }

    },
    created() {
        //האם זה שימושי? אין לי מושג
        this.countEmails()
    },

    components: {
        eventBus
    },
    // פה אני שם כאילו איוונט ליסטנר בשפת וויו
    // המשך ב 
    // email-preview openEmail()
    mounted() {
        eventBus.$on('emailRead', this.countEmails)
    },
}