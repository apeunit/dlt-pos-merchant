<template>
  <div class="beerHash shell">
    <div class="noBeerLeft" v-if="!beerAvailable">
      Sorry there currently is no Beer left at the bar
    </div>
    <div>
      <qrcode :value="fullInfo" :options="{ size: 300 }"></qrcode>
    </div>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { sign, verify, decodeBase58Check } from '@aeternity/aepp-sdk/es/utils/crypto.js'
import { encode } from '@aeternity/aepp-sdk/es/tx/builder/helpers.js'

export default {
  name: 'BeerHash',
  props: [
    'bHash'
  ],
  components: {
    VueQrcode
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    fullInfo () {
      // sending as string, for the QR scanning with NETUM bar/qr scanner
      // return this.beerHash + ' ' + this.beerHashSignature
      console.log(this.bHash)
      return this.bHash.hash + ' ' + this.signHash(this.bHash.hash, this.account.priv)
    },
    beerHash () {
      return this.$route.params.beerHash
    },
    beerAvailable () {
      return this.$store.state.barState === 'open'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    signHash (txHash, privateKey) {
      const sig = sign(Buffer.from(txHash), Buffer.from(privateKey, 'hex'))
      const encodedSig = encode(sig, 'sg')
      console.log("signHash encoded", encodedSig)
      return encodedSig
    },
    verifyHash (beerHash, sigBase64, pubKey) {
      // this isnt needed here, just as a poc on how to use verify
      const sigBuffer = Buffer.from(sigBase64, 'base64')
      const hashBuffer = Buffer.from(beerHash)
      const pub = decodeBase58Check(pubKey.split('_')[1])
      const verified = verify(hashBuffer, sigBuffer, pub)
      return verified
    }
  },
  async mounted () {
  }
}
</script>



<style scoped lang="scss">

</style>
