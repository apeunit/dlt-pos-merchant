<template>
  <div>
    <logout-button @handle-click="logout"/>
    <div class="body">
      <text-component :msg="greeting" id="showcase-greeting"/>
      <input-component @on-change="handleInput"/>
      <div class="action-buttons">
        <span v-for="label in buttonLabels" :key="label.key" class="action-button">
        <action-button :button-label="label" @handle-click="handleClick"/>
      </span>
      </div>
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
