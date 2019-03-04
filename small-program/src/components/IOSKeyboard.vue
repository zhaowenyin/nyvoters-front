<template>
  <div
    v-if="isIOS"
    class="empty" />
</template>
<script>

export default {
  data () {
    return {
    }
  },
  computed: {
    isIOS () {
      console.log(navigator.userAgent.indexOf('iPhone'))
      return navigator.userAgent.indexOf('iPhone') !== -1
    }
  },
  components: {
  },
  created () {
  },
  methods: {
  }
}
</script>
<style scoped>
.empty{
  height: 320px;
}
</style>
