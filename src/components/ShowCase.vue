<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>      
            <v-img :src="anigif" @load="imageloaded"></v-img> 
            <v-dialog v-model="loadingmsg" hide-overlay persistent width="300">
            <v-card color="primary" dark>
                <v-card-text class="pt-3">
                    So close to being done
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
                </v-card>
            </v-dialog>      
            <v-bottom-navigation app background-color="black">
                <v-btn @click.prevent="dialog=!dialog">
                    <v-icon color="white">far fa-thumbs-up</v-icon>
                </v-btn>                
                <v-spacer />
                <v-btn @click.prevent="trash">
                    <v-icon color="white">far fa-trash-alt</v-icon>
                </v-btn>                
            </v-bottom-navigation>
        </v-card>        
    </v-dialog>
    
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        url:'https://kikimageblobs.blob.core.windows.net/imagecontainer/',
        anigif:'',
        loadingmsg:true,
        azurefiles:[]
    }),
    methods:{
        openShowCase(file,snapshots){
            this.anigif = this.url + file;
            this.dialog = true;
            this.azurefiles = snapshots;
        },
        imageloaded(){
            this.loadingmsg = false;
        },
        trash(){
            this.dialog=!this.dialog
            console.log(this.azurefiles);
            this.axios({
                method: 'delete',
                url: "https://kikshowapi.azurewebsites.net/api/GifGenerate",
                //url: "https://192.168.1.45:45455/api/GifGenerate",
                data: this.azurefiles
            })
            .then(() => {
            });
        }
    }
}
</script>