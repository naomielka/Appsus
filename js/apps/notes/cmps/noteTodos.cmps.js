export default {
    template: `
          <section class= 'noteTodos'>
              <ul v-for='(todo,idx) in info.todos'>
                  <li :class='{todoDone: info.todos[idx].doneAt }'> {{info.todos[idx].txt }} </li>
             </ul>
          </section>
          `,
    props: ["info"],
    data() {
        return {
            val: ""
        };
    },
    methods: {
        reportVal() {
            this.$emit("setVal", this.val);
        },
        todoClicked() {

        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        },

    }
};