<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dense flat>
                <v-btn icon x-large color="black" @click="closeCamera()">
                    <v-icon>far fa-times-circle</v-icon>
                </v-btn>
            </v-toolbar>
            <div id="camera"></div>
            <v-bottom-navigation fixed>
                <v-btn icon x-large @click.prevent="">
                    <v-icon color="black">fas fa-camera</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data: () => ({
        dialog: false
    }),
    methods: {
        ...mapMutations(['insertMessage']),
        openCamera() {
            this.dialog = true;
            this.insertMessage('opening camera');
            // Prefer camera resolution nearest to 1280x720.
            var constraints = {
                audio: true,
                video: {
                    width: 1280,
                    height: 720,
                    facingMode: { exact: "environment" }
                }
            };
            this.insertMessage('navigator.mediaDevices.getUserMedia');
            var self = this;
            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (mediaStream) {
                    var video = document.querySelector('camera');
                    video.srcObject = mediaStream;
                    video.onloadedmetadata = function () {
                        video.play();
                    };
                })
                .catch(function (err) {
                    self.insertMessage(err.name + ": " + err.message);
                }); // always check for errors at the end.            
        },
        closeCamera() {
            this.dialog = false;
            this.insertMessage('closing camera');
        }
    },
    mounted(){
        
    }
}
</script>

<style>

</style>