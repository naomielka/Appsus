import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    template: `<ul class="">
        <li v-for="email in emails" :key="emaii.id">
            <email-preview></email-preview>
        </li>
    </ul>`,
    methods: {},
    components: {
        emailPreview
    }
}