<template>
  <div class="send">
    <div v-if="state === 'qrcode'" class="shell">
      <h1 class="screen-title" style="margin-top:10vh;">
        Scan QR Code
      </h1>
      <div class="loader" v-if="loading">
        <ae-loader></ae-loader> Loading
      </div>
      <div class="qr-warning" v-if="qrWarning">
        {{qrWarning}}
      </div>
      <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
    </div>
  </div>
</template>
<script>
import { AeLoader} from '@aeternity/aepp-components'
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'Send',
  components: {
    AeLoader,
    QrcodeStream
  },
  data () {
    return {
      state: 'input',
      loading: true,
      hasCamera: true,
      qrWarning: null,
      domainError: null,
      modalVisible: false
    }
  },
  methods: {
    onDecode (content) {
      // only move forward if addr is valid. no error messages for incorrect qr
      if(this.isValidAddress(content)) {
        this.$store.commit('setScanQR', content)
        this.$router.push({ path: `/` })
      }
    },
    async onInit (promise) {
      console.log('onInit')
      try {
        await promise
        this.hasCamera = true
      } catch (e) {
        console.log(e)
        this.hasCamera = false
        this.state = 'input'
      } finally {
        // hide loader
        this.loading = false
      }
    },
    startQrCode () {
      this.state = 'qrcode'
      this.loading = true
    },
    isValidAddress (value) {
      const regex = /(ak_[1-9A-HJ-NP-Za-km-z]{48,51})/
      return regex.test(value)
    }
  },
  async mounted () {
    await this.$store.dispatch('updateBalance')
    this.startQrCode()
  }
}
</script>
