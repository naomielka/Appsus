import { notesService } from '../../../services/notes-service.js'
import noteText from '../cmps/noteText.cmps.js'
import noteTodos from '../cmps/noteTodos.cmps.js'
import noteImg from '../cmps/noteImg.cmps.js'
import noteVideo from '../cmps/noteVideo.cmps.js'


export default {
    template: `
<div class='note-app-container'>
<h2>Testing note</h2>
<input :placeholder= 'placeHolder' v-model='txt' type="text"/> 
<br/>
<input placeholder= 'Image Url' v-model='imgUrl' v-if='type ==="noteImg"' type="text"/>
<br/>
 <main-buttons-container>
 <button @click= 'changeType("noteText")'><i class="far fa-sticky-note"></i></button>
 <button @click= 'changeType("noteTodos")'><i class="fas fa-list"></i></button>
 <button @click= 'changeType("noteImg")' ><i class="fas fa-image"></i></button>
 <button @click= 'changeType("noteVideo") '><i class="fas fa-video"></i></button>
 <button @click= 'createNote(type)' >Create</button>
 </main-buttons-container>
<section class='pinned-notes-container'>
<div  v-for='(note, idx) in pinnedNotes'> 
<component :id='note.info.id' :is="note.type"  :info="note.info"></component>

</div>
</section>
<section class='notes-container'>
<div  v-for='(note, idx) in notes'> 
<component :id='note.info.id' :is="note.type"  :info="note.info"></component>

</div>
</section>


</div>

    `,
    data() {
        return {
            placeHolder: 'Pick a note type',
            notes: null,
            pinnedNotes: null,
            type: null,
            txt: null,
            videoUrl: null,
            imgUrl: null
        }
    },
    computed: {


    },
    created() {
        notesService.getPinnedNotes()
            .then(pinnedNotes => this.pinnedNotes = pinnedNotes)
        notesService.getNotes()
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
            } else if (this.type === 'noteTodos') {
                notesService.createNote.createListNote(this.txt)
            } else if (this.type === 'noteImg') {
                notesService.createNote.createImgNote(this.txt, this.imgUrl)

            } else if (this.type === 'noteVideo') {
                notesService.createNote.createVideoNote(this.txt)
            }
            this.txt = null
            this.imgUrl = null
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