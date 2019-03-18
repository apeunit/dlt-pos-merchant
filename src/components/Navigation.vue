<template>
  <div class="absolute pin-b pin-l w-full flex">
    <button @click="addMessage" class="w-1/3 flex items-align-center bg-black text-white text-center py-4 rounded-full">
      order
    </button>
    <button @click="addMessage" class="w-1/3 flex items-align-center bg-black text-white text-center py-4 rounded-full">
      transfer
    </button>
    <button @click="addMessage" class="w-1/3 flex items-align-center bg-black text-white text-center py-4 rounded-full">
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
      addMessage () {
        const randomHash = Math.random().toString(36).substring(7)

        const enMsg = { id: randomHash, content: 'EN message', from: 'user' }
        this.$store.commit('addMessage', { message: enMsg, lang: 'en' })

        const deMsg = { id: randomHash, content: 'DE message', from: 'user' }
        this.$store.commit('addMessage', { message: deMsg, lang: 'de' })
      }
    }
  }
</script>
<style lang="scss">
</style>
