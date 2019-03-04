<template>
  <div class="view">
    <CommonHeader
      :back="onBack"
      :title="$route.query.title || ''"/>
    <div class="html-box add-html-box">
      <div
        v-html="html"/>
    </div>
  </div>
</template>
<script>
import CommonHeader from '../../../components/CommonHeader'
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  components: {
    CommonHeader
  },
  created () {
  },
  watch: {
  },
  computed: {
    ...mapState('task', {
      taskList: state => state.taskList
    }),
    html () {
      const { id } = this.$route.query
      for (let obj of this.taskList) {
        for (let obj2 of obj) {
          if (obj2.frontend_id === id) {
            return obj2.question.html
          }
        }
      }
      return null
    }
  },
  methods: {
    onBack () {
      this.$router.go(-1)
    },
  }
}
</script>
<style>
  .add-html-box{
    & img {
      max-width: 100%;
    }
  }
</style>
<style scoped>
  .view{
    display: flex;
    flex-direction: column;
    background: #f2f2f2;
    height: 100%;
  }
  .html-box{
    margin-top: 8px;
    padding: 12px 18px;
    background: #fff;
  }
</style>
