import { notesService } from '../../../services/notes-service.js'
import colorPick from './noteColor.cmps.js'
export default {
    template: `
          <section  @mouseleave='pinVisible= false' @mouseover='pinVisible= true' @keyup.enter="isUpdating = false" :style='{background: noteStyle}' class= 'noteText column-layout space-between '>
              
              <button  @click='onPin(info.id)' class='pin' v-if='pinVisible || info.isPinned'><i class="fas fa-thumbtack"></i></button>
              <h4 v-if='isUpdating === false'> from: {{info.from}}</h4>
              <input  v-model='info.from' v-if='isUpdating===true' type="text"/>
              <h5 v-if='isUpdating === false'> {{info.subject}}</h5>
              <input  v-model='info.subject' v-if='isUpdating===true' type="text"/>
              <p v-if='isUpdating === false'> {{info.txt}}</p>
              <input  v-model='info.txt' v-if='isUpdating===true' type="text"/>
              <div v-if='pickingColor === false' class='buttons-wrapper'>
                  <button @click='sendAsEmail' class='delete-button'><i class="far fa-envelope"></i></button>
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
            noteStyle: 'white',
            pickingColor: false,
            isHovering: false,
            pinVisible: false
        };
    },
    methods: {
        reportVal() {
            this.$emit("setVal", this.val);
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
        onPin(id) {
            if (this.info.isPinned) {
                notesService.moveNote.unpinNote(id)
            } else {
                notesService.moveNote.pinNote(id)
                console.log(id);
            }

        },
        sendAsEmail() {
            // this.$router.push(`newEmail?from=${this.info.from}?subject=${this.info.subject}?body=${this.info.txt}`)
            this.$router.push(`newEmail/${this.info.from}/${this.info.subject}/${this.info.txt}`)
        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        },
    },
    components: {
        colorPick
    }
};