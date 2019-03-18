<template>
  <div v-html="content">
  </div>
</template>
<script>
  export default {
    name: 'ChatMessage',
    props: [
      'content'
    ],
    data () {
      return {

      }
    },
    methods: {
    },
    mounted () {
      console.log('Mounted: message component has been mounted')
    }
  }
</script>
<style lang="scss">
</style>
