import { notesService } from '../../../services/notes-service.js'
import noteText from '../cmps/noteText.cmps.js'
import noteTodos from '../cmps/noteTodos.cmps.js'
import noteImg from '../cmps/noteImg.cmps.js'
import noteVideo from '../cmps/noteVideo.cmps.js'
import noteEmail from '../cmps/noteEmail.cmps.js'
import noteMap from '../cmps/noteMap.cmps.js'
// import Vue from 'vue';
// Vue.forceUpdate();


export default {
    template: `
    <div  class='note-app-container '>
     <div class='note-creator'>  
    <h2>Take a note</h2>
    <input @input='searchNotes' :placeholder= 'placeHolder' v-model='txt' type="text"/> 
    <br/>
    <input placeholder= 'Image Url' v-model='imgUrl' v-if='type ==="noteImg"' type="text"/>
    <br/>
     
     <main-buttons-container>
     <button @click= 'changeType("noteText")'><i class="far fa-sticky-note"></i></button>
     <button @click= 'changeType("noteTodos")'><i class="fas fa-list"></i></button>
     <button @click= 'changeType("noteImg")' ><i class="fas fa-image"></i></button>
     <button @click= 'changeType("noteVideo") '><i class="fas fa-video"></i></button>
     <button @click= 'changeType("search")' ><i class="fas fa-search"></i></button>
     <button @click= 'createNote(type)' >Create</button>
     </main-buttons-container>
     </div>
     <div v-if='type !== "search"' class='unfiltered-notes'>
    <section v-if='pinnedNotes.length' class='pinned-notes-container'>
        <h2> Pinned </h2>
    <div  v-for='(note, idx) in pinnedNotes'> 
    <component  :id='note.info.id' :is="note.type"  :info="note.info"></component>
    
    </div>
    </section>
    <section v-show='notes' class='notes-container'>
    <div  v-for='(note, idx) in notes'> 
    <component :key='componentKey' :id='note.info.id' :is="note.type"  :info="note.info"></component>
    </div>
    </section>
    </div>
    
    <div class='filtered-notes' v-if='type === "search"'>
    <div  v-for='(note, idx) in filteredNotes'> 
    <component :id='note.info.id' :is="note.type"  :info="note.info"></component>
    
    </div>
    </div>
    
    
    
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
            imgUrl: null,
            filteredNotes: null,
            componentKey: 0
        }
    },
    computed: {},
    created() {
        this.setTemplate(),
            // notesService.getPinnedNotes()
            //     .then(pinnedNotes => {
            //         this.pinnedNotes = pinnedNotes


            //     })
            // notesService.getNotes()
            //     .then(notes => {
            //         this.notes = notes
            //         this.filteredNotes = notes
            //     })

            notesService.getNotes()
            .then(notesPrm => {
                console.log('notes psm', notesPrm)
                return notesPrm
            })
            .then(notesPrm => this.notes = notesPrm)
            .then(() => {
                console.log(this.notes);

                this.componentKey += 1
                console.log(this.componentKey);
            })

        notesService.getPinnedNotes()
            .then(pinnedNotesPrm => this.pinnedNotes = pinnedNotesPrm)
            .then(() => {
                console.log('force update triggeres2');

                this.componentKey += 1
                console.log(this.componentKey);


            })







    },
    methods: {
        forceUpdate() {
            this.$forceUpdate
            console.log('force updateeeee');

        },

        setTemplate() {
            console.log('set template trigger');
            console.log(this.notes);

            setTimeout(() => {
                this.componentKey += 1
                this.$forceUpdate()
                this.forceUpdate()
                    // Vue.forceUpdate();
            }, 1000)


        },
        setType(type) {

        },

        createNote() {
            let newNote = {}
            if (!this.type) return
            if (this.type === 'noteText') {
                console.log('trigga');

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
            } else if (type === 'search') {
                this.placeHolder = 'Search Notes'
            } else { this.placeHolder = 'Video URL (Youtube)' }
        },
        searchNotes() {
            if (this.type === 'search') {
                // note.info.txt.includes(this.txt)
                this.filteredNotes = this.notes
                this.filteredNotes = this.filteredNotes.filter(note => note.info.txt.includes(this.txt))
                    // console.log(filteredNotes);



            }



        }
    },




    components: {
        noteText,
        noteTodos,
        noteImg,
        noteVideo,
        noteEmail,
        noteMap
    }

}