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
      console.log(content)
      this.$store.commit('setScanQR', content)
      this.$router.push({ path: `/` })
      if (this.isValidAddress(content)) {
        this.receiver = content
        this.state = 'input'
      } else if (/^https?:\/\/aet\.li/.test(content)) {
        this.qrWarning = 'Somebody let you scan their private key. This is terrible. Please tell them to navigate to the receive tab in the beer app.'
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
      const regex = /^(\w+.(aet|test)|ak_[123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]{94})$/i
      return regex.test(value)
    },
    async lookupDomain () {
      this.domainError = null
      let domain = this.domainInput.toLowerCase().trim()
      if (!domain.endsWith('.test')) {
        domain += '.test'
      }
      try {
        const domainData = await this.client.aensQuery(domain)
        if (!domainData) {
          this.domainError = 'Domain not found. Check for typos'
        }
        if (domainData && domainData.pointers && typeof domainData.pointers === 'string') {
          domainData.pointers = JSON.parse(domainData.pointers)
        }
        console.log('domainData', domainData)
        if (domainData.pointers && domainData.pointers.account_pubkey) {
          this.receiver = domainData.pointers.account_pubkey
          this.state = 'input'
        }
      } catch (err) {
        console.log(err)
        this.domainError = 'Domain lookup error. ' + err.message
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('updateBalance')
    this.startQrCode()
  }
}
</script>
