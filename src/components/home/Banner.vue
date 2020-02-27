<template>
    <base-card dark>
        <v-img class="grey lighten-2" height="400" width="100%" :src="require('@/assets/articles/sneakers.jpg')">
            <v-layout fill-height align-center pa-3>
                <v-flex xs12 md7 offset-md7>
                    <h1 class="k-title">
                        Kik Show
                    </h1>
                    <div class="subheading text-uppercase pl-2 mb-4" v-if="false">
                        Finding Beauty, One flight at a time
                    </div>
                    <!--
                    <v-btn color="primary" depressed rounded>
                        Subscribe
                    </v-btn>
                    -->
                    <v-facebook-login :app-id="this.appId" style="border-radius:28px;" @logout="logout" @login="login"></v-facebook-login>
                </v-flex>
            </v-layout>
        </v-img>
    </base-card>
</template>

<script>
import {
    mapMutations
} from 'vuex'

import VFacebookLogin from 'vue-facebook-login-component'
export default {
    name: 'Banner',
    components: {
        VFacebookLogin
    },
    data: () => ({
        facebookUrl: '//graph.facebook.com/',
        appId: '186699819255517'
    }),
    methods:{
        ...mapMutations(['setUserName','setUserAvatarSrc', 'setUserLoggedIn']),
        login(obj){
            if(obj.status=="connected"){
                let imageSrc = `${this.facebookUrl}${obj.authResponse.userID}/picture?type=large&access_token=${obj.authResponse.accessToken}`;
                let profileApi = `https:${this.facebookUrl}${obj.authResponse.userID}/?access_token=${obj.authResponse.accessToken}`;
                console.log(obj);
                this.axios.get(profileApi).then(response => {
                    this.setUserName(response.data.name);
                }).then(()=>{
                    this.setUserAvatarSrc(imageSrc);
                    this.setUserLoggedIn(true);
                })

            }
        },
        logout(obj){
            console.log(obj);
            this.setUserName('');
            this.setUserAvatarSrc('https://www.gravatar.com/avatar?d=mp');
            this.setUserLoggedIn(false);
            console.log("later");
        }
    }
}
</script>

<style>
.k-title{
  font-family: 'Pacifico', cursive;
  font-size: 3.75rem !important;
  font-weight: 300;
  line-height: 3.75rem;
  letter-spacing: -0.0083333333em !important;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
  -webkit-background-clip: text;
     -moz-background-clip: text;
          background-clip: text;  
}
</style>
