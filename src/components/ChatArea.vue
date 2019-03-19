<template>
  <div class="h-full bg-purpl" v-bind:class="{orderDone: isOrderDone}"
    v-chat-scroll="{always: true, smooth: true, scrollonremoved: true}">
    <div class="text-black overflow-x-hidden overflow-y-auto bg-white"
        v-if="hasTokensForBeer && beerAvailable && t">
        {{ $t("message.youhavetokens") }} {{itemPrice}}
      <ul class="list-reset">
        <li v-bind:key="$index"
            class="h-32 border-b-1"
            v-bind:class="msgClass(msg)"
            v-for="(msg, $index) in chatHistory[$i18n.locale]">
              <chat-message :last="$index == chatHistory[$i18n.locale].length - 1" :msg="msg" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BeerHash from './BeerHash.vue'
import ChatMessage from './ChatMessage.vue'

export default {
  name: 'ChatArea',
  components: {
    BeerHash,
    ChatMessage
  },
  data () {
    return {
      ajaxCall: { status: 'busy' },
      txHash: null,
      selectedBeerNumber: 1,
      t: true,
      modalVisible: false,
      isOrderDone: false
    }
  },
  computed: {
    barPubKey () {
      return this.$store.state.barPubKey
    },
    account () {
      return this.$store.state.account
    },
    wallet () {
      return {
        priv: this.account.priv,
        pub: this.account.pub
      }
    },
    balance () {
      return this.$store.state.balance
    },
    ae () {
      return this.$store.getters.ae
    },
    chatMessagesList () {
      return this.$store.getters.chatMessagesList
    },
    chatHistory () {
      return this.$store.getters.chatHistory
    },
    chatStarted () {
      return this.$store.getters.chatStarted
    },
    hasTokensForBeer () {
      return this.balance >= this.itemPrice + 1
    },
    beerAvailable () {
      return this.barState === 'open'
    },
    beerEmpty () {
      return this.barState === 'out_of_beers'
    },
    barClosed () {
      return this.barState === 'closed'
    },
    maxBeers () {
      return Math.floor((this.balance - 1) / this.itemPrice)
    },
    itemPrice () {
      return this.$store.state.itemPrice
    },
    numberOfTokens () {
      const numTokens = this.selectedBeerNumber * this.itemPrice
      const rest = numTokens % this.itemPrice
      return numTokens - rest
    },
    barState () {
      return this.$store.state.barState
    },
    isValidInput () {
      return (
        this.selectedBeerNumber > 0 && this.selectedBeerNumber <= this.maxBeers
      )
    }
  },
  methods: {
    msgClass (msg) {
      return {
        'text-right': msg.from == 'user',
        'text-left': msg.from == 'computer',
        'text-left text-grey': msg.from == 'computer-action'
      }
    },
    onClick (...strings) {
      console.log(strings[0] + strings[1])
    },
    async startConversation (receiver) {
      // check first if there is beer
      if (!this.beerAvailable) {
        // TODO: display errors
        console.log('no Beer left')
        return false
      }

      const amount = this.numberOfTokens
      this.t = false
      this.ajaxCall.status = 'idle'
      try {
        console.log(`executing spend tx...`)
        const txHash = await this.ae.spend(receiver, parseInt(amount)) // params: (receiver, amount, account sending, { fee = 1, nonce })
        this.txHash = txHash
        this.$store.commit('addBeerHash', txHash)
        this.ajaxCall.status = 'ready'
        this.isOrderDone = true
      } catch (error) {
        this.ajaxCall.status = 'busy'
        console.warn('Something went wrong: ', error)
      }
      // console.log(`Waiting for ${txHash} to be mined...`)
      // this.ae.tx.waitForTransaction(txHash).then(blockHeight => {
      //   this.ajaxCall.status = 'ready'
      //   this.isOrderDone = true
      //   console.log(`blockHeight:${blockHeight} `, `txHash:${txHash} `)
      // }, reason => {
      //   this.ajaxCall.status = 'busy'
      //   console.warn('Something went wrong: ', reason)
      // })
    },
    getAllBeer () {
      this.selectedBeerNumber = this.maxBeers
    },
    showModal () {
      if (this.isValidInput) {
        this.modalVisible = true
      }
    },
    beerQuantity (action) {
      if (action === 'inc') {
        this.selectedBeerNumber++
      } else {
        this.selectedBeerNumber--
      }
    },
    resetScreen () {
      this.ajaxCall.status = 'busy'
      this.txHash = null
      this.selectedBeerNumber = 1
      this.t = true
      this.modalVisible = false
      this.isOrderDone = false
    }
  },
  mounted () {
    // start chat, by picking first message.
    if (!this.chatStarted) {
      const firstMsg = this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'welcome-1')
      this.$store.commit('addMessage', { message: firstMsg, lang: this.$i18n.locale })
      console.log('start CHAT')
      this.$store.commit('setChatStarted', true)
    }
    // hack to disable direct token input
    if (this.$refs.tokensCount) {
      const tokenInput = this.$refs.tokensCount.$el.querySelector('input')
      if (tokenInput) {
        tokenInput.readOnly = true
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('cleanNextMessages')
    console.log('before destroy CHAT AREA')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
</style>
