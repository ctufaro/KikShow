<template>
    <span>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-app-bar flat color="transparent" app>
                <v-btn icon x-large color="white" @click="closeCamera()">
                    <v-icon>far fa-times-circle</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <div class="dir">Kik Show</div>
                <!--<v-btn icon x-large color="white" @click="test()">
                    <v-icon>far fa-star</v-icon>
                </v-btn>-->
            </v-app-bar>
            <v-overlay :opacity="0" :z-index="1" :value="this.count>0">
                <div class="flash" v-bind:style="{ opacity: opacity }">{{count}}</div>
            </v-overlay>
            <video id="gum-local" autoplay playsinline></video>
            <v-bottom-navigation app background-color="black">
                <v-btn icon x-large @click.prevent="">
                    <v-badge color="pink" :content="this.count" v-show="this.count>0">
                        <canvas id="cvas"></canvas>
                    </v-badge>
                </v-btn>
                <v-spacer />
                <v-btn v-if="!saving" icon x-large @click.prevent="snap()">
                    <v-icon color="white">fa fa-camera</v-icon>
                </v-btn>
                <v-btn v-if="saving">
                    <v-progress-circular indeterminate color="white"></v-progress-circular>
                </v-btn>
                <v-spacer />
                <v-btn icon x-large @click.prevent="makeSpin" :disabled="count<1">
                    <v-icon color="white">far fa-check-square</v-icon>
                </v-btn>
            </v-bottom-navigation>
            <v-dialog v-model="showgenmsg" hide-overlay persistent width="300">
                <v-card color="primary" dark>
                    <v-card-text class="pt-3">
                        Generating 360 Model
                        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-dialog>
        <ShowCase ref="ShowCase"></ShowCase>
    </span>
</template>

<script>
import {
    mapMutations
} from 'vuex'



export default {
    name:'Camera',
    components: {
      ShowCase: () => import('@/components/ShowCase')
    },
    data: () => ({
        dialog: false,
        saving:false,
        count:0,
        savedShots:[],
        showgenmsg:false,
        opacity:.2
    }),
    methods: {
        ...mapMutations(['insertMessage']),
        async openCamera() {
            this.dialog = true;
            this.insertMessage('opening camera');
            // Prefer camera resolution nearest to 1280x720.
            var constraints = {
                //video: { facingMode: { exact: "environment" } }, //iphone
                video: (window.location.href.includes('kikshow.')) ? { facingMode: { exact: "environment" } } : true, //laptop            
                audio:false
            };
            this.insertMessage('navigator.mediaDevices.getUserMedia');
            var self = this;
            await navigator.mediaDevices.getUserMedia(constraints)
                .then(function (mediaStream) {
                    //var video = document.querySelector("#video");
                    const video = document.querySelector('video');
                    const videoTracks = mediaStream.getVideoTracks();
                    console.log('Got stream with constraints:', constraints);
                    console.log(`Using video device: ${videoTracks[0].label}`);
                    window.stream = mediaStream; // make variable available to browser console
                    video.srcObject = mediaStream;
                })
                .catch(function (err) {
                    self.insertMessage(err.name + ": " + err.message);
                }); // always check for errors at the end.            
        },
        closeCamera() {
            this.dialog = false;
            this.insertMessage('closing camera');
            this.clear();
        },
        clear(){
            const canvas = window.canvas = document.querySelector('canvas');
            var context = canvas.getContext('2d');
            context.clearRect(0,0, canvas.width, canvas.height);
            this.count = 0;
            this.savedShots = [];
        },
        snap(){
            this.saving = true;
            const video = window.video = document.querySelector('video');
            const canvas = window.canvas = document.querySelector('canvas');
            canvas.width = window.stream.getVideoTracks()[0].getSettings().width;
            canvas.height = window.stream.getVideoTracks()[0].getSettings().height;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            this.count++;
            this.upload();
        },
        upload(){
            var self = this;
            const canvas = document.querySelector('canvas');
            canvas.toBlob(function(blob) {
                const formData = new FormData();
                formData.append('body', blob, 'clientside.jpg');
                self.axios({
                    method: 'post',
                    url: `${self.$hostname}/ImageUpload`,
                    data: formData, 
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    }
                })
                .then(response=>{
                    let savedFile = response.data;
                    self.savedShots.push({'filename':savedFile});
                    self.saving = false;                    
                });
            });

        },
        makeSpin() {             
            var self = this;
            this.showgenmsg = true;
            self.axios({
                method: 'post',
                url: `${self.$hostname}/GifGenerate`,
                data: this.savedShots
            })
            .then((response) => {                
                self.showgenmsg = false;
                self.savedShots.push({'filename':response.data});                
                self.$refs.ShowCase.openShowCase(response.data, self.savedShots); 
                self.clear();
            });
        },
        test(){
            //this.count++;
            //this.opacity=.3;
        }
    },
    mounted() {

    }
}
</script>

<style>
#cvas {
    height: 50px;
}
.v-dialog--fullscreen {
    background-color: black;
}
.flash {
    color:white;
    font-size: 80vw;
}
.dir{
    color:white;
    font-size: 5vw;
    font-family: 'Pacifico', cursive;
}


</style>