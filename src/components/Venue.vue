<template>
  <div class="about">
    <go-back>Ape Unit</go-back>
    <div class="bg-black text-white p-8">
      <img :src="require('../assets/location.png')" alt="Find us in Halle 6 In the Berlin Partners booth, E39.">
    </div>
    <div class="container flex flex-wrap px-4 leading-normal pt-8 pb-8">

      <p class="text-28 font-sans leading-normal">
        Find us in Halle 6 🖐☝️<br/>
        In the Berlin Partners booth, E39.
      </p>

      <div class="list-reset w-full mt-8">
        <a href="https://goo.gl/Dehkdt" target="_blank" rel="noopener" class="text-28 font-sans flex justify-between no-underline text-black">
          <span>Navigate in Maps</span>
          <ArrowRight class=""/>
        </a>
      </div>

      <div class="font-sans mt-4">
        <p class="py-4">
          Messegelände<br/>
          30521 Hannover<br/>
          Germany<br/>
        </p>
        <p class="py-4">
          1st until 5th of April 2019<br/>
          Daily from 12:00<br/>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import ArrowRight from './ArrowRight.vue'
import GoBack from './GoBack.vue'

export default {
  name: 'About',
  components: {
    ArrowRight,
    GoBack
  },
  data () {
    return {

    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>
