import { notesService } from '../../../services/notes-service.js'
import colorPick from './noteColor.cmps.js'
export default {
    template: `
          <section  :style='{background: noteStyle}' class= 'noteText'>
              <h4 v-if='isUpdating === false'> {{info.txt}}</h4>
              <input v-model='info.txt' v-if='isUpdating===true' type="text"/>
              <div v-if='pickingColor === false' class='buttons-wrapper'>
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
            noteStyle: 'yellow',
            pickingColor: false,
            isHovering: false,
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