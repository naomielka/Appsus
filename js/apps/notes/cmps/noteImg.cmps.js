import { notesService } from '../../../services/notes-service.js'
import colorPick from './noteColor.cmps.js'


export default {
    template: `
          <section @mouseleave='pinVisible= false' @mouseover='pinVisible= true' :style='{background: noteStyle}' class= 'noteImg'>
          <button  @click='onPin(info.id)' class='pin' v-if='pinVisible || info.isPinned'><i class="fas fa-thumbtack"></i></button>

            <h3 v-if='isUpdating === false' > {{info.title}}</h3>  
            <input v-model='info.title' v-if='isUpdating===true' type="text"/>
            <img   v-if='isUpdating === false'  :src= 'info.url'> 
            <input placeholder='Enter URL' v-model='info.url' v-if='isUpdating===true' type="text"/> 
            
            <div v-if='pickingColor === false' class='buttons-wrapper'>
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
            pickingColor: false,
            isUpdating: false,
            noteStyle: '7afcff',
            isHovering: false,
            pinVisible: false


        };
    },
    methods: {
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

        }
    },
    components: {
        notesService,
        colorPick
    }
};