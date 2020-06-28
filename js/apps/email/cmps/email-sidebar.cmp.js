export default {
    template: `
    <div class="email-sidebar flex col align-center ">
        <div class="sticky-bar flex col align-center ">
            <button class="action-button open" @click="openSidebar">=</button>
            <router-link to="/newEmail">Compose</router-link>
            <button @click="filterInbox"> <i class="fas fa-inbox"></i> Inbox</button>
            <button @click="filterByStar">Starred</button>
            <button @click="filterBySent">Sent</button>
            <button @click="filterByDeleted">Trash</button>
        </div>
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
        },
        filterByDeleted() {
            this.$emit('filtered', 'deleted', 'deleted')
        },
        filterBySent() {
            this.$emit('filtered', 'isSentFromMe', 'sent')
        },
        // closeSidebar() {
        //     document.body.classList.remove('open-sidebar')
        // },
        openSidebar() {
            document.body.classList.toggle('open-sidebar')
        }

    },
    components: {}
}