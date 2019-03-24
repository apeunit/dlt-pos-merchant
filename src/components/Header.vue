<template>
  <div class="header">
    <div class="w-full pin-t fixed bg-black text-white shell flex flex-wrap justify-end">
      <div class="container flex px-2">
        <div class="w-1/2 flex">
          <router-link  to="/about" class="self-center text-white no-underline font-sans-medium">
            Ape Unit
          </router-link>
        </div>
        <div class="w-1/2 flex justify-end align-middle">
          <router-link  to="/profile" class="text-right self-center font-sans text-sm text-white no-underline">
            <span class="mr-4">{{ balance }} Ape Coins</span>
            <ae-identity-avatar :address="account.pub"></ae-identity-avatar>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AeIdentityAvatar } from '@aeternity/aepp-components'
import formatUnit from '../filters'

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
      return formatUnit(this.$store.state.balance)
    }
  },
  mounted () {
  }
}
</script>
