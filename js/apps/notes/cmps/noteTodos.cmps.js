import { notesService } from '../../../services/notes-service.js'
import singleTodo from './noteTodo.cmps.js'
import colorPick from './noteColor.cmps.js'



export default {
    template: `
          <section @mouseleave='pinVisible= false' @mouseover='pinVisible= true' @keyup.enter="isUpdating = false" :style='{background: noteStyle}' class= 'noteTodos'>
          <button  @click='onPin(info.id)' class='pin' v-if='pinVisible || info.isPinned'><i class="fas fa-thumbtack"></i></button>

            <h4 v-if='isUpdating===false'> {{info.label}} </h4>
            <input v-model='info.label' v-if='isUpdating===true' type="text"/>

              <ul v-for='(todo,idx) in info.todos'>
                  <singleTodo v-if='isUpdating === false' :todo="todo"> </singleTodo>
                  <input v-model='todo.txt' v-if='isUpdating===true' type="text"/>
                  <button @click='deleteTodo(idx)' v-if='isUpdating === true'><i class="far fa-trash-alt"></i></button>
             </ul>
             <div v-if='addingTodo'>
                  <input v-model='todoToAdd' type="text"/>
                  <button @click='pushTodo(todoToAdd)'><i class="fas fa-plus"></i></i></button>
                
                </div>
            
             <div v-if='pickingColor === false' class='buttons-wrapper'>
             <button @click='sendAsEmail' class='delete-button'><i class="far fa-envelope"></i></button>

                  <button @click='addTodoMode' class='delete-button'><i class="fas fa-plus"></i></button>
                  <button @click='pickingColor = !pickingColor' class='delete-button'><i class="fas fa-palette"></i></button>
                  <button @click='isUpdating = !isUpdating' class='delete-button'><i class="fas fa-edit"></i></button>
                  <button @click='deleteById' class='delete-button'><i class="far fa-trash-alt"></i></button>
              </div>
            <color-pick @colorHover='previewColor' @colorPicked='applyColor' v-else-if='pickingColor === true'/>


          </section>
          `,
    props: ["info"],
    data() {
        return {
            val: "",
            isUpdating: false,
            noteStyle: 'rgb(251, 220, 246)',
            pickingColor: false,
            isHovering: false,
            addingTodo: false,
            todoToAdd: '',
            pinVisible: false


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
        },
        deleteTodo(idx) {
            this.info.todos.splice(idx, 1)

        },
        onPin(id) {
            if (this.info.isPinned) {
                notesService.moveNote.unpinNote(id)
            } else {
                notesService.moveNote.pinNote(id)
                console.log(id);
            }

        },
        sendAsEmail() {
            let todoTxt = ''
            this.info.todos.forEach(todo => todoTxt += todo.txt)
            console.log(todoTxt);

            this.$router.push(`newEmail/${this.info.label}/${todoTxt}`)
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