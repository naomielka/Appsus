export default {
    template: `
    <div class="email-sidebar flex col align-center">
        <router-link to="/newEmail">Compose</router-link>
        <button @click="filterInbox">Inbox</button>
        <button @click="filterByStar">Starred</button>
    </div>
   `,
    data() {
        return {
            filterby: {

            }
        }
    },
    methods: {
        filterByStar() {
            this.$emit('filtered', 'isStarred', 'star')
        },
        filterInbox() {
            this.$emit('filtered', 'all', 'all')
        }
    },
    components: {}
}