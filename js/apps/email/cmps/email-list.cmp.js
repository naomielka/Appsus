import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    template: `
    <div>
        <ul class="clean-list">
            <li v-for="email in emails" :key="email.id">
                <email-preview :email="email" @delete="deleteEmail" ></email-preview>
            </li>
        </ul>
    </div>`,
    methods: {
        deleteEmail(emailId) {
            this.$emit('delete', emailId)
            console.log(emailId)

        }
    },
    components: {
        emailPreview,
    }
}