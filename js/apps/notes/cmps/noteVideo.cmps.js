import { notesService } from '../../../services/notes-service.js'
import colorPick from './noteColor.cmps.js'
import { utilsService } from '../../../services/utils.service.js';



export default {

    template: `
          <section  @mouseleave='pinVisible= false' @mouseover='pinVisible= true' @keyup.enter="isUpdating = false" :style='{background: noteStyle}' class= 'noteText'>
              
              <button  @click='onPin(info.id)' class='pin' v-if='pinVisible || info.isPinned'><i class="fas fa-thumbtack"></i></button>
              <iframe width="250" height="150"
           :src="info.src">
           
           </iframe> 
              <div v-if='pickingColor === false' class='buttons-wrapper'>

                  <button @click='pickingColor = !pickingColor' class='delete-button'><i class="fas fa-palette"></i></button>
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
            noteStyle: this.info.style,
            pickingColor: false,
            isHovering: false,
            pinVisible: false
        };
    },
    created() {
        this.reportVal()
    },
    methods: {
        reportVal() {
            console.log('video created');

        },
        deleteById() {
            console.log(this.info.id);
            notesService.deleteNote(this.info.id)

        },
        applyColor(color) {
            this.pickingColor = false
            this.noteStyle = color
            let changes = { id: this.info.id, txt: this.txt, style: this.noteStyle, url: this.url }
            this.$emit('saveNotes', changes)

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
            this.$router.push(`newEmail/${this.info.txt}`)
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