<template>
  <div class="behalf">
      <Search
      @lookDetail="lookDetail"
      />
      <List
      @lookDetail="lookDetail"/>
      <CreateDialog
      v-if="createDialogVisible"
      :item='item'
      :isDisabled="isDisabled"
      :visible.sync='createDialogVisible'
      />
  </div>
</template>
<script>
import CreateDialog from './CreateDialog'
import { mapMutations } from 'vuex'
import Search from './Search'
import List from './List'

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
    ...mapMutations('behalfCommended', [
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
  .behalf{
    background: #f8f8f8;
    padding: 16px 20px;
  }
</style>
