<template>
  <div class="pt-20 pl-6 pr-6" v-chat-scroll="{ always: true, smooth: true, scrollonremoved: true }">
    <div v-if="account && account.pub">
      <div class="text-black overflow-x-hidden overflow-y-auto bg-white h-full w-full">
        <ul class="list-reset container">
          <li :key="$index"
              :class="msgClass(msg)"
              v-for="(msg, $index) in chatHistory[$i18n.locale]"
          >
            <chat-message
              :isLast="$index == chatHistory[$i18n.locale].length - 1"
              :msg="msg"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="h-full flex items-center content-center justify-center" v-else>
      <span>Getting account...</span>
    </div>
  </div>
</template>
<script>
import ChatMessage from './ChatMessage.vue'

export default {
  name: 'ChatArea',
  components: {
    ChatMessage
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    balance () {
      return this.$store.state.balance
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
    burned () {
      return this.$store.getters.burned
    },
    eventEnded () {
      return this.$store.getters.eventEnded
    }
  },
  methods: {
    msgClass (msg) {
      return {
        'text-right': msg.from == 'user',
        'text-left': msg.from == 'computer',
        'text-left text-grey': msg.from == 'computer-action'
      }
    }
  },
  mounted () {
    const acc = localStorage.getItem('account')
    let account = {}
    if(acc) {
      account = JSON.parse(acc)
    }
    if(this.eventEnded || account.pub === 'seeyou') {
      const firstMsg = this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'bye-bye')
      this.$store.commit('addMessage', { message: firstMsg, lang: this.$i18n.locale })
      this.$store.commit('setChatStarted', true)
    } else if(this.burned || account.pub === 'burned') {
      const firstMsg = this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'burned')
      this.$store.commit('addMessage', { message: firstMsg, lang: this.$i18n.locale })
      this.$store.commit('setChatStarted', true)
    } else if (!this.chatStarted) {
      const firstMsg = this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'intro')
      this.$store.commit('addMessage', { message: firstMsg, lang: this.$i18n.locale })
      this.$store.commit('setChatStarted', true)
    }
  },
  beforeDestroy () {
    // remove ".next" prop to already printed messages
    // so they won't re-printed when ChatMessage.vue gets mounted()
    this.$store.commit('cleanNextMessages')
  }
}
</script>
