export default {
    template: `
    <div class='color-pallet'>
     <button @mouseover='hoverColor("blue")' @click='sendColor("blue")'>B</button>
     <button @mouseover='hoverColor("yellow")' @click='sendColor("yellow")'>Y</button>
     <button @mouseover='hoverColor("purple")' @click='sendColor("purple")'>P</button>
     <button @mouseover='hoverColor("white")' @click='sendColor("white")'>W</button>
     <button @mouseover='hoverColor("green")' @click='sendColor("green")'>G</button>
     </div>
    `,

    methods: {
        sendColor(color) {
            this.$emit('colorPicked', color)
        },
        hoverColor(color) {
            this.$emit('colorHover', color)
        },


    }

}