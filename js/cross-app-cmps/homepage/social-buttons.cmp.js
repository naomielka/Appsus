export default {
    props: ['creator'],
    template: `
        <ul class="social-buttons flex ">
            <li class="">
                <a v-bind:href="creator.instagramLink" target="_blank">
                    <i class="fab fa-instagram"></i>
                </a>
            </li>
            <li class="">
                <a v-bind:href="creator.facebookLink" target="_blank">
                    <i class="fab fa-facebook"></i>
                </a>
            </li>
            <li class="">
                <a v-bind:href="creator.githubLink" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
            </li>
        </ul>
        
    `,
    data() {
        return {

        }
    }

}