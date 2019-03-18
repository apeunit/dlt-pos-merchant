<template>
  <div>
    <p v-html="content"></p>
    <div>
      <button v-bind:key="key"
              v-for="(button, key) in buttons"
              @click="messagesListByIdandSend(button.action, $event)"
              class="bg-black text-white rounded-full px-4 py-2">
        {{ button.title }}
      </button>
      {{this.chatMessagesList}}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ChatMessage',
    props: [
      'content',
      'buttons'
    ],
    data () {
      return {

      }
    },
    computed: {
      chatMessagesList () {
        return this.$store.getters.chatMessagesList
      },
      currentLang () {
        return this.$store.getters.currentLang
      }
    },
    methods: {
      messagesListByIdandSend (action, evt) {
        alert(`get message ID: ${action}`)
        console.log('MESSAGES LIST: ', this.chatMessagesList)
        const msg = this.chatMessagesList[this.currentLang()].find(o => o.action === action)
        console.log('Message:', msg)
        // const msg = this.messagesListById({ action: action, lang: this.currentLang() })
        // this.sendMsg(msg, evt)
      },
      sendMsg (msg, evt) {
        console.log(evt)
        this.$store.commit('addMessage', { message: msg, lang: this.currentLang })
        evt.target.parentNode.classList.toggle('invisible')
      }
    },
    mounted () {
      console.log('Mounted: message component has been mounted')
    }
  }
</script>
<style lang="scss">
</style>
