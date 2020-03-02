<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-app-bar flat color="black" app>
                <v-btn icon x-large color="white" @click="closeCamera()">
                    <v-icon>far fa-times-circle</v-icon>
                </v-btn>
            </v-app-bar>
            <video id="gum-local" autoplay playsinline></video>
            <v-bottom-navigation app background-color="black">
                <v-btn icon x-large @click.prevent="">
                    <v-badge color="pink" :content="this.count" v-show="this.count>0">
                        <canvas></canvas>
                    </v-badge>
                </v-btn>
                <v-spacer />
                <v-btn icon x-large @click.prevent="snap()">
                    <v-icon color="white">fa fa-camera</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn icon x-large @click.prevent="">
                    <v-icon color="white">far fa-check-square</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </v-card>
    </v-dialog>
</template>

<script>
import {
    mapMutations
} from 'vuex'

export default {
    data: () => ({
        dialog: false,
        count:0
    }),
    methods: {
        ...mapMutations(['insertMessage']),
        async openCamera() {
            this.dialog = true;
            this.insertMessage('opening camera');
            // Prefer camera resolution nearest to 1280x720.
            var constraints = {
                //video: { facingMode: { exact: "environment" } }, //iphone
                video:true, //laptop            
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
            const canvas = window.canvas = document.querySelector('canvas');
            var context = canvas.getContext('2d');
            context.clearRect(0,0, canvas.width, canvas.height);
            this.count = 0;
        },
        snap(){
            const video = window.video = document.querySelector('video');
            const canvas = window.canvas = document.querySelector('canvas');
            canvas.width = 600;
            canvas.height = 667;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            this.count++;
            this.upload();
        },
        upload(){
            /*this.axios.post('https://localhost:44302/api/ImageUpload', {
                id:3
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });*/
            var self = this;
            const canvas = document.querySelector('canvas');
            canvas.toBlob(function(blob) {
                const formData = new FormData();
                formData.append('body', blob, 'filename.png');
                // Post via axios or other transport method
                //self.axios.post('https://localhost:44302/api/ImageUpload', formData);
                self.axios({
                    method: 'post',
                    url: "https://kikshowapi.azurewebsites.net/api/ImageUpload",
                    data: formData, 
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    }
                });
            });

        }
    },
    mounted() {

    }
}
</script>

<style>
#cvas{
    height:50px;
    width:50px;
}
</style>