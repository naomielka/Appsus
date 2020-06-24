import { notesService } from '../../../services/notes-service.js'
import noteText from '../cmps/noteText.cmps.js'
import noteTodos from '../cmps/noteTodos.cmps.js'
import noteImg from '../cmps/noteImg.cmps.js'
import noteVideo from '../cmps/noteVideo.cmps.js'


export default {
    template: `
<div >
<h2>Testing note</h2>
<input :placeholder= 'placeHolder' v-model='txt' type="text"/> 
<br/>
<input placeholder= 'Image Url' v-if='type ==="noteImg"' type="text"/>
 <button @click= 'changeType("noteText")'>T</button>
 <button @click= 'changeType("noteTodos")'>L</button>
 <button @click= 'changeType("noteImg")' >I</button>
 <button @click= 'changeType("noteVideo") '>V</button>
 <button @click= 'createNote(type)' >Create</button>
<section class='notes-container'>
<div  v-for='(note, idx) in notes'> 
<component :is="note.type"  :info="note.info"></component>
</div>
</section>


</div>

    `,
    data() {
        return {
            placeHolder: 'Pick a note type',
            notes: null,
            type: null,
            txt: null,
            videoUrl: null,
            imgUrl: null
        }
    },
    computed: {


    },
    created() {
        notesService.getById()
            .then(notes => this.notes = notes)
    },
    methods: {
        setType(type) {

        },

        createNote() {
            let newNote = {}
            if (!this.type) return
            if (this.type === 'noteText') {

                notesService.createNote.createTextNote(this.txt)
                    //console.log(notesService.getById());

            }



        },
        changeType(type) {
            this.type = type
            if (type === 'noteImg') {
                this.placeHolder = 'Title for the image'
            } else if (type === 'noteTodos') {
                this.placeHolder = 'Title for the list'
            } else if (type === 'noteText') {
                this.placeHolder = 'Enter Note'
            } else { this.placeHolder = 'Video URL (Youtube)' }
        }
    },



    components: {
        noteText,
        noteTodos,
        noteImg,
        noteVideo
    }

}