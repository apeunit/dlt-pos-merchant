<template>
  <div>
    <logout-button @handle-click="logout"/>
    <text-component :msg="greeting" id="showcase-greeting"/>
    <router-view/>
    <span v-if="!loggedIn">
        <mnemonic @on-change="handleInput"/>
      </span>
    <span v-else-if="loggedIn">
        <action-buttons :button-labels="buttonLabels" class="button-group"/>
      </span>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import TextComponent from './TextComponent.vue'
  import ActionButtons from './ActionButtons.vue'
  import Mnemonic from './Mnemonic.vue'
  import LogoutButton from './LogoutButton.vue'
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
        loggedIn: true,
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
        console.log(e)
        this.mnemonic = e // mnemonic to be verified via vuex
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
  #showcase-greeting {
    height: 248px;
    width: 267px;
    /*color: #FFFFFF;*/
    font-size: 40px;
    line-height: 47px;
    margin-top: 24px;
  }
  .button-group {
    margin-top: 241px;
  }
</style>
