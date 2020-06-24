import { notesService } from '../../../services/notes-service.js'
import noteText from '../cmps/noteText.cmps.js'
import noteTodos from '../cmps/noteTodos.cmps.js'


export default {
    template: `
<div >
<h2>Testing note</h2>
  
<section class='notes-container'>
<div  v-for='(note, idx) in notes'> 
<component :is="note.type"  :info="note.info"></component>
</div>
</section>


</div>

    `,
    data() {
        return {
            notes: null
        }
    },
    computed: {},
    created() {
        notesService.getById()
            .then(notes => this.notes = notes)
    },
    methods: {},



    components: {
        noteText,
        noteTodos
    }

}