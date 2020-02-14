<template>
  <base-card dark>
    <v-img
      class="grey lighten-2"
      height="400"
      width="100%"
      :src="require('@/assets/articles/sneakers.jpg')"
    >
      <v-layout
        fill-height
        align-center
        pa-3
      >
        <v-flex
          xs12
          md7
          offset-md7
        >
          <h1 class="k-title">
            Kik Show
          </h1>
          <div class="subheading text-uppercase pl-2 mb-4" v-if="false">
            Finding Beauty, One flight at a time
          </div>
          <v-btn
            color="primary"
            depressed
            rounded
          >
            Subscribe
          </v-btn>
        </v-flex>
      </v-layout>
    </v-img>
  </base-card>
</template>
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
