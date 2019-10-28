<template>
  <div id="app" class="relative h-screen">
<!--    <router-view name="header" />-->
    <router-view class="h-full overflow-x-hidden" />
  </div>
</template>
<script>
import Modal from './sections/Modal.vue'
import { Crypto } from '@aeternity/aepp-sdk/es'

export default {
  name: 'app',
  components: {
    Modal
  },
  computed: {
    account () {
      return this.$store.state.account
    }
  },
  methods: {},
  async mounted () {
    const keyPair = await Crypto.generateKeyPair()
    console.log(keyPair)
    await this.$store.commit('setAccount', { pub: 'ak_tmxaxYsUEMNKFfH12dDZ7jKZV7hoVzMy7wZFCSad3ndhyCt5C', priv: `45a786556a9dd030a9850f5f89ae590986cc43a7c5a82b7abee6deccf2a9f8d1758fd20ed55e9782c555944de207ac08943e0cf8f1af5922641c9af983b7afa9`, name: 'hello'})
    // await this.$store.commit('setAccount',
    //   { pub: keyPair.publicKey, priv: keyPair.secretKey, name: 'hello' }
    // )
    console.log('account is ',this.$store.state.account)
    // update balance after 5sec (wait for 'initAe' in store)
    setTimeout(() => {
      this.$store.dispatch('updateBalance')
    }, 5000);
    // update balance every 10sec (poll)
    setInterval(() => {
      this.$store.dispatch('updateBalance')
    }, 10000)
  }
}
</script>
<style lang="css"></style>
