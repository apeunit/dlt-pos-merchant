<template>
  <div>
    <div class="wrapper">
      <text-component :msg="greeting" id="showcase-greeting"/>
      <router-view/>
      <span v-if="!loggedIn">
        <mnemonic
          @on-change="handleInput"
          @on-click="handleClick"
          class="mnemonic"/>
        <logout-button
          @handle-click="logout"
          class="log-out"
        />
      </span>
        <span v-else-if="loggedIn">
        <action-buttons
          :button-labels="buttonLabels"
          class="button-group"/>
      </span>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import TextComponent from './TextComponent.vue'
  import ActionButtons from './ActionButtons.vue'
  import Mnemonic from './Mnemonic.vue'
  import LogoutButton from './LogoutButton.vue'
  import { HdWallet } from '@aeternity/aepp-sdk/es/index'

  export default  {
    name: 'Cockpit',
    components: {
      ActionButtons,
      TextComponent,
      Mnemonic,
      LogoutButton
    },
    data () {
      return {
        loggedIn: false,
        mnemonic: ''
      }
    },
    computed: {
      greeting() {
        return 'Showcase the Merchant App to someone you just met.'
      },
      buttonLabels() {
        return ['Generate Wallet', 'Check Order', 'Top Up Ape Coins']
      }
    },
    methods: {
      ...mapActions(['flushData']),
      handleInput(e) {
        this.mnemonic = e // mnemonic to be verified via vuex
      },
      async handleClick() {
        const hdwallet = HdWallet.generateSaveHDWallet(this.mnemonic, 'test')
        const account = HdWallet.getSaveHDWalletAccounts(hdwallet, 'test', 1)[0]
          // Set account
        await this.$store.commit('setAccount', { pub: account.publicKey, priv: account.secretKey, name: 'merchant'})
        this.loggedIn = true
      },
      logout() {
        console.log('logging out')
        this.loggedIn = false
        this.flushData()
      }
    }
  }
</script>
<style scoped>
  div.wrapper {
    padding-left: 30px;
    padding-right: 45px;
    height: 667px;
    background-color: black;
    color: #FFFFFF;
  }
  #showcase-greeting {
    height: 248px;
    width: 267px;
    font-size: 40px;
    line-height: 47px;
    padding-top: 48px;
    /*margin-top: 24px;*/
  }
  .mnemonic {
    margin-top: 82px;
  }
  .button-group {
    margin-top: 241px;
  }
</style>
