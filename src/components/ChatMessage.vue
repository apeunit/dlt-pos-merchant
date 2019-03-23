<template>
  <div>
    <div class="min-h-32">
      <p class="font-sans-medium text-28" v-html="msg.content"></p>
      <p class="text-xs font-sans mt-2">{{ msg.time }}</p>
      <div v-if="isLast" class="float-right pt-16 overflow-visible">
        <div v-bind:key="`${key}`" v-for="(button, key) in msg.buttons">
          <span @click="executeBtnAction(button.action, button.type, button.params, $event)"
                class="rounded-full px-10 py-3 font-sans w-auto text-base tracking-wide mt-2 text-right cursor-pointer float-right"
                v-bind:class="msgClass(button.type)">
            {{ button.title }}
          </span><br/><br/><br/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sign, verify, decodeBase58Check } from '@aeternity/aepp-sdk/es/utils/crypto.js'
import { encode } from '@aeternity/aepp-sdk/es/tx/builder/helpers.js'

  export default {
    name: 'ChatMessage',
    props: [
      'msg',
      'isLast'
    ],
    computed: {
      chatMessagesList () {
        return this.$store.getters.chatMessagesList
      },
      chatHistory () {
        return this.$store.getters.chatHistory
      },
      costToCharge () {
        return this.$store.getters.costToCharge
      },
      userBalance () {
        return this.$store.getters.userBalance
      }
    },
    methods: {
      msgClass (type) {
        console.log(type)
        return {
          'bg-black text-white': type == 'message' || type == 'function',
          'bg-white text-black border-2 border-black': type == 'message-white'
        }
      },
      executeBtnAction (action, type, params, evt) {
        switch (type) {
          case 'message':
          case 'message-white':
            // send a Message
            console.log(`frrrrrrom`, this.chatMessagesList[this.$i18n.locale])
            const msg = this.chatMessagesList[this.$i18n.locale].find(o => o.id === action)
            this.sendMsg(msg, evt)
            break
          case 'function':
            // execute a Function (of this Component)
            console.log(`xecute ${action}`)
            this[action](params)
            break
        }

      },
      sendMsg (msg, evt) {
        this.$store.commit('addMessage', { message: msg, lang: this.$i18n.locale })
        // hide buttons
        evt.target.parentNode.classList.toggle('invisible')
        // send next message, if defined
        // this.sendNextMessage (msg)

      },
      wait (fn, par) {
        return new Promise((resolve) => {
          // wait 3s before calling fn(par)
          setTimeout(() => resolve(fn(par)), 30)
        })
      },
      sendNextMessage (msg) {
        const app = this

        if (msg.next) {
          // show waiting message
          this.playWaitMessage()
          // remove wait message and play next
          this.wait(this.removeWaitMessage, {locale: app.$i18n.locale}).then(function() {
            // play next message (from computer)
            console.log(`pick and play ID: ${msg.next}`)
            console.log(`from`, app.chatMessagesList[app.$i18n.locale])
            const nextMsg = app.chatMessagesList[app.$i18n.locale].find(o => o.id === msg.next)
            console.log(`NEXT:`, nextMsg)
            app.$store.commit('addMessage', { message: nextMsg, lang: app.$i18n.locale })
          })
        }
      },
      playWaitMessage () {
        const waitMsg = {
          id: 'wait',
          content: '...typing',
          from: 'computer-action', // or 'user'
        }
        this.$store.commit('addMessage', { message: waitMsg, lang: this.$i18n.locale })
      },
      removeWaitMessage ({ locale }) {
        this.$store.commit('removeMessage', { messageId: 'wait', lang: locale })
      },
      transferCoins (arg) {
        const message = Object.assign({}, this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'transfer-user-message'))
        message.content = message.content.replace('xxx', arg)
        message.content = arg > 1 || isNaN(arg)? message.content+'s' : message.content
        this.$store.commit('addMessage', { message, lang: this.$i18n.locale })

        let amount = isNaN(arg)? (this.userBalance - this.$store.state.fee):  arg * this.costToCharge
        amount =  amount < 0 ? 0 : amount
        if(this.userBalance >= (amount + this.$store.state.fee) ) {
          this.$store.commit('setCostToCharge', amount)
          const msg =  this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'transfer-type-choice')
          this.$store.commit('addMessage', { message: msg, lang: this.$i18n.locale })
        } else {
          const msg =  this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'not-enough-balance')
          this.$store.commit('addMessage', { message: msg, lang: this.$i18n.locale })
        }
      },
      scanQR () {
        alert('TODO: technically should check for camera, if present then open and scan else alert user that there is no camera on device')
      },
      async openAddressOverlay () {
        const name =  prompt('enter user name?')
        if(name) {
          const receiver =  await this.$store.dispatch('getPubkeyByName', { name })
          let message = Object.assign({}, this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'transfer-input-user'))
          message.content = message.content.replace('xxx', name)
          this.$store.commit('addMessage', { message, lang: this.$i18n.locale })

          const tx = await this.$store.dispatch('transfer', {amount: this.costToCharge, receiver})
          message = Object.assign({}, this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'transfer-done'))
          message.content = message.content.replace('tx_hash', tx.hash)
          this.$store.commit('addMessage', { message, lang: this.$i18n.locale })
        }

      },
      saveOrder (arg) {
        const order = Object.assign({}, this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'show-order-details'))
        order.content = order.content.replace('xxx', arg)
        order.content = arg > 1 ? order.content+'s' : order.content
        this.$store.commit('addMessage', { message: order, lang: this.$i18n.locale })

        const amount = arg * this.$store.state.itemPrice
        if(this.userBalance >= (amount + this.$store.state.fee)) {
          this.$store.commit('setCostToCharge', amount)
          const order2 = Object.assign({}, this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'show-order-details-2'))
          order2.content = order2.content.replace('xxx', amount)
          this.$store.commit('addMessage', { message: order2, lang: this.$i18n.locale })
        } else if (this.userBalance < (amount + this.$store.state.fee)) {
          const msg =  this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'not-enough-balance')
          this.$store.commit('addMessage', { message: msg, lang: this.$i18n.locale })
        }
      },
      async orderItem (){
        // user response
        const yesMessage = this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'yes')
        this.$store.commit('addMessage', { message: yesMessage, lang: this.$i18n.locale })
        
        // computer messages
        const order1 = this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'post-order-message-1')
        this.$store.commit('addMessage', { message: order1, lang: this.$i18n.locale })

        const txHash = await this.$store.dispatch('transfer', {amount: this.costToCharge, receiver: this.$store.state.barPubKey})
        const dataURI = await this.$store.dispatch('generateQRURI', {data: (txHash.hash + ' '+ this.signHash(txHash.hash, this.$store.state.account.priv))})
        const img = `<img src="${dataURI}" alt="order" height="300" width="300">`
        
        // computer QR
        const txMessage = {
		          "id":"show-order-qr",
		          "content": img,
              "from": "computer",
              "time": null
            }
        const order3 = this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'post-order-message-3')
        this.$store.commit('addMessage', { message: order3, lang: this.$i18n.locale })
        this.$store.commit('addMessage', { message: txMessage, lang: this.$i18n.locale })

        const afterOrder = this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'question-main-2')
        this.$store.commit('addMessage', { message: afterOrder, lang: this.$i18n.locale })
      },
      getFreeCoin (){
        const message = Object.assign({}, this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'tweet'))
        const url = this.$store.state.twitterBase + encodeURIComponent(message.content.replace('xxx', this.$store.state.account.pub))
        const win = window.open(url, '_blank');
        win.focus();
      },
      async showQR (arg){
        const dataURI = await this.$store.dispatch('generateQRURI', {data: this.$store.state.account.pub})
        const img = `<img src="${dataURI}" alt="order" height="300" width="300">`
        const txMessage = {
		          "id":"show-userpub-qr",
		          "content": img,
		          "from": "user"
		        }
        this.$store.commit('addMessage', { message: txMessage, lang: this.$i18n.locale })
      },
      chooseLang (lang){
        this.$i18n.locale = lang
        this.$store.commit('setCurrentLang', lang)
        this.startConvo()
      },
      startConvo () {
        // start chat, by picking first message.
        if (!this.chatStarted) {
          const firstMsg = this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'welcome-1')
          this.$store.commit('addMessage', { message: firstMsg, lang: this.$i18n.locale })
          this.$store.commit('setChatStarted', true)
        }
      },
      signHash (txHash, privateKey) {
        const sig = sign(Buffer.from(txHash), Buffer.from(privateKey, 'hex'))
        const encodedSig = encode(sig, 'sg')
        console.log("signHash encoded", encodedSig)
        return encodedSig
      }
    },
    mounted () {
      // send next message, if first message has a "next"
      this.sendNextMessage(this.msg)
      console.log('Mounted: message component', this.msg)
    }
  }
</script>
