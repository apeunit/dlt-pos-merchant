<template>
  <div id="app" class="h-screen">
    <Header></Header>
    <router-view class="h-full overflow-x-hidden"></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    Header
  },
  computed: {
    account () {
      return this.$store.state.account
    }
  },
  methods: {
  },
  mounted () {
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

<style lang="css">
</style>
