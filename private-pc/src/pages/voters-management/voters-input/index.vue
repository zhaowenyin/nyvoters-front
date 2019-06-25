<template>
  <div class="view">
    <div class="view-content">
      <Search />
      <List
      @lookDetail="lookDetail"/>
      <CreateDialog
      v-if="createDialogVisible"
      :item='item'
      :isDisabled="isDisabled"
      :visible.sync='createDialogVisible'
      />
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Search from './Search'
import List from './List'
import CreateDialog from '../../voter-register/CreateDialog'

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
    ...mapMutations('votersInput', [
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
  .view{
    display: flex;
  }
  .view-left {
    width: 270px;
    background-color: #ffffff;
    border-right: 1px solid #ddd;
    height: 100%;
    overflow: auto;
    padding-top: 6px;
  }
  .view-content {
    background: #f8f8f8;
    flex: 1;
    padding: 16px 20px;
    overflow: auto;
  }
</style>
