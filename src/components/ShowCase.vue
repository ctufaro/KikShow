<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-app-bar flat color="transparent" app>
            <v-spacer></v-spacer>
            <div class="dir">Kik Show</div>
        </v-app-bar>
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
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        dialog: false,        
        anigif:'',
        loadingmsg:true,
        azurefiles:[]
    }),
    methods:{
        openShowCase(file,snapshots){
            this.anigif = this.$blob + file;
            this.dialog = true;
            this.azurefiles = snapshots;
        },
        imageloaded(){
            this.loadingmsg = false;
            console.log('loaded');
        },
        trash(){
            this.dialog=!this.dialog
            console.log(this.azurefiles);
            this.axios({
                method: 'delete',
                url: `${this.$hostname}/GifGenerate`,
                data: this.azurefiles
            })
            .then(() => {
            });
        }
    }
}
</script>
<style>
.v-dialog--fullscreen {
    background-color: black;
}
</style>