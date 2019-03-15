<template>
  <div class="absolute pin-b pin-l w-full flex">
    <button @click="triggerSmt" class="w-1/3 flex items-align-center bg-black text-white text-center py-4 rounded-full">
      order
    </button>
    <button @click="triggerSmt" class="w-1/3 flex items-align-center bg-black text-white text-center py-4 rounded-full">
      transfer
    </button>
    <button @click="triggerSmt" class="w-1/3 flex items-align-center bg-black text-white text-center py-4 rounded-full">
      receive
    </button>
  </div>
</template>
<script>
  export default {
    name: 'Navigation',
    data () {
      return {

      }
    },
    methods: {
      triggerSmt () {
        this.$store.commit('addMessage', { id: Math.random().toString(36).substring(7), content: 'wiiiii' })
      }
    }
  }
</script>
<style lang="scss">
</style>
