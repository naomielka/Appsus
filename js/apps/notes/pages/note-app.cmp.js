import { notesService } from '../../../services/notes-service.js'
import noteText from '../cmps/noteText.cmps.js'
import noteTodos from '../cmps/noteTodos.cmps.js'
import noteImg from '../cmps/noteImg.cmps.js'
import noteVideo from '../cmps/noteVideo.cmps.js'


export default {
    template: `
<div >
<h2>Testing note</h2>
<input type="text"/> 
 <button @click= 'type = "noteText"'>T</button>
 <button @click= 'type = "noteTodos"'>L</button>
 <button @click= 'type = "noteImg"' >I</button>
 <button @click= 'type = "noteVideo"'>V</button>
 <button @click= 'createNote' >Create</button>
<section class='notes-container'>
<div  v-for='(note, idx) in notes'> 
<component :is="note.type"  :info="note.info"></component>
</div>
</section>


</div>

    `,
    data() {
        return {
            notes: null,
            type: null
        }
    },
    computed: {},
    created() {
        notesService.getById()
            .then(notes => this.notes = notes)
    },
    methods: {
        setType(type) {

        },

        createNote() {
            if (!this.type) return
            console.log(this.type)
        }
    },



    components: {
        noteText,
        noteTodos,
        noteImg,
        noteVideo
    }

}