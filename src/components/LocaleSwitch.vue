<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'LocaleSwitch',
  watch: {
    '$i18n.locale': function (newVal, old) {
      this.$store.commit('setCurrentLang', newVal)
    }
  },
  data () {
    return { langs: ['de', 'en'] }
  }
}
</script>
