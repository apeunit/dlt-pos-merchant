<template>
  <div>
    <logout-button @handle-click="logout"/>
    <div class="body">
      <text-component :msg="greeting"/>
      <input-component @on-change="handleInput"/>
      <span v-for="label in buttonLabels" :key="label.key">
        <action-button :button-label="label" @handle-click="handleClick" />
      </span>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import LogoutButton from './merchant/LogoutButton.vue'
  import TextComponent from './merchant/TextComponent.vue'
  import ActionButton from './merchant/ActionButton.vue'
  import InputComponent from './merchant/InputComponent.vue'
  export default {
    name: 'Merchant',
    components: {
      ActionButton,
      LogoutButton,
      TextComponent,
      InputComponent
    },
    data() {
      return {
        msg: 'hello',
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
        this.flushData()
      }
    }
  }
</script>
<style scoped>
  button {
    color: red;
  }
</style>
