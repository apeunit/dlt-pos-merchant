<template>
  <div>
    <p v-html="msg.content"></p>
    <div v-if="isLast">
      <button v-bind:key="`${key}`"
              v-for="(button, key) in msg.buttons"
              @click="executeBtnAction(button.action, button.type, button.params, $event)"
              class="rounded-full px-4 py-2"
              v-bind:class="msgClass(button.type)">
        {{ button.title }}
      </button>
    </div>
  </div>
</template>
<script>
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
      }
    },
    methods: {
      msgClass (type) {
        console.log(type)
        return {
          'bg-black text-white': type == 'message' || type == 'function',
          'bg-white text-black border-2-black': type == 'message-white'
        }
      },
      executeBtnAction (action, type, params, evt) {
        alert(`get message ID: ${action}, ${type}`)

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
          setTimeout(() => resolve(fn(par)), 3000)
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
        // here show screen to tranfer by scan or by name
        var scanOrName = prompt(`you triggered the "Transfer! with arg ${arg}" "scan" or "name"?`);
        switch(scanOrName) {
          case "scan":
            this.transferScan (arg)
            break;
          case "name":
            this.transferName (arg)
            break;
        }
      },
      transferScan (arg) {
        alert(`you triggered the "Transfer Scan Function! wit arg ${arg}"`)
      },
      transferName (arg) {
        alert(`you triggered the "Transfer Name Function! wit arg ${arg}"`)
      },
      orderItem (arg){
        const price =  Number(arg) * Number(this.$store.state.itemPrice)
        this.$store.dispatch('transfer', {amount: price, receiver: this.$store.state.barPubKey})
      },
      getFreeCoin (arg){
        alert(`you triggered the "Get Free coin Function! wit arg ${arg}"`)
      },
      showQR (arg){
        alert(`you triggered the "Show QR! with arg ${arg}"`)
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
      }
    },
    mounted () {
      // send next message, if first message has a "next"
      this.sendNextMessage(this.msg)
      console.log('Mounted: message component', this.msg)
    }
  }
</script>
