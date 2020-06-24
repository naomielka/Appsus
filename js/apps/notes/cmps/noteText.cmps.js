import { notesService } from '../../../services/notes-service.js'

export default {
    template: `
          <section class= 'noteText'>
              {{info.txt}}
              <button @click='deleteById' class='delete-button'>D</button>
          </section>
          `,
    props: ["info"],
    data() {
        return {
            val: ""
        };
    },
    methods: {
        reportVal() {
            this.$emit("setVal", this.val);
        },
        deleteById() {
            console.log(this.info.id);
            notesService.deleteNote(this.info.id)

        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        },
    }
};