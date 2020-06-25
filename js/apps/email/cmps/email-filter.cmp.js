export default {
    template: `
    <div class="email-filter">
    <input @input="filterBySearchStr" v-model="filterBy.searchStr" type="text" placeholder="Search Email">
    <select @change="filterByReadStat" v-model="filterBy.readStatus">
            <option value="read">Read</option>
            <option value="unread">Unread</option>
    </select>
    </div>`,
    data() {
        return {
            filterBy: {
                searchStr: '',
                readStatus: ''
            }
        }
    },
    methods: {
        filterBySearchStr() {
            this.$emit('filtered', this.filterBy.searchStr, 'searchStr')
        },
        filterByReadStat() {
            this.$emit('filtered', this.filterBy.readStatus, 'readStat')
        }
    },
    components: {}
}