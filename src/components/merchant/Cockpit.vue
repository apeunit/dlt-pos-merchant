<template>
  <div>
    <text-component :msg="greeting" id="showcase-greeting"/>
    <router-view/>
    <span v-if="!loggedIn">
        <mnemonic @on-change="handleInput"/>
      </span>
    <span v-else-if="loggedIn">
        <action-buttons :button-labels="buttonLabels"/>
      </span>
  </div>
</template>
<script>
  import TextComponent from './TextComponent.vue'
  import ActionButtons from './ActionButtons.vue'
  import Mnemonic from './Mnemonic.vue'
  export default  {
    name: 'Cockpit',
    components: {
      ActionButtons,
      TextComponent,
      Mnemonic
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
      handleInput(e) {
        console.log(e)
        this.mnemonic = e // mnemonic to be verified via vuex
      },
    }
  }
</script>
