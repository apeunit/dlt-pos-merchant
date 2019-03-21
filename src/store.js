import Vuex from 'vuex'
import Vue from 'vue'
import Ae from '@aeternity/aepp-sdk/es/ae/universal'
import chatData from './assets/data/chat.json'
// import BigNumber from "./bignumber.mjs"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    chatStarted: false,
    currentLang: 'de',
    account: {
      pub: null,
      priv: null,
      name: null
    },
    balance: 0,
    beerHashes: [],
    itemPrice: 1000000000000000000,
    barPubKey: 'ak_BARmHG4mjUeUKY522wxyv7Q8hMEVpC5Qm9GSpuSiSLv17B1sg',
    websocketUrl: 'https://api.pos.apeunit.com', // 'http://localhost:5000',
    twitterBase: 'https://twitter.com/intent/tweet?text=',
    socketConnected: false,
    barState: null,
    ae: null,
    chatMessagesList: chatData,
    chatHistory: {
      en: [],
      de: []
    }
  },
  getters: {
    chatStarted (state) {
      return state.chatStarted
    },
    currentLang (state) {
      return state.currentLang
    },
    chatMessagesList (state) {
      return state.chatMessagesList
    },
    lastBeerHash (state) {
      if (state.beerHashes.length <= 0) {
        return null
      }
      return state.beerHashes[0]
    },
    ae (state) {
      return state.ae
    },
    chatHistory (state) {
      return state.chatHistory
    },
    client (state) {
      return state.ae
    }
  },
  mutations: {
    cleanNextMessages (state) {
      state.chatHistory.en.forEach(function (o) {
        console.log(o)
        if (o.hasOwnProperty('next')) {
          delete o.next
        }
      })
      state.chatHistory.de.forEach(function (o) {
        if (o.hasOwnProperty('next')) {
          delete o.next
        }
      })
      console.log(state.chatHistory)
    },
    setChatStarted (state, started) {
      state.chatStarted = started
    },
    setAccount (state, {
      pub,
      priv,
      name
    }) {
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
    setCurrentLang (state, lang) {
      console.log(`setting ${lang}!`)
      state.currentLang = lang
    },
    setAe (state, ae) {
      state.ae = ae
    },
    setBalance (state, newBalance) {
      state.balance = newBalance
    },
    addMessage (state, {
      message,
      lang
    }) {
      let clonedMsg = Object.assign({}, message)
      state.chatHistory[lang].push(clonedMsg)
      // eslint-disable-next-line no-undef
      localStorage.setItem('chatHistory', JSON.stringify(state.chatHistory))
    },
    removeMessage (state, {
      messageId,
      lang
    }) {
      const newMessages = state.chatHistory[lang].filter(function (obj) {
        console.log(obj.id !== messageId)
        return obj.id !== messageId
      })
      console.log('newMessages', newMessages)
      state.chatHistory[lang] = newMessages
      // eslint-disable-next-line no-undef
      localStorage.setItem('chatHistory', JSON.stringify(state.chatHistory))
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
    async updateBalance ({
      commit,
      state,
      getters
    }) {
      const pubKey = state.account.pub
      if (pubKey) {
        state.ae
          .balance(pubKey, {
            format: false
          })
          .then(balance => {
            commit('setBalance', balance)
            return balance
          })
          .catch(e => {
            console.log(e)
          })
      }
      return 0
    },
    async initAe ({
      commit,
      state,
      getters,
      dispatch
    }) {
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
