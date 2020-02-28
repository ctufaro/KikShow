<template>
  <v-card class="mx-auto elevation-0">
    <div class="ml-4 mt-3">
        <v-btn x-small color="secondary" dark @click.prevent="clear()">Clear Messages</v-btn>
    </div>
    <v-list-item v-for="(msg,index) in this.messages" v-bind:key="index">
      <v-list-item-content>
        <v-list-item-subtitle>{{ msg.text }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
    name: 'Log',
    data: () => ({
    }),
    methods:{
        clear(){
            this.$store.state.messages = [];
        }
    },
    computed: {
        messages: {
            get() {
                return this.$store.state.messages;
            }
        }
    }
}
</script>

<style>

</style>