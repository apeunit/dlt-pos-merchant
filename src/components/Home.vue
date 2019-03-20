<template>
  <div class="home shell flex justify-center">
    <div v-if="account && account.pub" class="flex items-center w-64">
      <div class="text-center flex flex-col self-center w-64">
        <div class="logo">
          <router-link to="/">
            <Logo></Logo>
          </router-link>
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
        <locale-switch/>
        <router-link to="start" class="flex self-center rounded-full bg-black text-white py-2 px-8 no-underline block w-64">
          Give me tokens for beer!
        </router-link>
      </div>
    </div>
    <div v-else>
      <span>Getting account...</span>
    </div>
  </div>
</template>

<script>
import Logo from './Logo.vue'
import LocaleSwitch from './LocaleSwitch.vue'
export default {
  name: 'Home',
  components: {
    Logo,
    LocaleSwitch
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
