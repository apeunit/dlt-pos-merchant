<template>
  <div class="header">
    <router-link class="header-logo" to="/about">
      Ape Unit
    </router-link>
    <router-link class="header-account" to="/profile">
      <span>{{ balance }} Ape Coins</span>
      <ae-identity-avatar class="w-4" :address="account.pub" />
    </router-link>
  </div>
</template>
<script>
import formatUnit from '../filters'

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
      return formatUnit(this.$store.state.balance)
    }
  }
}
</script>
<style lang="css" scoped>
.header {
  @apply fixed pin-t;
  @apply flex items-center content-center justify-between;
  @apply pl-6 pr-6;
  @apply w-full;
  @apply bg-black;

  height: 58px;
}

.header-logo {
  @apply text-white no-underline font-sans-medium;
}

.header-account {
  @apply text-right font-sans text-sm text-white no-underline;
}

.header-account > span {
  @apply mr-2;
}

.header-account > canvas {
  @apply w-8 h-8 !important;
}
</style>
