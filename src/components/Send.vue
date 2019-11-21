<template>
  <div class="scan-qr">
<!--    <go-back>Conversations</go-back>-->
    <div class="bg-black text-white pb-8 pt-8">
      <div class="container flex flex-col px-4 text-28 font-sans leading-normal">
        Scan QR Code
      </div>
    </div>
    <div class="container flex flex-wrap leading-normal pt-8 pb-8">
      <div class="send w-screen">
        <div v-if="state === 'qrcode'" class="shell">
          <div class="loader" v-if="loading">
            Loading...
          </div>
          <div class="qr-warning" v-if="qrWarning">{{qrWarning}}</div>
          <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GoBack from "./GoBack.vue";
import ArrowRight from './ArrowRight.vue'
import { QrcodeStream } from "vue-qrcode-reader";
import merchantContract from '../../contract/merchant'

export default {
  name: "Send",
  components: {
    QrcodeStream,
    ArrowRight,
    GoBack
  },
  data() {
    return {
      state: "input",
      loading: true,
      hasCamera: true,
      qrWarning: null,
      domainError: null,
      modalVisible: false
    };
  },
  methods: {
    async onDecode(content) {
        debugger
      // Make a fake transaction
      const buyIceCreamTx = await this.$store.state.ae.spend(10000, await this.$store.state.ae.address())
        debugger
      const txHashSignature = this.$store.state.ae.sign(txHash)
      // Extract txHash and signature from qrCode
      const txHash = ''
      const signature = ''
      try {
          // Create contract instance
          const cInstance = await this.$store.state.ae.getContractInstance(merchantContract, { contractAddress: 'ct_WbMSB4FySwzJhCmNsDjxm5P7nefMJGdzuoxc3VfUhzsTyvta2' })
          const { tx: { senderId: customerAddress }} = await this.$store.state.ae.tx(txHash)
          // Call the contract
          const fulfillOrderResult = await cInstance.methods.fulfill_order(customerAddress, txHash, signature)
          this.$emit('onFinish', fulfillOrderResult)
      } catch (e) {
        console.log(e)
          alert('Oops. Something went wrong, please check the dev console for details')
      }
    },
    async onInit(promise) {
      console.log("onInit");
      try {
        await promise;
        this.hasCamera = true;
      } catch (e) {
        console.log(e);
        this.hasCamera = false;
        this.state = "input";
      } finally {
        // hide loader
        this.loading = false;
      }
    },
    startQrCode() {
      this.state = "qrcode";
      this.loading = true;
    },
    isValidAddress(value) {
      const regex = /(ak_[1-9A-HJ-NP-Za-km-z]{48,51})/;
      return regex.test(value);
    }
  },
  async mounted() {
    // await this.$store.dispatch("updateBalance");
    this.startQrCode();
  }
};
</script>

<style lang="css">
.scan-qr {
  @apply bg-white text-black;
}
</style>
