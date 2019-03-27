<template>
  <div id="app" class="relative h-screen">
    <Header />
    <router-view name="header" />
    <router-view class="h-full overflow-x-hidden" />
  </div>
</template>
<script>
export default {
  name: 'app',
  computed: {
    account () {
      return this.$store.state.account
    }
  },
  methods: {},
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
<style lang="css"></style>
