import Vuex from 'vuex'
import Vue from 'vue'
import Ae from '@aeternity/aepp-sdk/es/ae/universal'
// import BigNumber from "./bignumber.mjs"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    account: {
      pub: null,
      priv: null,
      name: null
    },
    balance: 0,
    beerHashes: [],
    itemPrice: 1000000000000000000,
    barPubKey: 'ak_BARmHG4mjUeUKY522wxyv7Q8hMEVpC5Qm9GSpuSiSLv17B1sg',
    websocketUrl: 'http://localhost:5000', // https://api.pos.apeunit.com
    socketConnected: false,
    barState: null,
    ae: null,
    messages: [
      {
        id: Math.random().toString(36).substring(7),
        content: 'stuff, maybe even HTML code'
      }
    ]
  },
  getters: {
    lastBeerHash (state) {
      if (state.beerHashes.length <= 0) {
        return null
      }
      return state.beerHashes[0]
    },
    ae (state) {
      return state.ae
    },
    messages (state) {
      return state.messages
    },
    client (state) { // TODO: this should be updated to the latest sdk
      return state.ae
    }
    // clientInternal() { // TODO: this should be updated to the latest sdk and is not necesary
    //   const provider = new AeternityClient.providers.HttpProvider(
    //     'republica.aepps.com',
    //     443,
    //     { secured: true, internal: true }
    //   )
    //   return new AeternityClient(provider)
    // }
  },
  mutations: {
    setAccount (state, { pub, priv, name }) {
      state.account.pub = pub
      state.account.priv = priv
      state.account.name = name
      // eslint-disable-next-line no-undef
      localStorage.setItem('account', JSON.stringify(state.account))
      state.ae.setKeypair({
        secretKey: state.account.priv,
        publicKey: state.account.pub
      })
    },
    setAe (state, ae) {
      state.ae = ae
    },
    setBalance (state, newBalance) {
      state.balance = newBalance
    },
    addMessage (state, message) {
      state.messages.push(message)
      // eslint-disable-next-line no-undef
      localStorage.setItem('messages', JSON.stringify(state.messages))
    },
    addBeerHash (state, beerHash) {
      state.beerHashes.unshift(beerHash)
      // eslint-disable-next-line no-undef
      localStorage.setItem('beerHashes', JSON.stringify(state.beerHashes))
    },
    setBeerHashes (state, beerHashes) {
      state.beerHashes = beerHashes
      // eslint-disable-next-line no-undef
      localStorage.setItem('beerHashes', JSON.stringify(state.beerHashes))
    },
    setBarState (state, barState) {
      state.barState = barState
    },
    SOCKET_CONNECT (state, status) {
      state.socketConnected = true
    },
    SOCKET_DISCONNECT (state, status) {
      state.socketConnected = false
    },
    SOCKET_BAR_STATE (state, barState) {
      console.log('SOCKET_BAR_STATE', barState)
      if (Array.isArray(barState) && barState.length >= 0) {
        barState = barState[0]
      }
      if (barState.state) {
        state.barState = barState.state
      }
    }
  },
  actions: {
    async updateBalance ({ commit, state, getters }) {
      const pubKey = state.account.pub
      if (pubKey) {
        state.ae
          .balance(pubKey, { format: false })
          .then(balance => {
            // logs current balance of 'A_PUB_ADDRESS'
            console.log('balance', balance)
            commit('setBalance', balance)
            return balance
          })
          .catch(e => {
            // logs error
            console.log(e)
          })
      }
      return 0
    },
    async initAe ({ commit, state, getters }) {
      commit(
        'setAe',
        await Ae({
          url: 'https://testnet.mdw.aepps.com',
          internalUrl: 'https://testnet.mdw.aepps.com',
          networkId: 'ae_uat', // or any other networkId your client should connect to
          keypair: {
            secretKey: '',
            publicKey: ''
          }
        })
      )
    }
  }
})

export default store
