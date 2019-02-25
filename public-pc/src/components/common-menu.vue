<template>
  <div class="menu-wrapper">
    <Menus
      :list="list"
      />
  </div>
</template>

<script>
import { getSession } from '../utils/session'
import Menus from './Menus'
// import * as MenuList from '../pages/login/config'

export default {
  data () {
    const authToken = getSession()
    return {
      list: authToken.list
    }
  },
  computed: {
  },
  components: {
    Menus
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menu-wrapper{
    height: 100%;
    width: 195px;
    background-color: #f4f4f4;
  }
</style>
