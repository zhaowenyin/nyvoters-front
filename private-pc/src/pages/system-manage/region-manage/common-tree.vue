<template>
  <el-cascader
  size="medium"
  style="width: 100%;"
  expand-trigger="hover"
  v-bind="[$attrs, $props]"
  v-on="$listeners"
  filterable
  change-on-select
  v-model="val">
</el-cascader>
</template>
<script>

export default {
  props: {
    options: {
      default: () => [],
      type: Array
    },
    props: {
      default: () => {
        return {
          children: 'children',
          label: 'name',
          value: 'id'
        }
      },
      type: Object,
    },
    value: {
      default: () => [],
      type: Array
    },

  },
  data () {
    return {
      val: ''
    }
  },
  computed: {

  },
  watch: {
    val(val) {
      this.$emit('input', val)
    }
  },
  components: {
  },
  created () {
    this.val = this.value
  },
  methods: {

  }
}
</script>
<style scoped>

</style>
