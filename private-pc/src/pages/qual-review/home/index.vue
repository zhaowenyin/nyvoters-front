<template>
  <div class="box">
   <Search @lookDetail="lookDetail"/>
    <List @lookDetail="lookDetail"/>
    <CreateDialog
      v-if="createDialogVisible"
      :item='item'
      :isDisabled="isDisabled"
      :visible.sync='createDialogVisible'
    />
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Search from './Search'
import List from './List'
import CreateDialog from './CreateDialog'

export default {
  data () {
    return {
      item: {},
      createDialogVisible: false,
      isDisabled: false
    }
  },
  computed: {

  },
  components: {
    Search,
    List,
    CreateDialog
  },
  created () {
    // 初始化清除数据
    this.clearState()
  },
  methods: {
    ...mapMutations('qualReview', [
      'clearState'
    ]),
    lookDetail (val) {
      this.item = val.val
      this.createDialogVisible = true
      this.isDisabled = val.isDisabled
    }
  }
}
</script>
<style scoped>
  .box{
    padding-top: 16px;
  }
</style>
