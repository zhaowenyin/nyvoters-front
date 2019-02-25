<script>
export default {
  props: {
    list: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {

    }
  },
  created () {
  },
  computed: {
    activeIndex () {
      return this.$route.path
    }
  },
  methods: {
    change (index) {
      this.$router.push({ path: index })
    },
    childRender (list) {
      return list.map(obj => {
        if (obj.children && obj.children.length > 0) {
          return (
            <el-submenu index={obj.value}>
              <template slot="title">
                <i class={['common', `icon-${obj.menuId}`]}></i>
                <span>{obj.label}</span>
              </template>
              {this.childRender(obj.children)}
            </el-submenu>
          )
        } else {
          return (
            <el-menu-item
              class="item"
              index={obj.value}>
              <i class={['common', `icon-${obj.menuId}`]}></i>
              {obj.label}
            </el-menu-item>
          )
        }

      })
    }
  },

  render () {
    return (
      <el-menu
        default-active={this.activeIndex}
        background-color="transparent"
        on-select={this.change}
        class="menu">
        {this.childRender(this.list || [])}
      </el-menu>
    )
  }
}
</script>
<style>
  .el-submenu.is-active {
    & .el-submenu__title {
      background: #5DB8C9 !important;
      position: relative;
      &:before {
        content: '';
        width: 22px;
        height: 100%;
        background: linear-gradient(90deg,rgba(255,255,255,1) 0%,rgba(27,236,232,0) 100%);
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    & .el-menu-item.is-active {
      background: #fff !important;
      color: #46B4C8;
      font-weight: bold;
    }
  }
  .el-menu-item.is-active {
    background: #5DB8C9 !important;
  }
  .el-submenu__title {
    color: #fff;
    &:hover {
      background: #23C0D1 !important;
    }
  }

  .el-menu-item.item {
    color: #fff;
    white-space: normal;
    word-break: break-all;
    overflow-wrap: break-word;
    line-height: 20px;
    display: flex;
    align-items: center;
    height: auto;
    min-height: 50px;
    padding: 15px 0 15px 40px;
    &:hover {
      background: #23C0D1 !important;
    }
  }
  .el-menu.el-menu--inline {
    background: #4399A9 !important;
    color: #fff;
    & .el-menu-item.item {
      /*color: #008C9B;*/
      &:hover {
        background: #23C0D1 !important;
      }
      &.is-active:hover {
        background: #ffffff !important;
      }
    }
  }
  .el-submenu__title i {
    color: #fff;
    font-size: 13px;
    font-weight: bold;
  }
  .el-submenu.is-active .icon-service {
    background: url("../assets/img/base-server1.png") center center no-repeat;
  }
  /* 家庭签约 */
  .el-menu-item.is-active .icon-household {
    background: url("../assets/img/home-sign.png") center center no-repeat;
  }
  /* 任务计划 */
  .el-menu-item.is-active .icon-taskplan {
    background: url("../assets/img/task-plan1.png") center center no-repeat;
  }
  /* 审批管理 */
  .el-menu-item.is-active .icon-approve {
    background: url("../assets/img/approve-manage1.png") center center no-repeat;
  }
  /* 医生管理 */
  .el-menu-item.is-active .icon-doctor {
    background: url("../assets/img/doctor-manage1.png") center center no-repeat;
  }
  /* 团队管理 */
  .el-menu-item.is-active .icon-team {
    background: url("../assets/img/team-manage1.png") center center no-repeat;
  }

  .el-submenu.is-active .icon-template {
    background: url("../assets/img/template.png") center center no-repeat;
  }
  .el-submenu.is-active .icon-board {
    background: url("../assets/img/board.png") center center no-repeat;
  }
  .el-submenu.is-active .icon-manage {
    background: url("../assets/img/manage.png") center center no-repeat;
  }
  .el-submenu.is-active .icon-update {
    background: url("../assets/img/update.png") center center no-repeat;
  }
  .el-submenu.is-active .icon-base {
    background: url("../assets/img/base2.png") center center no-repeat;
  }
  /* .el-menu-item.is-active .icon-approve {
    background: url("../assets/img/approve.png") center center no-repeat;
  } */
  .el-menu-item.is-active .icon-home {
    background: url("../assets/img/homepage-cover.png") center center no-repeat;
  }
  .el-submenu.is-active .icon-count {
    background: url("../assets/img/count2.png") center center no-repeat;
  }
  .el-submenu.is-active .icon-task {
    background: url("../assets/img/task2.png") center center no-repeat;
  }

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .common {
    background-size: 100% 100%;
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 5px;
  }
  .icon-service {
    background: url("../assets/img/base-server.png") center center no-repeat;
  }
  /* 家庭签约 */
  .icon-household {
    background: url("../assets/img/home-sign1.png") center center no-repeat;
  }
  /* 任务计划 */
  .icon-taskplan {
    background: url("../assets/img/task-plan.png") center center no-repeat;
  }

   /* 审批管理 */
 .icon-approve {
    background: url("../assets/img/approve-manage.png") center center no-repeat;
  }
  /* 医生管理 */
 .icon-doctor {
    background: url("../assets/img/doctor-manage.png") center center no-repeat;
  }
  /* 团队管理 */
  .icon-team {
    background: url("../assets/img/team-manage.png") center center no-repeat;
  }

  .icon-template {
    background: url("../assets/img/template2.png") center center no-repeat;
  }
  .icon-board {
    background: url("../assets/img/board2.png") center center no-repeat;
  }
  .icon-manage {
    background: url("../assets/img/manage2.png") center center no-repeat;
  }
  .icon-update {
    background: url("../assets/img/update2.png") center center no-repeat;
  }
  .icon-base {
    background: url("../assets/img/base.png") center center no-repeat;
  }
  /* .icon-approve {
    background: url("../assets/img/approve2.png") center center no-repeat;
  } */
  .icon-home {
    background: url("../assets/img/homepage-nor.png") center center no-repeat;
  }
  .icon-count {
    background: url("../assets/img/count.png") center center no-repeat;
  }
  .icon-task {
    background: url("../assets/img/task.png") center center no-repeat;
  }
</style>
