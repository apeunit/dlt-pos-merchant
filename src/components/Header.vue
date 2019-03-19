<template>
  <div class="header">
    <div class="w-full pin-t fixed bg-black text-white shell flex border-b-1 justify-end">
      <div class="w-1/2 flex">
        <router-link to="/" class="self-center">
          <Logo></Logo>
        </router-link>
      </div>
      <div class="w-1/2 flex justify-around align-middle">
        <h4 class="text-right self-center">
          {{balance}} Ape Coins
        </h4>
        <ae-identity-avatar :address="account.pub"></ae-identity-avatar>
      </div>
    </div>
  </div>
</template>
<script>
import { AeIdentityAvatar } from '@aeternity/aepp-components'
import Logo from './Logo.vue'
export default {
  name: 'Header',
  components: {
    AeIdentityAvatar,
    Logo
  },
  data () {
    return {
      address: this.$store.state.account.pub
    }
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    balance () {
      return this.$store.state.balance
    }
  },
  mounted () {
  }
}
</script>
<style lang="css">

</style>
