import Vuex from 'vuex'
import Vue from 'vue'
import Ae from '@aeternity/aepp-sdk/es/ae/universal'
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
    websocketUrl: 'https://api.pos.apeunit.com', // 'http://localhost:5000'
    socketConnected: false,
    barState: null,
    ae: null,
    chatMessagesList: {
      en: [
      ],
      de: [
        {
          id: 'intro',
          content: '<strong>Wilkommen!</strong> Choose sprache',
          from: 'computer', // or 'user'
          buttons: [
            {
              title: '🇩🇪',
              action: 'chooseLang',
              params: 'de',
              type: 'function'
            },
            {
              title: '🇬🇧',
              action: 'chooseLang',
              params: 'en',
              type: 'function'
            }
          ]
        },
        {
          id: 'welcome-1',
          content: '<strong>Wilkommen!</strong> Dingen, vielleicht auch <strong>HTML code<strong>',
          from: 'computer', // or 'user'
          next: 'welcome-2'
        },
        {
          id: 'welcome-2',
          content: '<strong>Wilkommen 2!</strong> Dingen, vielleicht auch <strong>HTML code<strong>',
          from: 'computer', // or 'user'
          next: 'welcome-3'
        },
        {
          id: 'welcome-3',
          content: '<strong>Wilkommen 3!</strong> Dingen, vielleicht auch <strong>HTML code<strong>',
          from: 'computer', // or 'user'
          next: 'question-main'
        },
        {
          id: 'question-main',
          content: 'Was möchten Sie tun?',
          from: 'computer', // or 'user'
          buttons: [
            {
              title: 'Bestellen',
              action: 'order',
              type: 'message'
            },
            {
              title: 'Transfer',
              action: 'transfer',
              type: 'message'
            },
            {
              title: 'Bekommen',
              action: 'receive',
              type: 'message'
            }
          ]
        },
        {
          id: 'receive',
          content: 'Ich mochte transfer',
          from: 'user', // or 'user'
          next: 'question-receive'
        },
        {
          id: 'question-receive',
          content: 'OK, DE: bitte show your QR or receive one free',
          from: 'computer', // or 'user'
          buttons: [
            {
              title: 'Show QR to receive',
              action: 'showQR',
              type: 'function'
            },
            {
              title: '🐦 1 free Ape Coin for a Tweet',
              action: 'getFreeCoin',
              type: 'function'
            },
            {
              title: 'Nevermind',
              action: 'cancel-message',
              type: 'message-white'
            }
          ]
        },
        {
          id: 'order',
          content: 'Ich möchte bitte eis bestellen',
          from: 'user', // or 'user'
          next: 'question-order'
        },
        {
          id: 'question-order',
          content: 'Gut! Vie fiel?',
          from: 'computer', // or 'user'
          buttons: [
            {
              title: '🍦',
              action: 'orderItem',
              params: 1,
              type: 'function'
            },
            {
              title: '🍦🍦',
              action: 'orderItem',
              params: 2,
              type: 'function'
            },
            {
              title: '🍦🍦🍦',
              params: 3,
              action: 'orderItem',
              type: 'function'
            },
            {
              title: 'Explain',
              action: 'explain-transfer',
              type: 'message-white'
            },
            {
              title: 'Nevermind',
              action: 'cancel-message',
              type: 'message-white'
            }
          ]
        },
        {
          id: 'explain-order',
          content: 'Bitte explain stuff about ice cream',
          from: 'user', // or 'user'
          next: 'explain-question-order'
        },
        {
          id: 'explain-question-order',
          content: 'German explanation about ordering',
          from: 'computer', // or 'user'
          next: undefined,
          buttons: [
            {
              title: '🍦',
              action: 'transferScan',
              type: 'function'
            },
            {
              title: '🍦🍦',
              action: 'transferName',
              type: 'function'
            },
            {
              title: '🍦🍦🍦',
              action: 'explain-transfer',
              type: 'message-white'
            },
            {
              title: 'Nevermind',
              action: 'cancel-message',
              type: 'message-white'
            },
            {
              title: 'Explain',
              action: 'explain-order',
              type: 'message-white'
            }
          ]
        },
        {
          id: 'cancel-message',
          content: 'Ich möchte bitte beenden',
          from: 'user', // or 'user'
          next: 'question-main'
        },
        {
          id: 'transfer',
          content: 'Ich möchte gerne umziehen',
          from: 'user', // or 'user'
          next: 'question-transfer'
        },
        {
          id: 'question-transfer',
          content: 'Bereit zu transfer?!?!?!',
          from: 'computer', // or 'user'
          buttons: [
            {
              title: '1 Ape Coin',
              action: 'transferCoins',
              params: 1,
              type: 'function'
            },
            {
              title: '2 Ape Coins',
              action: 'transferCoins',
              params: 2,
              type: 'function'
            },
            {
              title: 'All my Ape Coins',
              action: 'transferCoins',
              params: 'all',
              type: 'function'
            },
            {
              title: 'Explain',
              action: 'explain-transfer',
              type: 'message-white'
            },
            {
              title: 'Nevermind',
              action: 'cancel-message',
              type: 'message-white'
            }
          ]
        },
        {
          id: 'explain-transfer',
          content: 'Bitte give me Transfererklärung! Was ist <strong>Name</strong> und was ist <strong>Scan</strong>?!?',
          from: 'user', // or 'user'
          next: 'explain-question-transfer'
        },
        {
          id: 'explain-question-transfer',
          content: 'Dies ist die Transfererklärung: blabla blabla blabla blabla blabla',
          from: 'computer', // or 'user'
          buttons: [
            {
              title: 'Scan',
              action: 'transferScan',
              type: 'function'
            },
            {
              title: 'Name',
              action: 'transferName',
              type: 'function'
            },
            {
              title: 'Explain',
              action: 'explain-transfer',
              type: 'message-white'
            },
            {
              title: 'Nevermind',
              action: 'cancel-message',
              type: 'message-white'
            }
          ]
        }
      ]
    },
    chatHistory: {
      en: [],
      de: []
    },
    // Ready translated locale messages
    i18nTexts: {
      en: {
        message: {
          hello: 'hello world! I\'m a text in your lnaguage',
          youhavetokens: 'You have tokens'
        }
      },
      de: {
        message: {
          hello: 'hallo Welt, Ich bin ein Text in deiner Sprache. Ümlaut!',
          youhavetokens: 'Du hast tokens'
        }
      }
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
    client (state) { // TODO: this should be updated to the latest sdk
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
    addMessage (state, { message, lang }) {
      let clonedMsg = Object.assign({}, message)
      state.chatHistory[lang].push(clonedMsg)
      // eslint-disable-next-line no-undef
      localStorage.setItem('chatHistory', JSON.stringify(state.chatHistory))
    },
    removeMessage (state, { messageId, lang }) {
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
    async updateBalance ({ commit, state, getters }) {
      const pubKey = state.account.pub
      if (pubKey) {
        state.ae
          .balance(pubKey, { format: false })
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
    async initAe ({ commit, state, getters, dispatch }) {
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
