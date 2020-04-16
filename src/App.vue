<template>
  <div id="app" class="relative h-screen">
<!--    <router-view name="header" />-->
    <router-view class="h-full overflow-x-hidden" />
  </div>
</template>
<script>
import Modal from './sections/Modal.vue'

export default {
  name: 'app',
  components: {
    Modal
  },
  computed: {
    account () {
      return this.$store.state.account
    }
  },
  methods: {},
  async mounted () {
      const mnemonic = "flash entry cargo escape palm similar tube already dice main issue dutch"
  }
}
</script>
<style lang="css"></style>
