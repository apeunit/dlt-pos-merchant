<template>
  <div class="about">
    <div class="bg-black text-white pb-8 pt-32">
      <div class="container flex px-4 text-28 font-sans leading-normal">
        We are Ape Unit — an interdisciplinary tech hub in Berlin 🦍
      </div>
    </div>
    <div class="container flex flex-wrap px-4 leading-normal pt-8 pb-8">

      <p class="text-28 font-sans leading-normal">
      {{title}} We are giving away free ice cream🍦through blockchain technology ⛓. Visit us in Halle 6
      </p>

      <div class="list-reset w-full mt-8">
        <router-link to="/venue" class="text-28 font-sans flex justify-between no-underline text-black">
          <span>
            Find our bar
          </span>
          <ArrowRight class=""/>
        </router-link>
        <a href="https://apeunit.com" target="_blank" rel="noopener" class="text-28 font-sans flex justify-between no-underline text-black">
          <span>apeunit.com</span>
          <ArrowRight class=""/>
        </a>
      </div>

      <div class="font-sans mt-4">
        <p class="py-4">
          Our work is filled with curiosity. We like to identify opportunities, to excite and to embrace that feeling of wonder which sparks action.
        </p>
        <p class="py-4">
          Our mission is to create and accelerate — to improve services and businesses with ground-breaking technology and new forms of engagement. We thrive when we can cultivate long-term relationships.
        </p>
        <p class="py-4">
          Get in touch »<br/>
          <a href="mailto:office@apeunit.com" target="_blank" rel="noopener" class="no-underline text-black">
            office@apeunit.com
          </a><br/>
          +49 30 306 490 10
        </p>
        <p class="py-4">
          Ape Unit GmbH<br/>
          Waldemarstr. 38<br/>
          Aufgang 2, 4. OG<br/>
          10999 Berlin<br/>
          Deutschland<br/>
        </p>
        <p class="py-4">
          🦍
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import ArrowRight from './ArrowRight.vue'

export default {
  name: 'About',
  props: [
    'back',
    'title',
    'where'
  ],
  components: {
    ArrowRight
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
