<template>
  <div class="header" v-bind:class="{fixedPos: isOrdersActive}">
    <div class="w-full pin-t fixed bg-white shell flex border-b-1 border-black">
      <div class="back-arrow"
      v-if="$route.path =='/about' || $route.path =='/orders' || $route.path =='/impressum'">
        <router-link to='/more'>
          <ae-icon name="chevron" rotate="180" />
        </router-link>
      </div>
      <div class="w-1/2 flex items-center">
        <!-- <ae-identity-avatar :address='account.pub'></ae-identity-avatar> -->
        <ae-identity-avatar :address="account.pub"></ae-identity-avatar>
        <span>
          {{account.name}}
        </span>
      </div>
      <div class="w-1/2 flex items-center">
        <h4 class="text-right">
          {{balance}} Ape Coins
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
import { AeIdentityAvatar, AeIcon } from '@aeternity/aepp-components'
export default {
  name: 'Header',
  components: {
    AeIdentityAvatar,
    AeIcon
  },
  data () {
    return {
      address: this.$store.state.account.pub
      // isOrdersActive: false
    }
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    balance () {
      return this.$store.state.balance
    },
    isOrdersActive () {
      // let morePath = $route.path
      if (this.$route.path === '/orders') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="css">

</style>
