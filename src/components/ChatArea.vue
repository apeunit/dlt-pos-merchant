<template>
  <div class="h-full w-full" v-chat-scroll="{always: true, smooth: true, scrollonremoved: true}">
    <div v-if="account && account.pub" class="flex items-center w-full">
      <div class="h-full w-full">
        <div class="text-black overflow-x-hidden overflow-y-auto bg-white">
          <ul class="list-reset">
            <li v-bind:key="$index"
                class="h-32 border-b-1"
                v-bind:class="msgClass(msg)"
                v-for="(msg, $index) in chatHistory[$i18n.locale]">
                  <chat-message :isLast="$index == chatHistory[$i18n.locale].length - 1" :msg="msg" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
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
    // start chat, by picking first message.
    if (!this.chatStarted) {
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
