export default {
    template: `
    <div>
        <form>
            <span>To:</span> <input type="text"/> 
            </br>
            <span>Subject:</span> <input type="text"/>
            </br>
            <textarea rows="1" cols="50"></textarea>     
            <button @click="sendEmail">Send</button>
        </form>
    </div>
    `,
    data() {
        return {
            to: '',
            subject: '',
            body: '',
        }
    },
    created() {
        // console.log('yo')
    },
    methods: {
        sendEmail() {
            this.to = '';
            this.subject = '';
            this.body = '';
        }
    },
    components: {}
}