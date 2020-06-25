import { notesService } from '../../../services/notes-service.js'


export default {
    template: `
          <section class= 'noteTodos'>
            <h4> {{info.label}} </h4>
              <ul v-for='(todo,idx) in info.todos'>
                  <li @click='todoClicked(idx)' :class='{todoDone: info.todos[idx].doneAt }'> {{info.todos[idx].txt }} </li>
             </ul>
             <button @click='deleteById' class='delete-button'>D</button>

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
        todoClicked(idx) {
            if (this.info.todos[idx].isDone) {
                this.info.todos[idx].isDone = null
                let prevState = this.info.todos[idx]
                this.info.todos.splice(idx, 1, prevState)

            } else { this.info.todos[idx].isDone = new Date() }

            console.log(idx);
            console.log(this.info.todos[idx].isDone);



        },
        deleteById() {
            console.log(this.info.id);
            notesService.deleteNote(this.info.id)

        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        },

    },
    components: {
        notesService
    }
};