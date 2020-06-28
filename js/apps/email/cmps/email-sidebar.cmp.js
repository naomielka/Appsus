export default {
    template: `
    <div class="email-sidebar flex col align-center ">
        <div class="sticky-bar flex col align-center ">
            <button class="action-button open" @click="openSidebar">=</button>
            <router-link to="/newEmail">Compose <i class="fas fa-plus"></i></router-link>
            <button @click="filterInbox"> <i class="fas fa-inbox "></i> Inbox</button>
            <button @click="filterByStar"> <i class="fas fa-star"></i> Starred</button>
            <button @click="filterBySent"> <i class="fas fa-paper-plane"></i> Sent</button>
            <button @click="filterByDeleted"> <i class="fas fa-trash-alt"></i> Trash</button>
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