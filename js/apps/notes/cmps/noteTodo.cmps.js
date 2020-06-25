export default {
    template: `
           <li
            @click.prevent='todo.doneAt = !todo.doneAt' :class='{todoDone: todo.doneAt}'>{{todo.txt}} 
            <!-- <input v-model='todo.txt' v-if='isUpdating===true' type="text"/> -->

        </li>
          `,
    props: ["todo"],
    data() {
        return {
            val: ""
        };
    },
    methods: {
        reportVal() {
            this.$emit("setVal", this.val);
        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        }
    },
    components: {

    }
};