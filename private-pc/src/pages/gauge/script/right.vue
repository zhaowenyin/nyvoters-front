<template>
  <div>
    <h3>预览扫描二维码</h3>
    <QrcodeVue v-if="url" :value="url" :size="100" level="L"/>
    <p v-else>请保存后查看二维码</p>
  </div>
</template>
<script>
import QrcodeVue from '../../../components/qrcode/index'
import { mapState } from 'vuex'
export default {
  components: {
    QrcodeVue
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('gauge', {
      saveData: state => state.saveData
    }),
    url () {
      const {saveData} = this
      const {id} = saveData
      if (id) {
        return `http://www.baidu.com`
      } else {
        return ''
      }
    }
  }
}
</script>
<style scoped>
  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }
</style>
