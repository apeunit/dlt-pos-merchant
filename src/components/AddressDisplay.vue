<template>
  <div class="addressDisplay shell">
    <h1 class="screen-title">Receive Tokens</h1>
    <p class="screen-subtitle">
      Show this QR Code to receive tokens.<br>
      (If people really like you, you may use this screen a lot!)
    </p>
    <qrcode :value="account.pub" :options="{ size: 300 }"></qrcode>
  </div>
</template>

<script>
import { AeButton, AeAddress, AeAmountInput } from '@aeternity/aepp-components'

export default {
  name: 'AddressDisplay',
  components: {
    AeButton,
    AeAddress,
    AeAmountInput
  },
  data () {
    return {
    }
  },
  computed: {
    account () {
      return this.$store.state.account
    }
  },
  methods: {
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
.addressDisplay {
  text-align: left;
}
.addressDisplay canvas {
  width: 85%;
  display: flex;
  margin: 0 auto;
  margin-bottom:20vh;
}
</style>
