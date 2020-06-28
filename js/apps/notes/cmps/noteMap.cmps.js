import { notesService } from '../../../services/notes-service.js'
import colorPick from './noteColor.cmps.js'
import { locService } from '../../../services/loc.service.js'
import { mapService } from '../../../services/map.service.js'

export default {
    template: `
          <section  @mouseleave='pinVisible= false' @mouseover='pinVisible= true' @keyup.enter="isUpdating = false" :style='{background: noteStyle}' class= 'noteMap'>
              
              <button  @click='onPin(info.id)' class='pin' v-if='pinVisible || info.isPinned'><i class="fas fa-thumbtack"></i></button>
              <h4 v-if='isUpdating === false'> {{info.txt}}</h4>
              <input  v-model='info.txt' v-if='isUpdating===true' type="text"/>
              <map ref='map' id='map'></map>
              <div v-if='pickingColor === false' class='buttons-wrapper'>
              <button @click='sendAsEmail' class='delete-button'><i class="far fa-envelope"></i></button>

                  <button @click='pickingColor = !pickingColor' class='delete-button'><i class="fas fa-palette"></i></button>
                  <button @click='isUpdating = !isUpdating' class='delete-button'><i class="fas fa-edit"></i></button>
                  <button @click='deleteById' class='delete-button'><i class="far fa-trash-alt"></i></button>
              </div>
              <color-pick @colorHover='previewColor' @colorPicked='applyColor' v-else-if='pickingColor === true'/>
             
          </section>
          `,
    props: ["info"],
    data() {
        return {
            val: "",
            isUpdating: false,
            noteStyle: 'rgb(251, 246, 214)',
            pickingColor: false,
            isHovering: false,
            pinVisible: false
        };
    },
    created() {
        this.initTheMap()
    },
    methods: {

        initTheMap() {
            console.log('testeee', this.info.txt, );
            console.log('testeee', this.info.lat, );
            console.log('testttee', this.info.lng);

            setTimeout(() => {
                mapService.initMap(this.info.lat, this.info.lng)
                    .then(() => {
                        mapService.addMarker({ lat: this.info.lat, lng: this.info.lng });
                    })
                    .catch(console.log('INIT MAP ERROR'));
                // locService.getPosition()
                //     .then(pos => {
                //         console.log('User position is:', pos.coords);
                //     })
                //     .catch(err => {
                //         console.log('err!!!', err);
                // })
            }, 100)
        },
        // initMap(lat = 32.0749831, lng = 34.9120554) {
        //     console.log('InitMap');
        //     return _connectGoogleApi()
        //         .then(() => {
        //             console.log('google available');
        //             map = new google.maps.Map(
        //                 this.$refs.map, {
        //                     center: { lat, lng },
        //                     zoom: 15
        //                 })
        //             console.log('Map!', map);
        //         })
        // },

        reportVal() {
            this.$emit("setVal", this.val);
        },
        deleteById() {
            console.log(this.info.id);
            notesService.deleteNote(this.info.id)

        },
        applyColor(color) {
            this.pickingColor = false
            this.noteStyle = color
            console.log(color);

        },
        previewColor(color) {
            this.noteStyle = color
        },
        onPin(id) {
            if (this.info.isPinned) {
                notesService.moveNote.unpinNote(id)
            } else {
                notesService.moveNote.pinNote(id)
                console.log(id);
            }

        },
        sendAsEmail() {
            // this.$router.push(`newEmail?from=${this.info.from}?subject=${this.info.subject}?body=${this.info.txt}`)
            this.$router.push(`newEmail/${this.info.txt}`)
        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        },
    },
    components: {
        colorPick,
        locService,
        mapService
    }
};