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
  locale: 'de', // set locale
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

// p=ak_bobS3qRvWfDxCpmedQYzp3xrK5jVUS4MSto99QrCdySSMjYnd&k=565ea7300f070858838a0bd6c3fe6640f7591c825536ef84126ad1fda02a13804f067606e2f0cb38fed7a1f2a8ca7696330ae2cd8fa9187960ebbd0962f6798a&n=aet_ua
store.dispatch('initAe')
new Vue({
  i18n,
  sockets: {
    connect () {
      console.log('socket connected')
      // set the initial bar state after connecting
      console.log('asking bar state')
      this.$socket.emit('get_bar_state', (barState) => {
        console.log('get_bar_state', barState)
        if (barState && barState.state) {
          store.commit('setBarState', barState.state)
        }
      })
    }
  },
  router: getRouter(store),
  store,
  render: h => h(App),
  mounted () {
  },
  async beforeMount () {
    await store.dispatch('initAe')
    try {
      // eslint-disable-next-line no-undef
      let account = JSON.parse(localStorage.getItem('account'))
      if (account) {
        store.commit('setAccount', account)
      }
      // eslint-disable-next-line no-undef
      let beerHashes = JSON.parse(localStorage.getItem('beerHashes'))
      if (beerHashes) {
        store.commit('setBeerHashes', beerHashes)
      }
    } catch (e) {
      console.log(e)
    }
  }
}).$mount('#app')
