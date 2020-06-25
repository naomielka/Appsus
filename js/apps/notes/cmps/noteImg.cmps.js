import { notesService } from '../../../services/notes-service.js'


export default {
    template: `
          <section class= 'noteImg'>
            <h3> {{info.title}}</h3>  
            <img :src= 'info.url'>  
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
        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        }
    },
    components: {
        notesService
    }
};