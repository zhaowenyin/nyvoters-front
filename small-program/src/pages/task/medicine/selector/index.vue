<template>
  <div class="all">
    <CommonHeader
    :back="onBack">
      <template slot="title">
        <div class="select">
          <img style=" width: 20px;height: 20px; margin-right:6px;" src="../../../../assets/newVerson-img/icon-search.png" >
          <input class="selectContent" v-model="valueStr"/>
          <img @click="searchClose" style=" width: 20px;height: 20px;" src="../../../../assets/newVerson-img/icon-close.png" >
        </div>
      </template>
    </CommonHeader>
    <ul class="content" v-if="filterList .length >0">
      <li
        :class="['select-item', {selected: i.medicine_id === selectItem.medicine_id}]"
        @click="selectMedicine(i)"
        :key="key"
        v-for="(i,key) in filterList">
        <div
            class="list label">{{ i.medicine_name }}</div>
          <div
            class="list"
            style="width: 18px;"
          >
            <img
              v-if="i.medicine_id === selectItem.medicine_id"
              class="the-img"
              src="../../../../assets/icon-mulselect.png">
          </div>
      </li>
    </ul>
    <div v-if="filterList.length === 0" class="content">
      <div class="prompt">
        暂未搜索到“{{valueStr}}”相关内容
      </div>
      <div
        @click="onBack"
        class="unline">使用手输药名</div>
    </div>
     <Model
      @close="close"
      @comfire="comfire"
      v-if="toast"
      :toast.sync="toast"
      :value="''"
      :title="`确认使用药名 “${valueStr}”？`"
    />
  </div>
</template>
<script>
import CommonHeader from './Heard'
import Model from './Model'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      data: {},
      valueStr: '',
      timer: null,
      filterList: [],
      toast: false,
      selectItem: {}
    }
  },
  components: {
    CommonHeader,
    Model
  },
  created () {
    this.filterList = this.list
    this.selectItem.medicine_id = this.$route.query.id
  },
  computed: {
    ...mapState('task', {
      medicineList: state => state.medicineList
    }),
    list () {
      return this.medicineList
    },
  },
  watch: {
    valueStr (val) {
      let value = val.replace(/(^\s*)|(\s*$)/g, '')
      let list = JSON.parse(JSON.stringify(this.list))
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (value) {
          this.filterList = list.filter(i => {
            return i.medicine_name.indexOf(value) >= 0
          })
        } else {
          this.filterList = list
        }
      }, 100)
    },
    list (val) {
      this.filterList = val
    }
  },
  methods: {
    ...mapMutations('task', [
      'saveMedicine'
    ]),
    ...mapActions('task', [

    ]),
    onBack() {
      if(!this.valueStr) {
        delete this.$route.query.id
        this.$router.push({
          path: '/medicine',
          query: {
            from: 'select',
            ...this.$route.query
          }
        })
      } else if (this.valueStr && this.filterList.length === 0) {
        this.toast = true
      }
    },
    selectMedicine (i) {
      this.selectItem = i
      this.saveMedicine({payload:i})
      delete  this.$route.query.id
      this.$router.push({
        path: '/medicine',
        query: {
          from: 'select',
          ...this.$route.query
        }
      })
    },
    close() {
      this.toast = false
      // setTimeout(()=>{})
      delete this.$route.query.id
      this.$router.push({
        path: '/medicine',
        query: {
          from: 'select',
          ...this.$route.query
        }
      })
    },
    comfire(){
      this.toast = false
      this.saveMedicine({payload:{medicine_name: this.valueStr, medicine_id: ''}})
      delete this.$route.query.id
      this.$router.push({
        path: '/medicine',
        query: {
          from: 'select',
          ...this.$route.query
        }
      })
    },
    searchClose () {
      this.valueStr = ''
    }
  }
}
</script>
<style scoped>
  .all {
    height: 100%;
    display: flex;
    flex-direction: column;
    & .content {
      flex: 1;
      background:rgba(242,242,242,1);
      overflow: auto;
      & .select-item {
        display: flex;
        background:rgba(255,255,255,1);
        border-bottom: 1px solid #d8d8d8;
        padding: 14px 20px;
      }
    }
  }
  .selectContent {
    width: 100%;
    background:rgba(248,248,248,1);
  }
  .select {
    height:32px;
    width: 100%;
    background:rgba(248,248,248,1);
    border-radius:16px;
    display: flex;
    align-items: center;
    padding: 0 6px;
  }
  .selected {
    color: rgba(6,211,211,1);;
  }
.the-img {
  width: 18px;
  height: 12px;
  margin-left: 5px;
}
.list {
  display: flex;
  align-items: center;
}
.label {
  flex: 1;
  justify-content: center;
}
.prompt {
  text-align: center;
  padding-top: 28px;
  font-size:16px;
  font-weight:500;
  color:rgba(153,153,153,1);
  line-height:24px;
}
.unline {
  text-align: center;
  font-size:16px;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:24px;
  padding-top: 28px;
  text-decoration:underline;
}
</style>
