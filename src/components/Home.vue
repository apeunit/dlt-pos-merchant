<template>
  <div class="home shell">
    <div v-if="account && account.pub">
      <div class="logo">
        <Logo></Logo>
      </div>
      <div class="cross">
        <p class="center">
          +
        </p>
      </div>
      <div class="title">
        <h1>
          HANNOVER MESSE 2019
        </h1>
      </div>
      <div class="bg-purple text-white sm:bg-green md:bg-blue md:text-yellow lg:bg-red xl:bg-orange ...">
        Test
      </div>
      <div class="intro-text">
        <p style="padding:2vw;">
          æternity is an open source blockchain that builds on decentralized cryptographic P2P technology.
        </p>
        <p style="padding:2vw;">
          We want to start a decentralized
          digital revolution. But first we want
          to give you beer.
        </p>
      </div>
      <div class="action">
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
