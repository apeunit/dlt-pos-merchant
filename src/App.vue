<template>
  <div id="app" class="h-screen">
    <Header></Header>
    <router-view class="h-full overflow-x-hidden py-16"></router-view>
    <Navigation></Navigation>
  </div>
</template>

<script>
import { AeHeader, AeButton } from '@aeternity/aepp-components'
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'

export default {
  name: 'app',
  components: {
    AeHeader,
    AeButton,
    Header,
    Navigation
  },
  computed: {
    account () {
      return this.$store.state.account
    }
  },
  methods: {
  },
  mounted () {
    this.$store.dispatch('updateBalance')
    setInterval(() => {
      this.$store.dispatch('updateBalance')
    }, 10000)
  }
}
</script>

<style lang="css">
</style>
