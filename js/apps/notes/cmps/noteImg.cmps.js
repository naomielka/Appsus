import { notesService } from '../../../services/notes-service.js'
import colorPick from './noteColor.cmps.js'


export default {
    template: `
          <section :style='{background: noteStyle}' class= 'noteImg'>
            <h3 v-if='isUpdating === false' > {{info.title}}</h3>  
            <input v-model='info.title' v-if='isUpdating===true' type="text"/>
            <img   v-if='isUpdating === false'  :src= 'info.url'> 
            <input placeholder='Enter URL' v-model='info.url' v-if='isUpdating===true' type="text"/> 
            
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
            pickingColor: false,
            isUpdating: false,
            noteStyle: 'blue',
            isHovering: false,

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
        }
    },
    components: {
        notesService,
        colorPick
    }
};