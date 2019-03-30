import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import getRouter from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import './assets/css/tailwind.css'
import VueChatScroll from 'vue-chat-scroll'
import VueI18n from 'vue-i18n'

Vue.component(VueQrcode.name, VueQrcode)

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(VueChatScroll)
Vue.use(VueI18n)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages: store.state.i18nTexts // set locale messages
})

Vue.use(new VueSocketIO({
  debug: true,
  connection: store.state.websocketUrl,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

store.dispatch('initAe')
new Vue({
  i18n,
  router: getRouter(store),
  store,
  sockets: {
    connect () {
      // console.log('socket connected')
      // set the initial bar state after connecting
      // console.log('asking bar state')
      this.$socket.emit('get_bar_state', (barState) => {
        console.log('get_bar_state', barState)
        if (barState && barState.state) {
          store.commit('setBarState', barState.state)
        }
      })
    }
  },
  render: h => h(App),
  mounted () {
    this.sockets.subscribe('bar_state', (status) => {
      console.log(`bar is now ${status.state}`)
      this.$store.commit('setBarState', status.state)
    })
  }
}).$mount('#app')
