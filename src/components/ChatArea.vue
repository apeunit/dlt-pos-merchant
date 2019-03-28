<template>
  <div class="app-chat-area" v-chat-scroll="{
    always: true,
    smooth: true,
    scrollonremoved: true
  }">
    <template v-if="account && account.pub">
      <transition-group name="list" tag="ul" class="list-reset container">
        <li :key="$index"
            :class="msgClass(msg)"
            v-for="(msg, $index) in chatHistory[$i18n.locale]"
        >
          <chat-message
            :isLast="$index == chatHistory[$i18n.locale].length - 1"
            :msg="msg"
          />
        </li>
      </transition-group>
    </template>
    <div class="h-full flex items-center content-center justify-center" v-else>
      <span>Loading...</span>
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
      this.$store.commit('setChatStarted', true)
      this.$store.commit('setChatHistory', {en:[], de: []})
      const firstMsg = this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'bye-bye-1')
      this.$store.commit('addMessage', { message: firstMsg, lang: this.$i18n.locale })
    } else if(this.burned || account.pub === 'burned') {
      this.$store.commit('setChatStarted', true)
      this.$store.commit('setChatHistory', {en: [], de: []})
      const intro = Object.assign({}, this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'intro'))
      delete intro.next
      this.$store.commit('addMessage', { message: intro, lang: this.$i18n.locale })

      const welcome = Object.assign({}, this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'welcome-2'))
      welcome.next = "ape-coin-usage"
      this.$store.commit('addMessage', { message: welcome, lang: this.$i18n.locale })
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
<style lang="css">
.app-chat-area {
  @apply h-full w-full pt-20 pl-6 pr-6;
  @apply bg-white text-black;
  @apply overflow-x-hidden overflow-y-auto;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
