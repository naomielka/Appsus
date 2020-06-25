import { notesService } from '../../../services/notes-service.js'
import singleTodo from './noteTodo.cmps.js'
import colorPick from './noteColor.cmps.js'



export default {
    template: `
          <section :style='{background: noteStyle}' class= 'noteTodos'>
            <h4 v-if='isUpdating===false'> {{info.label}} </h4>
            <input v-model='info.label' v-if='isUpdating===true' type="text"/>

              <ul v-for='(todo,idx) in info.todos'>
                  <singleTodo v-if='isUpdating === false' :todo="todo"> </singleTodo>
                  <input v-model='todo.txt' v-if='isUpdating===true' type="text"/>
             </ul>
             <div v-if='addingTodo'>
                  <input v-model='todoToAdd' type="text"/>
                  <button @click='pushTodo(todoToAdd)'>Add</button>
                
                </div>
            
             <div v-if='pickingColor === false' class='buttons-wrapper'>
                  <button @click='addTodoMode' class='delete-button'>+</button>
                  <button @click='pickingColor = !pickingColor' class='delete-button'>C</button>
                  <button @click='isUpdating = !isUpdating' class='delete-button'>U</button>
                  <button @click='deleteById' class='delete-button'>D</button>
              </div>
            <color-pick @colorHover='previewColor' @colorPicked='applyColor' v-else-if='pickingColor === true'/>


          </section>
          `,
    props: ["info"],
    data() {
        return {
            val: "",
            isUpdating: false,
            noteStyle: 'purple',
            pickingColor: false,
            isHovering: false,
            addingTodo: false,
            todoToAdd: ''

        };
    },
    methods: {
        reportVal() {
            this.$emit("setVal", this.val);
        },
        todoClicked(idx) {
            this.info.todos[idx].isDone = !this.info.todos[idx].isDone
            console.log(this.info.todos[idx].isDone);


        },
        deleteById() {
            console.log(this.info.id);
            notesService.deleteNote(this.info.id)

        },
        applyColor(color) {
            this.pickingColor = false
            this.noteStyle = color
            console.log(color);

        },
        previewColor(color) {
            this.noteStyle = color
        },
        addTodoMode() {
            this.addingTodo = !this.addingTodo

        },
        pushTodo(todo) {
            this.info.todos.push({
                txt: todo,
                doneAt: false
            })
            this.todoToAdd = ''
            this.addingTodo = false
        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        },

    },
    components: {
        notesService,
        singleTodo,
        colorPick
    }
};