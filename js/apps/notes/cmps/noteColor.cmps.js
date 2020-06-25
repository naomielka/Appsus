export default {
    template: `
    <div class='color-pallet'>
     <button @mouseover='hoverColor("#7afcff")' @click='sendColor("#7afcff")'><i style='color: #7afcff' class="fas fa-tint"></i></button>
     <button @mouseover='hoverColor("#fff740")' @click='sendColor("#fff740")'><i style='color: #fff740' class="fas fa-tint"></i></button>
     <button @mouseover='hoverColor("#feff9c")' @click='sendColor("#feff9c")'><i style='color: #feff9c' class="fas fa-tint"></i></button>
     <button @mouseover='hoverColor("white")' @click='sendColor("white")'><i style='color: white' class="fas fa-tint"></i></button>
     <button @mouseover='hoverColor("#a9ca41")' @click='sendColor("#a9ca41")'><i style='color: #a9ca41' class="fas fa-tint"></i></button>
     <button @mouseover='hoverColor("#ec9a3d")' @click='sendColor("#ec9a3d")'><i style='color: #ec9a3d' class="fas fa-tint"></i></button>
     <button @mouseover='hoverColor("#ff65a3")' @click='sendColor("#ff65a3")'><i style='color: #ff65a3' class="fas fa-tint"></i></button>
     <button @mouseover='hoverColor("#ea1d5b")' @click='sendColor("#ea1d5b")'><i style='color: #ea1d5b' class="fas fa-tint"></i></button>
     <button @mouseover='hoverColor("#ddd3db")' @click='sendColor("#ddd3db")'><i style='color: #ddd3db' class="fas fa-tint"></i></button>
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