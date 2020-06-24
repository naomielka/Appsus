export default {
    template: `
    
           <iframe width="420" height="315"
           :src="info.src">
           
           </iframe> 
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
    }
};