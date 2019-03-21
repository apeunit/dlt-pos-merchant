<template>
  <div class="header">
    <div class="w-full pin-t fixed bg-black text-white shell flex flex-wrap border-b-1 justify-end">
      <div class="container flex px-4">
        <div class="w-1/2 flex">
          <router-link to="/" class="self-center text-white no-underline font-sans-medium">
            Ape Unit
          </router-link>
        </div>
        <div class="w-1/2 flex justify-end align-middle">
          <div class="text-right self-center font-sans text-sm mr-4">
            4 Ape Coins
          </div>
          <ae-identity-avatar :address="account.pub"></ae-identity-avatar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AeIdentityAvatar } from '@aeternity/aepp-components'

export default {
  name: 'Header',
  components: {
    AeIdentityAvatar
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
