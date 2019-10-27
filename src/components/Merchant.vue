<template>
  <div>
    <logout-button @handle-click="logout"/>
    <div class="body">
      <text-component :msg="greeting" id="showcase-greeting"/>
      <router-view/>
      <span v-if="!loggedIn">
        <mnemonic @on-change="handleInput"/>
      </span>
      <span v-else-if="loggedIn">
        <action-buttons :button-labels="buttonLabels"/>
      </span>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import LogoutButton from './merchant/LogoutButton.vue'
  import TextComponent from './merchant/TextComponent.vue'
  import ActionButtons from './merchant/ActionButtons.vue'
  import Mnemonic from './merchant/Mnemonic.vue'
  export default {
    name: 'Merchant',
    components: {
      ActionButtons,
      LogoutButton,
      TextComponent,
      Mnemonic
    },
    data() {
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
      handleClick(e) {
        console.log(e, 'was clicked') // route || component to be triggered
      },
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
  div.body {
    width: 375px;
    height: 100%;
    padding-left: 46px;
    padding-right: 62px;
    margin: 0 auto;
    border: 1px solid black;
  }
  #showcase-greeting {
    height: 248px;
    width: 267px;
    /*color: #FFFFFF;*/
    font-size: 40px;
    line-height: 47px;
  }
  .action-button {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
</style>
