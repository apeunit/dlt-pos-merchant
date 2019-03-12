import './custom.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import getRouter from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import Ae from '@aeternity/aepp-sdk/es/ae/universal'
import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory.js'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VeeValidate)

Vue.use(new VueSocketIO({
  debug: true,
  connection: store.state.websocketUrl,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

// p=ak$bobS3qRvWfDxCpmedQYzp3xrK5jVUS4MSto99QrCdySSMjYnd&k=565ea7300f070858838a0bd6c3fe6640f7591c825536ef84126ad1fda02a13804f067606e2f0cb38fed7a1f2a8ca7696330ae2cd8fa9187960ebbd0962f6798a&n=aet_ua
async function initAe (store) {
  store.commit(
    'setAe',
    await Ae({
      url: 'https://sdk-testnet.aepps.com',
      internalUrl: 'https://sdk-testnet.aepps.com',
      networkId: 'aet_ua', // or any other networkId your client should connect to
      accounts: [
        MemoryAccount({ keypair: {
          secretKey: '565ea7300f070858838a0bd6c3fe6640f7591c825536ef84126ad1fda02a13804f067606e2f0cb38fed7a1f2a8ca7696330ae2cd8fa9187960ebbd0962f6798a',
          publicKey: 'ak$bobS3qRvWfDxCpmedQYzp3xrK5jVUS4MSto99QrCdySSMjYnd'
        } })
      ]
    })
  )
}

function initVue (store) {
  // set localStorage account BEFORE creating router
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

  console.info('about to render Vue App')
  new Vue({
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
    }
  }).$mount('#app')
}
initAe(store)
  .then(v => {
    initVue(store)
  })
  .catch(e => console.error())
