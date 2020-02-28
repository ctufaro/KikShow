<template>
    <span>
        <Camera ref="Camera"></Camera>
        <v-bottom-navigation fixed>
            <v-btn @click.prevent="openCamera()">
                <v-img :src="require('@/assets/spin.png')" contain width="75" max-width="75"/>
            </v-btn>
        </v-bottom-navigation>
    </span>
</template>
<script>
export default {
    name: 'App',
    components: {
      Camera: () => import('@/components/Camera')
    },
    methods:{
        openCamera(){
            this.$refs.Camera.openCamera();            
        }
    }
}
</script>