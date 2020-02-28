import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: require('@/data/links.json'),
    drawer: false,
    userloggedin: false,
    username: '',
    useravatarsrc: 'https://www.gravatar.com/avatar?d=mp',
    messages: [],
    items: [
      {
        text: 'Home',
        to: '/'
      },
      {
        text: 'About',
        href: '#about'
      }
    ]
  },
  plugins: [createPersistedState()],
  getters: {
    categories: state => {
      const categories = []

      for (const article of state.articles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        ) continue

        const text = article.category

        categories.push({
          text,
          to: `/category/${text}`
        })
      }

      return categories.sort().slice(0, 4)
    },
    links: (state, getters) => {
      return state.items.concat(getters.categories)
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    setUserLoggedIn: (state, payload) => (state.userloggedin = payload),
    setUserName: (state, payload) => (state.username = payload),
    setUserAvatarSrc: (state, payload) => (state.useravatarsrc = payload),
    insertMessage: (state, payload) => (state.messages.push({text:payload})),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {

  }
})
