import socialButtons from './social-buttons.cmp.js'

export default {
    props: ['creator'],
    template: `
    <div class="about-us flex align-center">
        <img class="creator-img" v-bind:src="creator.img" alt="">
        <div class="creator flex col ">
        <h3>{{creator.name}}</h3>
        <p>{{creator.about}}</p>
        <social-buttons :creator="creator"></social-buttons>
    </div>
    </div>
    `,
    data() {
        return {

        }
    },
    components: {
        socialButtons
    }

}