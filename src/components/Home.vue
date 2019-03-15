<template>
  <div class="home shell">
    <div v-if="account && account.pub">
      <div class="text-center">
        <div class="logo">
          <Logo></Logo>
        </div>
        <p class="py-4">
          +
        </p>
        <h1>
          HANNOVER MESSE 2019
        </h1>
        <p class="pb-12">
          {{ $t("message.hello") }}
        </p>
        <router-link to="start" class="rounded-full bg-black text-white py-2 px-8 no-underline">
          Give me tokens for beer!
        </router-link>
      </div>
    </div>
    <div v-else>
      <span>You are not logged in. Please visit this by opening the provided short url</span>
    </div>
  </div>
</template>

<script>
import Logo from './Logo.vue'

export default {
  name: 'Home',
  components: {
    Logo
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    balance () {
      return this.$store.state.balance
    },
    itemPrice () {
      return this.$store.state.itemPrice
    },
    beerHashes () {
      return this.$store.state.beerHashes
    }
  },
  data () {
    return {
    }
  },
  props: {
    query: {
      type: Object
    }
  },
  methods: {
  },
  async mounted () {
  }
}
</script>

<style lang="css">
</style>
