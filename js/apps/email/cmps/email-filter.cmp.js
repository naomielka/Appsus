export default {
    template: `
    <div class="email-filter flex row">
    <input @input="filterBySearchStr" v-model="filterBy.searchStr" type="text" placeholder="Search Email">
    <div class="selectors">
        <select  @change="filterByReadStat" v-model="filterBy.readStatus">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
        </select>
        <select @change="filterByDate" v-model="filterBy.date">
                <option value="recent">Most recent</option>
                <option value="old">Oldest</option>
        </select>
    </div>
    </div>`,
    data() {
        return {
            filterBy: {
                searchStr: '',
                readStatus: '',
                date: ''
            }
        }
    },
    methods: {
        filterBySearchStr() {
            this.$emit('filtered', this.filterBy.searchStr, 'searchStr')
        },
        filterByReadStat() {
            this.$emit('filtered', this.filterBy.readStatus, 'readStat')
        },
        filterByDate() {
            this.$emit('filtered', this.filterBy.date, 'date')
        }
    },
    components: {}
}