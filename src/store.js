import Vuex from 'vuex'
import Vue from 'vue'
import Ae from '@aeternity/aepp-sdk/es/ae/universal'
import chatData from './assets/data/chat.json'
import QRCode from 'qrcode'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    costToCharge: 0,
    chatStarted: false,
    currentLang: 'en',
    account: {
      pub: null,
      priv: null,
      name: null
    },
    balance: 0,
    beerHashes: [],
    itemPrice: 1000000000000000000,
    fee: 18000000000000,
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
    },
    qrData: null,
    scannedQR: null,
    burned: false,
    eventEnded: false,
    receiver: null
  },
  getters: {
    costToCharge (state) {
      return state.costToCharge
    },
    chatStarted (state) {
      return state.chatStarted
    },
    currentLang (state) {
      return state.currentLang
    },
    getQRData (state) {
      return state.qrData
    },
    getScannedQR (state) {
      return state.scannedQR
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
    userBalance (state) {
      return state.balance
    },
    ae (state) {
      return state.ae
    },
    chatHistory (state) {
      return state.chatHistory
    },
    client (state) {
      return state.ae
    },
    burned (state) {
      return state.burned
    },
    eventEnded (state) {
      return state.eventEnded
    },
    getBarStatus (state) {
      return state.barState
    }
  },
  mutations: {
    setReceiver (state, val) {
      state.receiver = val
    },
    setCostToCharge (state, amount) {
      state.costToCharge = amount
    },
    setQRData (state, data) {
      state.qrData = data
    },
    setScanQR (state, data) {
      state.scannedQR = data
    },
    setEventStatus (state, data) {
      state.eventEnded = data
    },
    setBurned (state, data) {
      state.burned = data
    },
    cleanNextMessages (state) {
      state.chatHistory.en.forEach(function (o, i, cH) {
        if (o.hasOwnProperty('next') && i <= cH.length - 2) {
          delete o.next
        }
      })
      state.chatHistory.de.forEach(function (o, i, cH) {
        if (o.hasOwnProperty('next') && i <= cH.length - 2) {
          delete o.next
        }
      })
    },
    setChatStarted (state, started) {
      state.chatStarted = started
    },
    setChatHistory (state, history) {
      state.chatHistory = history
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
      if (pub !== 'burned' && pub !== 'seeyou') {
        state.ae.setKeypair({
          secretKey: state.account.priv,
          publicKey: state.account.pub
        })
      }
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
      if (!clonedMsg.time) {
        clonedMsg.time = new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          hour12: true,
          minute: 'numeric'
        })
      }
      state.chatHistory[lang].push(clonedMsg)
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
    async updateBalance ({ commit, state }) {
      const pubKey = state.account.pub
      if (pubKey && pubKey !== 'burned' && pubKey !== 'seeyou') {
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
    async initAe ({ commit }) {
      commit(
        'setAe',
        await Ae({
          url: 'https://sdk-testnet.aepps.com',
          internalUrl: 'https://sdk-testnet.aepps.com',
          networkId: 'ae_uat', // or any other networkId your client should connect to
          keypair: {
            secretKey: '',
            publicKey: ''
          }
        })
      )
    },
    async transfer ({ commit, state, getters, dispatch }, { amount, receiver }) {
      /**
       *  TODO: check for same account. user balance etc
       */
      let spendTx = null
      try {
        spendTx = await getters.client.spend(amount, receiver)
      } catch (e) {
        console.log(e)
      }
      dispatch('updateBalance')
      commit('addBeerHash', spendTx)
      return spendTx
    },
    async generateQRURI ({ commit, state }, { data }) {
      const uri = await QRCode.toDataURL(data, {
        errorCorrectionLevel: 'H'
      })
      return uri
    },
    async getPubkeyByName ({ commit, state }, { name }) {
      // eslint-disable-next-line no-undef
      const req = await fetch(`${state.websocketUrl}/rest/address/${name}`)
      const address = (await req.json()).address
      return address
    }
  },
  plugins: [
    createPersistedState()
  ]
})

export default store
