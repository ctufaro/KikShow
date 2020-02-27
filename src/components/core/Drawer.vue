<template>
    <v-navigation-drawer v-model="drawer" app dark temporary>
        <div class="text-center" v-if="this.$store.state.userloggedin">
            <v-avatar size="75" class="ma-3">
                <img :src=this.$store.state.useravatarsrc>
            </v-avatar>
            <div class="user-name">{{this.$store.state.username}}</div>
        </div>
        <v-list>
            <v-list-item v-for="(link, i) in links" :key="i" :to="link.to" :href="link.href" @click="onClick($event, link)">
                <v-list-item-content>
                    <v-list-item-title>{{ link.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
  // Utilities
import {
    mapGetters,
    mapMutations
} from 'vuex'

export default {
    name: 'CoreDrawer',
    data: () => ({}),
    computed: {
        ...mapGetters(['links']),
        drawer: {
            get() {
                return this.$store.state.drawer
            },
            set(val) {
                this.setDrawer(val)
            }
        }
    },
    methods: {
        ...mapMutations(['setDrawer']),
        onClick(e, item) {
            e.stopPropagation()

            if (item.to === '/') {
                this.$vuetify.goTo(0)
                this.setDrawer(false)
                return
            }

            if (item.to || !item.href) return

            this.$vuetify.goTo(item.href)
            this.setDrawer(false)
        }
    }
}
</script>
<style>
.user-name{
    color:white;
}
</style>
