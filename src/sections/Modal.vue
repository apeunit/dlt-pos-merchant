<template>
  <div class="app-modal-backdrop" :class="[{ open }]">
    <div class="app-modal">
      <header>
        <button @click.prevent="close" class="app-modal-close" type="button">
          <svg width="15px" height="14px" viewBox="0 0 15 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="App" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-family="NeufileGrotesk-MediumExtended, Neufile Grotesk" font-size="24" font-style="expanded" font-weight="500">
              <g id="icecream-transfer-3" transform="translate(-330.000000, -433.000000)" fill="#FFFFFF">
                <text id="×">
                  <tspan x="329.32" y="447">×</tspan>
                </text>
              </g>
            </g>
          </svg>
        </button>
      </header>
      <input class="app-modal-input" v-model="accountName" type="text" placeholder="Unique Name or address">
      <footer>
        <ae-identity-avatar
          class="app-modal-identicon"
          :address="account.pub"
        />
        <button class="app-modal-button" @click="checkAddress">
          Go
        </button>
      </footer>
    </div>
  </div>
</template>
<script>
import { AeIdentityAvatar } from '@aeternity/aepp-components'

export default {
  name: 'Modal',
  components: {
    AeIdentityAvatar
  },
  data () {
    return {
      accountName: '',
      error: 'Invalid Name',
      showError: true
    }
  },
  computed: {
    open () {
      this.accountName = ''
      return this.$store.state.modalOpened
    },
    account () {
      return '';
    },
    chatMessagesList () {
      return this.$store.getters.chatMessagesList
    }
  },
  methods: {
    close () {
      this.accountName = ''
      this.$store.commit('setModalOpened', false)
    },
    async checkAddress () {
      if(this.accountName && this.accountName != '') {
        const receiver = await this.$store.dispatch('getPubkeyByName', { name: this.accountName })
        if(receiver){
          this.showError = false
          this.$store.commit('setScanQR', receiver)
          let message = Object.assign({}, this.chatMessagesList[this.$i18n.locale].find(o => o.id === 'transfer-input-user'))
          message.content = message.content.replace('xxx', this.accountName)
          this.$store.commit('addMessage', { message, lang: this.$i18n.locale })
          this.close()
        } else {
          alert('wrong name')
          this.showError = true
        }
      }
    }
  }
}
</script>
<style lang="css" scoped>
.app-modal-backdrop {
  @apply hidden;
  @apply fixed pin;
  @apply h-screen;
  @apply overflow-hidden;
  @apply z-50;

  background: rgba(0, 0, 0, 0.3);
}

.app-modal-backdrop.open {
  @apply block;
  @apply visible;
}

.app-modal {
  @apply flex flex-col;
  @apply absolute pin-b;
  @apply w-full pl-8 pr-8 pb-8;
  @apply bg-black;
}

.app-modal > header,
.app-modal > footer {
  @apply flex;
  @apply justify-between;
  @apply items-center;
}

.app-modal > header {
  @apply justify-end;
  @apply pt-4 pb-4;
}

.app-modal-close {
  @apply
  pt-3
  pl-5
  pr-5
  pb-3
  w-auto
  text-base
  tracking-wide
  cursor-pointer;

  outline: none;
}

.app-modal-input {
  @apply text-white;
  @apply text-2xl;
  @apply bg-transparent;
  @apply mb-8;
  @apply h-12;

  outline: none;
}

.app-modal-input:focus,
.app-modal-input:hover {
  outline: none;
}

.app-modal-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.app-modal-button {
  @apply
  rounded-full
  font-sans
  pt-3
  pl-5
  pr-5
  pb-3
  w-auto
  text-base
  tracking-wide
  text-right
  cursor-pointer
  bg-white
  text-black
  border-2
  border-black;
}

.app-modal-button[disabled] {
  @apply text-grey-dark;
  @apply cursor-not-allowed;
}

.app-modal-identicon {
  @apply w-8 h-8 !important;
}
</style>
