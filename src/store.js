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
        {
          id: 'welcome-1',
          content: '<strong>Welcome!</strong> Things, maybe in <strong>HTML code<strong>',
          from: 'computer', // or 'user'
          next: 'welcome-2'
        },
        {
          id: 'welcome-2',
          content: '<strong>Wilkommen 2!</strong> Things, maybe in <strong>HTML code<strong>',
          from: 'computer', // or 'user'
          next: 'welcome-3'
        },
        {
          id: 'welcome-3',
          content: '<strong>Wilkommen 3!</strong> Things, maybe in <strong>HTML code<strong>',
          from: 'computer', // or 'user'
          next: 'welcome-4'
        },
        {
          id: 'welcome-4',
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
          id: 'transfer',
          content: 'I want to transfer',
          from: 'user', // or 'user'
          next: 'transfer-2'
        },
        {
          id: 'transfer-2',
          content: 'Ready to transfer?!?!?!',
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
              action: 'welcome-4',
              type: 'message-white'
            }
          ]
        },
        {
          id: 'explain-transfer',
          content: 'I need you to explain me the transfer...what is <strong>Name</strong> and what is <strong>Scan</strong>?!?!?',
          from: 'user', // or 'user'
          next: 'explain-transfer-2'
        },
        {
          id: 'explain-transfer-2',
          content: 'This is the explanation for transfer: blabla blabla blabla blabla blabla',
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
              action: 'welcome-4',
              type: 'message-white'
            }
          ]
        }
      ],
      de: [
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
          next: 'welcome-4'
        },
        {
          id: 'welcome-4',
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
          id: 'transfer',
          content: 'Ich möchte gerne umziehen',
          from: 'user', // or 'user'
          next: 'transfer-2'
        },
        {
          id: 'transfer-2',
          content: 'Bereit zu transfer?!?!?!',
          from: 'computer', // or 'user'
          next: undefined,
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
              action: 'welcome-4',
              type: 'message-white'
            }
          ]
        },
        {
          id: 'explain-transfer',
          content: 'Bitte give me Transfererklärung! Was ist <strong>Name</strong> und was ist <strong>Scan</strong>?!?',
          from: 'user', // or 'user'
          next: 'explain-transfer-2'
        },
        {
          id: 'explain-transfer-2',
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
              action: 'welcome-4',
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
            // logs current balance of 'A_PUB_ADDRESS'

            // SEND NEW MESSAGE on BALANCE UPDATE:
            // console.log('balance', balance)
            // const randomHash = Math.random().toString(36).substring(7)
            // let msgBalance = {}
            // if (state.currentLang === 'de') {
            //   msgBalance = { id: randomHash, content: `Deine balance ist ${balance}`, from: 'computer' }
            // } else {
            //   msgBalance = { id: randomHash, content: `Your balance is now ${balance}`, from: 'computer' }
            // }
            // commit('addMessage', { message: msgBalance, lang: state.currentLang })

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
